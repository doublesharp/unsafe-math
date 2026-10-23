const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { outputDir } = require('./paths.cjs');
const { runForge } = require('./forge.cjs');
const { ensureSolc } = require('./solc.cjs');

const groups = [
  'uint256',
  'U256_helper',
  'U256_operator',
  'int256',
  'I256_helper',
  'I256_operator',
  'Primitive_uint256',
  'Primitive_int256',
];
const expected = groups
  .flatMap((group, i) => {
    const operator = group.endsWith('_operator'),
      helper = group.endsWith('_helper');
    const signed = (i >= 3 && i <= 5) || group === 'Primitive_int256';
    const ops = ['add', 'sub', 'mul', 'div', 'mod'];
    if (!operator) ops.push('inc', 'dec');
    if (!signed && !operator) ops.push('exp');
    if (helper || operator) ops.push('and', 'or', 'xor', 'not', 'eq', 'neq', 'lt', 'lte', 'gt', 'gte');
    if (group === 'U256_helper') ops.push('lshift', 'rshift');
    return ops.map((op) => `${group}.${op}`);
  })
  .sort();

function parseGas(suites) {
  const tests = Object.values(suites).flatMap((suite) => Object.entries(suite.test_results));
  assert.equal(tests.length, expected.length, 'Missing or duplicated gas tests');
  const rows = new Map();
  for (const [name, test] of tests) {
    assert.equal(test.status, 'Success', `Gas test failed or skipped: ${name}`);
    assert.equal(test.decoded_logs.length, 2, `Missing measurements: ${name}`);
    let key;
    const values = {};
    for (const line of test.decoded_logs) {
      const match = /^(\w+\.\w+)\.(checked|unchecked): (\d+)$/.exec(line);
      assert.ok(match, `Unexpected measurement: ${line}`);
      if (key) assert.equal(key, match[1]);
      else key = match[1];
      assert.equal(values[match[2]], undefined, 'Duplicate gas measurement');
      values[match[2]] = Number(match[3]);
    }
    assert.ok(!rows.has(key), `Duplicate gas comparison: ${key}`);
    assert.ok(Number.isSafeInteger(values.checked) && values.checked > 0 && Number.isSafeInteger(values.unchecked));
    const [group, operation] = key.split('.');
    rows.set(key, {
      group,
      operation,
      ...values,
      saved: values.checked - values.unchecked,
      savedPercent: Number((((values.checked - values.unchecked) * 100) / values.checked).toFixed(2)),
    });
  }
  assert.deepEqual([...rows.keys()].sort(), expected);
  return [...rows.values()];
}

if (require.main === module) {
  (async () => {
    const folder = path.join(outputDir, 'gas');
    fs.mkdirSync(folder, { recursive: true });
    const raw = path.join(folder, 'tests.json');
    const report = path.join(folder, 'measurements.json');
    for (const file of [raw, report]) fs.rmSync(file, { force: true });
    const stdout = await runForge(['test', '--match-contract', 'GasSavingsTest', '--json', '-vv'], {
      capture: true,
      version: '0.8.19',
    });
    fs.writeFileSync(raw, stdout);
    const rows = parseGas(JSON.parse(stdout));
    const metadata = {
      foundry: execFileSync('forge', ['--version'], { encoding: 'utf8' }).trim(),
      solc: execFileSync(await ensureSolc('0.8.19'), ['--version'], { encoding: 'utf8' }).trim(),
      evm: 'paris',
      optimizer: false,
      optimizerRuns: 0,
      operands: [5, 2],
      unaryOperand: 5,
    };
    fs.writeFileSync(report, JSON.stringify({ metadata, rows }, null, 2) + '\n');
    console.table(rows);
    console.log(`${rows.length} gas comparisons passed. Raw results: ${folder}`);
  })().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
module.exports = { parseGas };
