const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { execFileSync } = require('node:child_process');

function checkContext({ manifest, tag, eventName, ref, repository, release = {} }) {
  assert.equal(repository, 'doublesharp/unsafe-math', 'Publishing is restricted to the upstream repository');
  assert.equal(manifest.name, '@0xdoublesharp/unsafe-math', 'Unexpected package identity');
  assert.match(tag || '', /^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/, 'A stable vX.Y.Z tag is required');
  assert.equal(tag, `v${manifest.version}`, 'Release tag and package version differ');
  assert.ok(!release.draft && !release.prerelease, 'Only stable published releases are allowed');
  if (eventName === 'release') {
    assert.equal(ref, `refs/tags/${tag}`, 'Release must run on its own tag');
  } else {
    assert.equal(eventName, 'workflow_dispatch', 'Unsupported publishing event');
    assert.equal(ref, 'refs/heads/main', 'Manual publishing must run from main');
  }
  return `refs/tags/${tag}`;
}

function verifyMetadata(metadata, manifest, archive) {
  assert.equal(metadata.name, manifest.name, 'Registry returned a different package');
  assert.equal(metadata.version, manifest.version, 'Registry returned a different version');
  const integrity = 'sha512-' + createHash('sha512').update(archive).digest('base64');
  assert.equal(metadata.dist?.integrity, integrity, 'Published archive integrity differs');
}

async function main() {
  const manifest = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const command = process.argv[2];
  if (command === 'check') {
    const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
    const tagRef = checkContext({
      manifest,
      tag: process.env.RELEASE_TAG,
      eventName: process.env.GITHUB_EVENT_NAME,
      ref: process.env.GITHUB_REF,
      repository: process.env.GITHUB_REPOSITORY,
      release: event.release,
    });
    execFileSync('git', ['merge-base', '--is-ancestor', tagRef, 'origin/main']);
    // Manual recovery may run from a newer workflow commit, but its packaged
    // files must still be identical to the selected release tag.
    execFileSync('git', ['diff', '--exit-code', tagRef, 'HEAD', '--', 'package.json', ...manifest.files], {
      stdio: 'inherit',
    });
    console.log(`Release ${manifest.version}: stable tag, main history, and packaged source verified.`);
  } else if (command === 'pack') {
    const { outputDir } = require('./paths.cjs');
    const folder = path.join(outputDir, 'release');
    fs.mkdirSync(folder, { recursive: true });
    const receipt = JSON.parse(
      execFileSync('pnpm', ['pack', '--json', '--pack-destination', folder], { encoding: 'utf8' })
    );
    assert.equal(receipt.name, manifest.name);
    assert.equal(receipt.version, manifest.version);
    const archive = path.resolve(receipt.filename);
    assert.equal(path.dirname(archive), folder, 'Package archive escaped the output directory');
    assert.ok(archive.endsWith('.tgz') && fs.statSync(archive).isFile());
    if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `archive=${archive}\n`);
    console.log(`Packed ${archive}`);
  } else if (command === 'verify') {
    const archive = fs.readFileSync(process.argv[3]);
    const url = `https://registry.npmjs.org/${encodeURIComponent(manifest.name)}/${encodeURIComponent(
      manifest.version
    )}`;
    for (let attempt = 0; attempt < 6; ++attempt) {
      const response = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } });
      if (response.ok) {
        verifyMetadata(await response.json(), manifest, archive);
        console.log(`Verified ${manifest.name}@${manifest.version} on npm, including exact archive integrity.`);
        return;
      }
      if (response.status !== 404 || attempt === 5)
        throw new Error(`Registry verification failed: HTTP ${response.status}`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  } else {
    throw new Error('Expected release command: check, pack, or verify');
  }
}

if (require.main === module)
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
module.exports = { checkContext, verifyMetadata };
