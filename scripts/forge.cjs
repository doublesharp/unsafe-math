const fs = require('node:fs');
const path = require('node:path');
const { spawnSync, execFileSync } = require('node:child_process');
const { outputDir } = require('./paths.cjs');
const { ensureSolc } = require('./solc.cjs');

const root = path.resolve(__dirname, '..');
const forgedsCommit = '4ca15fcba25aa61a1b436d28b428e30b459f3d56';

function verifyForge(info) {
  if (info.split(/\r?\n/).includes(`Commit SHA: ${forgedsCommit}`)) return true;
  if (/^forge Version: 1\.9\.0(?:-|\s)/.test(info)) return false;
  throw new Error(`Install forgeds commit ${forgedsCommit} or Foundry v1.9.0.`);
}

async function runForge(args, options = {}) {
  fs.mkdirSync(outputDir, { recursive: true });
  const temp = path.join(outputDir, 'tmp');
  fs.mkdirSync(temp, { recursive: true });
  const info = execFileSync('forge', ['--version'], { encoding: 'utf8' });
  const isForgeds = verifyForge(info);
  const env = { ...process.env, UNSAFE_MATH_BUILD_DIR: outputDir, TMPDIR: temp };
  if (args[0] !== 'fmt') env.FOUNDRY_SOLC_VERSION = await ensureSolc(options.version || '0.8.38');
  const command = [...args];
  if (isForgeds && args[0] !== 'fmt') {
    // Forgeds overrides TOML paths; keep explicit consumer outputs and supply project defaults.
    for (const [flag, folder] of [
      ['--out', 'out'],
      ['--cache-path', 'cache'],
    ]) {
      const supplied = args.some(
        (arg) => arg === flag || arg.startsWith(`${flag}=`) || (flag === '--out' && arg.startsWith('-o'))
      );
      if (!supplied) command.push(flag, path.join(outputDir, folder));
    }
  }
  const result = spawnSync('forge', [...command, '--root', options.root || root], {
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
module.exports = { runForge, verifyForge };
