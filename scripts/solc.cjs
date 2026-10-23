const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const { outputDir } = require('./paths.cjs');

const commits = { '0.8.0': 'c7dfd78e', '0.8.19': '7dd6d404', '0.8.35': '47b9dedd' };
const platforms = { darwin: 'macosx-amd64', linux: 'linux-amd64', win32: 'windows-amd64' };

function verifyVersion(binary, version) {
  const commit = commits[version];
  const info = execFileSync(binary, ['--version'], { encoding: 'utf8' });
  if (!info.includes(`Version: ${version}+commit.${commit}`)) {
    throw new Error(`Expected native Solidity ${version}+commit.${commit}: ${binary}`);
  }
  return binary;
}

async function download(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Compiler download failed: ${response.status} ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

async function ensureSolc(version = '0.8.35') {
  const commit = commits[version];
  if (!commit) throw new Error(`Unsupported compiler version: ${version}`);
  if (process.env.UNSAFE_MATH_SOLC) return verifyVersion(path.resolve(process.env.UNSAFE_MATH_SOLC), version);
  const platform = platforms[process.platform];
  if (!platform || (process.platform !== 'darwin' && process.arch !== 'x64')) {
    throw new Error(`Set UNSAFE_MATH_SOLC to a native Solidity ${version} executable on this platform.`);
  }
  const folder = path.join(outputDir, 'compilers', version, platform);
  const binary = path.join(folder, process.platform === 'win32' ? 'solc.exe' : 'solc');
  if (fs.existsSync(binary)) return verifyVersion(binary, version);

  fs.mkdirSync(folder, { recursive: true });
  // Solidity's official binary manifest supplies the pinned release and checksum.
  const base = `https://binaries.soliditylang.org/${platform}`;
  const manifest = JSON.parse((await download(`${base}/list.json`)).toString('utf8'));
  const entry = manifest.builds.find((build) => build.path === manifest.releases[version]);
  if (!entry || entry.longVersion !== `${version}+commit.${commit}`) {
    throw new Error('Pinned Solidity compiler is absent from the official manifest.');
  }
  const bytes = await download(`${base}/${entry.path}`);
  const checksum = `0x${crypto.createHash('sha256').update(bytes).digest('hex')}`;
  if (checksum !== entry.sha256) throw new Error('Solidity compiler checksum mismatch.');
  const pending = `${binary}.${process.pid}.part`;
  fs.writeFileSync(pending, bytes, { mode: 0o755 });
  try {
    verifyVersion(pending, version);
    fs.renameSync(pending, binary);
  } finally {
    fs.rmSync(pending, { force: true });
  }
  return binary;
}

module.exports = { ensureSolc };
