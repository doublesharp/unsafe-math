# Changelog

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
