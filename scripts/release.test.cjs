const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const { test } = require('node:test');
const { checkContext, verifyMetadata, verifyPublished } = require('./release.cjs');

const manifest = {
  name: '@0xdoublesharp/unsafe-math',
  version: '0.0.17',
  repository: 'https://github.com/doublesharp/unsafe-math',
};
const context = {
  manifest,
  tag: 'v0.0.17',
  eventName: 'workflow_dispatch',
  ref: 'refs/heads/main',
  repository: 'doublesharp/unsafe-math',
  release: {},
};

test('manual recovery accepts an existing stable version from main', () => {
  assert.equal(checkContext(context), 'refs/tags/v0.0.17');
});

test('published stable releases must run on their matching tag', () => {
  assert.equal(checkContext({ ...context, eventName: 'release', ref: 'refs/tags/v0.0.17' }), 'refs/tags/v0.0.17');
  assert.throws(() => checkContext({ ...context, eventName: 'release' }));
});

test('incorrect versions, prerelease tags, and shell text are rejected', () => {
  for (const tag of ['v0.0.16', '0.0.17', 'v0.0.17-rc.1', 'v00.0.17', 'v0.0.17; echo bad']) {
    assert.throws(() => checkContext({ ...context, tag }));
  }
});

test('forks, pull requests, and manual feature branches cannot publish', () => {
  assert.throws(() => checkContext({ ...context, repository: 'another/unsafe-math' }));
  assert.throws(() => checkContext({ ...context, eventName: 'pull_request' }));
  assert.throws(() => checkContext({ ...context, ref: 'refs/heads/feature' }));
});

test('drafts, prereleases, and incorrect package identity cannot publish', () => {
  assert.throws(() => checkContext({ ...context, release: { draft: true } }));
  assert.throws(() => checkContext({ ...context, release: { prerelease: true } }));
  assert.throws(() => checkContext({ ...context, manifest: { ...manifest, name: 'different-package' } }));
});

test('registry verification requires the exact published archive and identity', () => {
  const bytes = Buffer.from('validated package archive');
  const metadata = {
    name: manifest.name,
    version: manifest.version,
    dist: { integrity: 'sha512-' + createHash('sha512').update(bytes).digest('base64') },
  };
  assert.doesNotThrow(() => verifyMetadata(metadata, manifest, bytes));
  assert.throws(() => verifyMetadata(metadata, manifest, Buffer.from('different archive')));
  assert.throws(() => verifyMetadata({ ...metadata, version: '0.0.16' }, manifest, bytes));
  assert.throws(() => verifyMetadata({ ...metadata, name: 'different-package' }, manifest, bytes));
});

test('registry processing may outlast the initial six attempts', async () => {
  const bytes = Buffer.from('accepted archive');
  const metadata = {
    name: manifest.name,
    version: manifest.version,
    dist: { integrity: 'sha512-' + createHash('sha512').update(bytes).digest('base64') },
  };
  let attempts = 0;
  let waits = 0;
  await verifyPublished(manifest, bytes, {
    fetcher: async () => (++attempts <= 8 ? { ok: false, status: 404 } : { ok: true, json: async () => metadata }),
    sleep: async () => {
      waits++;
    },
  });
  assert.equal(attempts, 9);
  assert.equal(waits, 8);
});

test('registry retries are bounded and do not retry authentication failures', async () => {
  let attempts = 0;
  const options = {
    attempts: 3,
    sleep: async () => {},
    fetcher: async () => {
      attempts++;
      return { ok: false, status: 404 };
    },
  };
  await assert.rejects(verifyPublished(manifest, Buffer.from('archive'), options), /404/);
  assert.equal(attempts, 3);
  attempts = 0;
  await assert.rejects(
    verifyPublished(manifest, Buffer.from('archive'), {
      ...options,
      fetcher: async () => {
        attempts++;
        return { ok: false, status: 403 };
      },
    }),
    /403/
  );
  assert.equal(attempts, 1);
});
