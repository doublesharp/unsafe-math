const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { outputDir } = require('./paths.cjs');
const { compileConsumer } = require('./consumer.cjs');
const { testPrimitive } = require('./check-compat.cjs');

(async () => {
  const root = path.resolve(__dirname, '..');
  fs.mkdirSync(outputDir, { recursive: true });
  const dir = fs.mkdtempSync(path.join(outputDir, 'package-'));
  try {
    const receipt = JSON.parse(
      execFileSync('pnpm', ['pack', '--json', '--pack-destination', dir], {
        cwd: root,
        encoding: 'utf8',
      })
    );
    const expected = [
      'README.md',
      'package.json',
      'LICENSE',
      'CHANGELOG.md',
      'GAS_REPORT.md',
      'contracts/UnsafeMath.sol',
      'contracts/PrimitiveUnsafeMath.sol',
      'contracts/types/I256.sol',
      'contracts/types/U256.sol',
      'docs/assets/hero.svg',
      'docs/assets/gas-savings.svg',
    ].sort();
    assert.deepEqual(receipt.files.map((file) => file.path).sort(), expected, 'Unexpected package contents');
    assert.equal(
      path.resolve(receipt.filename),
      path.join(dir, path.basename(receipt.filename)),
      'Archive escaped Scratch'
    );
    execFileSync('tar', ['-xzf', receipt.filename, '-C', dir]);
    for (const file of expected.filter((file) => file.endsWith('.sol'))) {
      assert.equal(
        fs.readFileSync(path.join(dir, 'package', file), 'utf8'),
        fs.readFileSync(path.join(root, file), 'utf8'),
        `Stale packaged source: ${file}`
      );
    }
    const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'package/package.json'), 'utf8'));
    assert.equal(manifest.version, require('../package.json').version);
    const harness = fs
      .readFileSync(path.join(root, 'contracts/test/TestConversions.sol'), 'utf8')
      .replace("'../UnsafeMath.sol'", "'@0xdoublesharp/unsafe-math/contracts/UnsafeMath.sol'");
    await compileConsumer(path.join(dir, 'full'), { 'Consumer.sol': harness }, path.join(dir, 'package'));
    await testPrimitive(path.join(dir, 'primitive'), path.join(dir, 'package'));
    console.log(
      `Package ${manifest.version}: exact file list verified; extracted APIs pass Solidity 0.8.0/0.8.19 consumer checks.`
    );
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
})().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
