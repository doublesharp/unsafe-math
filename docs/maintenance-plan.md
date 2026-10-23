# 0.0.17 maintenance plan

Preserve existing arithmetic results and imports while completing the API and replacing the development toolchain.

- Use pnpm with a locked dependency set and Foundry with native Solidity tests.
- Add a standalone PrimitiveUnsafeMath entry point requiring Solidity 0.8.0. Keep the full UnsafeMath and operator API at 0.8.19.
- Check both actual minimum compilers and run the correctness and coverage suites on 0.8.35.
- Exercise all arithmetic entry points, casts at every 8-bit width, wrappers, comparisons, bitwise operations, exponentiation, and all four shifts with independent expected results.
- Keep exact, per-file coverage gates for every production source and reject incomplete or stale reports.
- Run gas comparisons after coverage using uninstrumented Solidity 0.8.19, no optimizer, and the Paris EVM.
- Compile each README example independently and verify the extracted package at both API minimum versions.
- Keep dependencies, compiler binaries, build output, temporary files, and raw evidence on Scratch.
- Refresh the README, compact logo, gas chart, and measured report. Finish with an independent review. Publication remains a separate action.

## Validation

A fresh locked pnpm install and full validation passed on Node.js 22.19.0 and Foundry v1.8.5. The run passed 8 tooling tests, 7 independent README compilations, 4 primitive tests on Solidity 0.8.0, 28 correctness tests on 0.8.19, and 28 correctness tests on 0.8.35. Every fuzz test runs 256 cases with a fixed seed.

Coverage passed another 28 tests on 0.8.35 and reached 482/482 lines, 382/382 statements, and 231/231 functions across all four production files. There are no instrumented production branches. All 97 gas comparisons passed after coverage, including 55 arithmetic savings assertions and 42 comparison, bitwise, and shift measurements.

The packed-source consumer compiled with Solidity 0.8.19, and the extracted standalone primitive API passed its 4 tests on 0.8.0. All 11 expected package files were present, including both SVG assets. Workflow linting passed. Hosted CI and package publication remain unverified.
