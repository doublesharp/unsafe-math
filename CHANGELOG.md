# Changelog

## 0.0.18, 2026-11-08

- Update Prettier to 3.9.10, pnpm to 12.18.0, Foundry to v1.9.0, and the publishing CLI to npm 12.2.2. Use Node.js 24 for development and CI.
- Run correctness and coverage checks on Solidity 0.8.38, with its pinned official compiler checksum and commit. Keep primitive compatibility at 0.8.0 and the full API and gas comparisons at 0.8.19.
- Publish stable GitHub releases through npm trusted publishing with provenance, bounded registry retries, verification-only recovery, and public tarball integrity checks.
- Point package metadata and publishing at the 0xdoublesharp GitHub organization.
- Refresh development and release instructions; keep checkouts on backed-up storage and disposable dependencies and build outputs on Scratch.
- Preserve all arithmetic behavior, Solidity imports, and public APIs.

## 0.0.17, 2026-10-22

- Add the missing U256 conversions to uint248, uint240, and uint232.
- Correct the signed division regression and exercise every production function with boundary inputs.
- Preserve modular arithmetic, truncating conversions, and zero results for zero divisors.
- Replace Yarn and Hardhat with pnpm 11.21.0 and native Foundry v1.8.5 tests, with no parser dependency or submodule.
- Add standalone PrimitiveUnsafeMath arithmetic for Solidity 0.8.0+; keep the full wrapper and operator API at 0.8.19+.
- Test correctness with Solidity 0.8.35 and both actual minimum compiler versions. Verify pinned compiler downloads against official checksums.
- Add deterministic boundary and fuzz tests, a per-file 100% coverage gate, tooling regression tests, and CI.
- Measure 97 gas comparisons on Solidity 0.8.19 after coverage and publish arithmetic savings and wrapper overhead.
- Correct the compiler minimum, I256 signatures, and all README examples; compile examples during tests.
- Redesign the README with a compact logo, compatibility guide, working examples, and a colored gas chart.
- Include the MIT license, gas report, chart assets, and this changelog in the package. Compile the extracted full API and run primitive tests against the archive at their minimum versions.
