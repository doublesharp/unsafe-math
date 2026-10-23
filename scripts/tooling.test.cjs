const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const { verifyCoverage, files, functionCounts } = require('./check-coverage.cjs');
const { parseGas } = require('./gas-report.cjs');

function completeCoverage() {
  const rows = files.map(
    (file) =>
      `| ${file} | 100.00% (1/1) | 100.00% (1/1) | N/A (0/0) | 100.00% (${functionCounts[file]}/${functionCounts[file]}) |`
  );
  const records = files.map((file) => {
    const count = functionCounts[file];
    const functions = Array.from({ length: count }, (_, i) => `FN:1,f${i}\nFNDA:1,f${i}`).join('\n');
    return `TN:\nSF:${file}\nDA:1,1\n${functions}\nLF:1\nLH:1\nFNF:${count}\nFNH:${count}\nBRF:0\nBRH:0\nend_of_record\n`;
  });
  return {
    summary: '| File | % Lines | % Statements | % Branches | % Funcs |\n' + rows.join('\n'),
    lcov: records.join(''),
  };
}

test('complete production reports pass the coverage gate', () => {
  const { summary, lcov } = completeCoverage();
  assert.doesNotThrow(() => verifyCoverage(summary, lcov));
});

test('missing, duplicate, and empty production coverage fail closed', () => {
  const { summary, lcov } = completeCoverage();
  assert.throws(() =>
    verifyCoverage(
      summary
        .split('\n')
        .filter((line) => !line.includes(files[0]))
        .join('\n'),
      lcov
    )
  );
  assert.throws(() => verifyCoverage(summary, lcov.replace(files[2], files[1])));
  assert.throws(() => verifyCoverage(summary, ''));
});

test('uncovered lines, statements, functions, and branches fail coverage', () => {
  const { summary, lcov } = completeCoverage();
  assert.throws(() => verifyCoverage(summary.replace('100.00% (1/1)', '0.00% (0/1)'), lcov));
  const cells = summary.split('\n')[1].split('|');
  cells[3] = ' 0.00% (0/1) ';
  assert.throws(() => verifyCoverage(cells.join('|') + '\n' + summary.split('\n').slice(2).join('\n'), lcov));
  assert.throws(() => verifyCoverage(summary.replace(/100.00% \(186\/186\)/, '99.46% (185/186)'), lcov));
  assert.throws(() => verifyCoverage(summary.replace('N/A (0/0)', '0.00% (0/1)'), lcov));
});

test('raw LCOV misses cannot hide behind a complete summary', () => {
  const { summary, lcov } = completeCoverage();
  assert.throws(() => verifyCoverage(summary, lcov.replace('DA:1,1', 'DA:1,0')));
  assert.throws(() => verifyCoverage(summary, lcov.replace('FNDA:1,f0', 'FNDA:0,f0')));
  assert.throws(() => verifyCoverage(summary, lcov.replace('LH:1', 'LH:0')));
});

test('rounded percentages and omitted function denominators are rejected', () => {
  const { summary, lcov } = completeCoverage();
  assert.throws(() => verifyCoverage(summary.replace('100.00% (1/1)', '100.00% (99999/100000)'), lcov));
  assert.throws(() =>
    verifyCoverage(
      summary.replaceAll('(186/186)', '(185/185)'),
      lcov.replace('FNF:186', 'FNF:185').replace('FNH:186', 'FNH:185')
    )
  );
});

function gasFixture() {
  const source = fs.readFileSync(path.join(__dirname, '../test/Gas.t.sol'), 'utf8');
  const labels = [...source.matchAll(/compare\(\s*\d+,\s*'([^']+)'/g)].map((match) => match[1]);
  return {
    suite: {
      test_results: Object.fromEntries(
        labels.map((label) => [
          label,
          {
            status: 'Success',
            decoded_logs: [`${label}.checked: 100`, `${label}.unchecked: 50`],
          },
        ])
      ),
    },
  };
}

test('gas report accepts exactly the independently declared native comparisons', () => {
  assert.equal(parseGas(gasFixture()).length, 97);
});

test('gas report rejects skipped tests and missing measurements', () => {
  const fixture = gasFixture();
  Object.values(fixture.suite.test_results)[0].status = 'Skipped';
  assert.throws(() => parseGas(fixture));
  const missing = gasFixture();
  Object.values(missing.suite.test_results)[0].decoded_logs.pop();
  assert.throws(() => parseGas(missing));
});

test('gas report rejects duplicates and unexpected comparisons', () => {
  const fixture = gasFixture();
  const values = Object.values(fixture.suite.test_results);
  values[1].decoded_logs = values[0].decoded_logs;
  assert.throws(() => parseGas(fixture));
  const extra = gasFixture();
  extra.suite.test_results.unexpected = { status: 'Success', decoded_logs: [] };
  assert.throws(() => parseGas(extra));
});
