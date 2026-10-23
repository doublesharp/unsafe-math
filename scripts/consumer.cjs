const fs = require('node:fs');
const path = require('node:path');
const { runForge } = require('./forge.cjs');

async function compileConsumer(dir, sources, dependencyRoot, options = {}) {
  const version = options.version || '0.8.19';
  fs.mkdirSync(path.join(dir, 'src'), { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'foundry.toml'),
    `[profile.default]
src = "src"
test = "src"
out = "out"
cache_path = "cache"
libs = []
solc_version = "${version}"
auto_detect_solc = false
optimizer = false
evm_version = "${version === '0.8.0' ? 'istanbul' : 'paris'}"
remappings = [${JSON.stringify('@0xdoublesharp/unsafe-math/=' + dependencyRoot.replaceAll('\\', '/') + '/')}]
[profile.default.fuzz]
runs = 256
seed = "0x7b19a2d3e4f5"
failure_persist_dir = "${dir.replaceAll('\\', '/')}/fuzz-failures"
`
  );
  for (const [name, content] of Object.entries(sources)) {
    if (path.basename(name) !== name || !name.endsWith('.sol')) throw new Error('Invalid consumer filename');
    fs.writeFileSync(path.join(dir, 'src', name), content);
  }
  await runForge(
    [options.test ? 'test' : 'build', '--out', path.join(dir, 'out'), '--cache-path', path.join(dir, 'cache')],
    { root: dir, version }
  );
}
module.exports = { compileConsumer };
