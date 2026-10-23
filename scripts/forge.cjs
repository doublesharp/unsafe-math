const fs = require('node:fs');
const path = require('node:path');
const { spawnSync, execFileSync } = require('node:child_process');
const { outputDir } = require('./paths.cjs');
const { ensureSolc } = require('./solc.cjs');

const root = path.resolve(__dirname, '..');
async function runForge(args, options = {}) {
  fs.mkdirSync(outputDir, { recursive: true });
  const temp = path.join(outputDir, 'tmp');
  fs.mkdirSync(temp, { recursive: true });
  const info = execFileSync('forge', ['--version'], { encoding: 'utf8' });
  if (!/forge Version: 1\.8\.5(?:-|\s)/.test(info))
    throw new Error('Install Foundry v1.8.5 to reproduce this release.');
  const env = { ...process.env, UNSAFE_MATH_BUILD_DIR: outputDir, TMPDIR: temp };
  if (args[0] !== 'fmt') env.FOUNDRY_SOLC_VERSION = await ensureSolc(options.version || '0.8.35');
  const result = spawnSync('forge', [...args, '--root', options.root || root], {
    cwd: options.root || root,
    env,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    stdio: options.capture ? 'pipe' : 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    if (options.capture) process.stderr.write((result.stdout || '') + (result.stderr || ''));
    throw new Error(`forge ${args[0]} failed with exit ${result.status}`);
  }
  return result.stdout;
}

if (require.main === module) {
  runForge(process.argv.slice(2)).catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
module.exports = { runForge };
