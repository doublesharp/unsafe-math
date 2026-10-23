const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { outputDir } = require('./paths.cjs');

const root = path.resolve(__dirname, '..');
const files = [
  'contracts/UnsafeMath.sol',
  'contracts/PrimitiveUnsafeMath.sol',
  'contracts/types/I256.sol',
  'contracts/types/U256.sol',
];
const functionCounts = Object.fromEntries(
  files.map((file) => [file, [...fs.readFileSync(path.join(root, file), 'utf8').matchAll(/^\s*function\s+/gm)].length])
);

function verifyCoverage(summary, lcov) {
  const rows = summary
    .split('\n')
    .map((line) =>
      line
        .split('|')
        .slice(1, -1)
        .map((x) => x.trim())
    )
    .filter((row) => row.length === 5 && row[0] !== 'Total' && row[0] !== 'File' && row[1].includes('%'));
  assert.deepEqual(
    rows.map((row) => row[0]).sort(),
    [...files].sort(),
    'Coverage must include every production file exactly once'
  );
  const records = lcov.split('end_of_record').filter((record) => record.includes('SF:'));
  assert.equal(records.length, files.length, 'LCOV production file count differs');
  const seen = new Set();
  for (const record of records) {
    const lines = record.trim().split('\n');
    const one = (key) => {
      const values = lines.filter((line) => line.startsWith(key + ':')).map((line) => line.slice(key.length + 1));
      assert.equal(values.length, 1, `Missing or duplicated LCOV ${key}`);
      return values[0];
    };
    const file = one('SF').replaceAll('\\', '/').replace(/^\.\//, '');
    assert.ok(files.includes(file) && !seen.has(file), `Unexpected LCOV file: ${file}`);
    seen.add(file);
    const metrics = rows
      .find((row) => row[0] === file)
      .slice(1)
      .map((cell) => {
        const match = /^(?:\d+(?:\.\d+)?%|N\/A)\s*\((\d+)\/(\d+)\)$/.exec(cell);
        assert.ok(match, `Malformed coverage metric: ${cell}`);
        const hit = Number(match[1]),
          total = Number(match[2]);
        assert.equal(hit, total, `Uncovered production code: ${file}`);
        return { hit, total };
      });
    const counters = {};
    for (const key of ['LF', 'LH', 'FNF', 'FNH', 'BRF', 'BRH']) {
      assert.match(one(key), /^\d+$/, `Invalid LCOV count ${key}`);
      counters[key] = Number(one(key));
    }
    assert.ok(counters.LF > 0 && counters.FNF > 0, `Empty production coverage: ${file}`);
    assert.equal(counters.FNF, functionCounts[file], `LCOV omitted production functions: ${file}`);
    for (const [index, total, hit] of [
      [0, 'LF', 'LH'],
      [2, 'BRF', 'BRH'],
      [3, 'FNF', 'FNH'],
    ]) {
      assert.equal(metrics[index].total, counters[total], `Summary/LCOV denominator mismatch: ${file}`);
      assert.equal(metrics[index].hit, counters[hit], `Summary/LCOV hit mismatch: ${file}`);
    }
    assert.ok(metrics[1].total > 0, 'Statement coverage is empty');
    for (const [prefix, total, hitIndex] of [
      ['DA:', 'LF', 1],
      ['FNDA:', 'FNF', 0],
      ['BRDA:', 'BRF', 3],
    ]) {
      const entries = lines
        .filter((line) => line.startsWith(prefix))
        .map((line) => line.slice(prefix.length).split(','));
      assert.equal(entries.length, counters[total], `LCOV item count mismatch: ${file}`);
      assert.ok(
        entries.every((entry) => /^\d+$/.test(entry[hitIndex]) && Number(entry[hitIndex]) > 0),
        `Uncovered LCOV item: ${file}`
      );
    }
  }
}

if (require.main === module) {
  verifyCoverage(
    fs.readFileSync(path.join(outputDir, 'coverage', 'summary.txt'), 'utf8'),
    fs.readFileSync(path.join(outputDir, 'coverage', 'lcov.info'), 'utf8')
  );
  console.log('100% of production lines, statements, and functions are covered; all branch counters are covered.');
}
module.exports = { verifyCoverage, files, functionCounts };
