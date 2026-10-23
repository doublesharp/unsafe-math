# Publishing to npm from GitHub

The `publish.yml` workflow publishes stable GitHub releases to npm using OpenID Connect. No npm token secret or local npm login is required for a configured trusted publisher. Dependencies and validation use pnpm; the final publish uses the pinned npm CLI for its OIDC support.

## One-time npm setup

Open the package's [npm access settings](https://www.npmjs.com/package/@0xdoublesharp/unsafe-math/access). In Trusted Publishers, select GitHub Actions and enter:

| Field | Value |
| :--- | :--- |
| Organization or user | `doublesharp` |
| Repository | `unsafe-math` |
| Workflow filename | `publish.yml` |
| Environment | Leave blank |
| Allowed action | Enable `npm publish` |

Use the filename only, including `.yml`. The workflow lives at `.github/workflows/publish.yml` and uses GitHub-hosted Ubuntu runners. Save the configuration, then complete the first publish within two days. npm expires a new trusted publisher configuration if it has not published within that period. See [npm's trusted publishing documentation](https://docs.npmjs.com/trusted-publishers/).

## Future releases

1. Update `package.json` and the changelog. Merge the validated source to `main`.
2. Create a stable `vX.Y.Z` tag matching the package version and publish its GitHub release.
3. The workflow checks the tag, source history, and packaged files; runs the full validation suite; packs the source; and publishes with provenance.
4. Its final step verifies the npm package's name, version, and archive integrity against the uploaded archive.

Draft releases, prereleases, forks, and manual runs from feature branches cannot publish through this workflow. Development CI does not publish.

## Publish the existing v0.0.17 release

The release predates the workflow, so run it manually after adding the npm trusted publisher:

```sh
gh workflow run publish.yml --repo doublesharp/unsafe-math --ref main -f tag=v0.0.17
```

The same operation is available under GitHub Actions, Publish to npm, Run workflow. Select `main` and enter `v0.0.17`.

Manual recovery uses the current main workflow, checks that the selected tag is in main's history, and requires all packaged files to match that tag. New workflow and release-helper files do not change the package contents. Existing tags remain unchanged. npm will reject an already-published version.

If npm rejects authentication, verify the trusted publisher fields, direct-publishing permission, and configuration expiry. npm can accept an upload and process it before exposing it in the registry. Verification waits up to ten minutes for that processing window and still requires an exact archive checksum.

If an upload was accepted but verification timed out, use a verification-only run instead of uploading again:

```sh
gh workflow run publish.yml --repo doublesharp/unsafe-math --ref main -f tag=v0.0.17 -f verify_only=true
```

This runs validation, packing, and registry verification while skipping publication. Published versions cannot be overwritten.
