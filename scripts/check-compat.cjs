const fs = require('node:fs');
const path = require('node:path');
const { outputDir } = require('./paths.cjs');
const { runForge } = require('./forge.cjs');
const { compileConsumer } = require('./consumer.cjs');
const root = path.resolve(__dirname, '..');

async function testPrimitive(dir, dependencyRoot) {
  const sources = {
    'Primitive.t.sol': fs
      .readFileSync(path.join(root, 'test/Primitive.t.sol'), 'utf8')
      .replace("'../contracts/PrimitiveUnsafeMath.sol'", "'@0xdoublesharp/unsafe-math/contracts/PrimitiveUnsafeMath.sol'"),
    'TestBase.sol': fs.readFileSync(path.join(root, 'test/TestBase.sol'), 'utf8'),
  };
  await compileConsumer(dir, sources, dependencyRoot, { version: '0.8.0', test: true });
}

if (require.main === module) {
  (async () => {
    fs.mkdirSync(outputDir, { recursive: true });
    const dir = fs.mkdtempSync(path.join(outputDir, 'compat-'));
    try {
      await testPrimitive(dir, root);
      await runForge(['test', '--no-match-contract', 'GasSavingsTest'], { version: '0.8.19' });
      console.log('Minimum compiler checks passed: primitive API 0.8.0; full API 0.8.19.');
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  })().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
module.exports = { testPrimitive };
