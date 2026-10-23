const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { outputDir } = require('./paths.cjs');
const { compileConsumer } = require('./consumer.cjs');

(async () => {
  const root = path.resolve(__dirname, '..');
  const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
  const snippets = [...readme.matchAll(/```solidity\n([\s\S]*?)\n```/g)];
  assert.equal(snippets.length, 7, 'README must include all seven usage examples');
  fs.mkdirSync(outputDir, { recursive: true });
  const dir = fs.mkdtempSync(path.join(outputDir, 'docs-'));
  try {
    for (const [i, [, content]] of snippets.entries()) {
      const version = content.includes('pragma solidity ^0.8.0;') ? '0.8.0' : '0.8.19';
      await compileConsumer(path.join(dir, `example-${i + 1}`), { 'Example.sol': content }, root, { version });
    }
    console.log('All seven README examples compile independently with their minimum supported compiler.');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
})().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
