# Gas report

Measured on 2026-10-22 with Foundry v1.8.5 and Solidity 0.8.19+commit.7dd6d404. The target is Paris, with the optimizer disabled and optimizer runs set to zero.

All **97 comparisons passed** after the coverage run. The 55 arithmetic comparisons assert equal results and lower gas than checked Solidity. The other 42 compare results and record wrapper overhead without requiring a saving.

![Unsigned addition gas comparison](docs/assets/gas-savings.svg)

## What the numbers measure

The test contracts measure `gasleft()` around an operation. This includes the internal method call and result assignment. It excludes transaction costs, calldata decoding, external dispatch, and the caller's surrounding logic.

Binary operations use `a = 5`, `b = 2`. Unary operations use `a = 5`. Exponentiation measures `5 ** 2`. Correctness tests separately cover full-width fuzz inputs, overflows, signed extremes, zero divisors, comparisons in both directions, and shifts of 256 or more.

Savings are `(checked - library) / checked × 100`. These measurements compare the library with checked Solidity. They do not establish a saving over a caller's own `unchecked` block. Compiler optimization, operands, and call context can change the results.

## Unsigned arithmetic

The `PrimitiveUnsafeMath` and `UnsafeMath` primitive methods produced identical measurements. U256 helpers and operators also matched for the five overloaded arithmetic operations. Exponentiation, increment, and decrement are available as helpers only.

| Operation | Checked | Primitive | Saved | U256 helper | Saved |
| :--- | ---: | ---: | ---: | ---: | ---: |
| add | 203 | 84 | 58.62% | 132 | 34.98% |
| sub | 203 | 84 | 58.62% | 132 | 34.98% |
| mul | 267 | 86 | 67.79% | 134 | 49.81% |
| div | 196 | 99 | 49.49% | 147 | 25.00% |
| mod | 196 | 99 | 49.49% | 147 | 25.00% |
| exp | 481 | 154 | 67.98% | 202 | 58.00% |
| inc | 149 | 72 | 51.68% | 115 | 22.82% |
| dec | 149 | 75 | 49.66% | 118 | 20.81% |

## Signed arithmetic

Both primitive libraries again matched. I256 helper and operator measurements matched for add, sub, mul, div, and mod.

| Operation | Checked | Primitive | Saved | I256 helper | Saved |
| :--- | ---: | ---: | ---: | ---: | ---: |
| add | 245 | 84 | 65.71% | 132 | 46.12% |
| sub | 242 | 84 | 65.29% | 132 | 45.45% |
| mul | 305 | 86 | 71.80% | 134 | 56.07% |
| div | 240 | 99 | 58.75% | 147 | 38.75% |
| mod | 196 | 99 | 49.49% | 147 | 25.00% |
| inc | 149 | 72 | 51.68% | 115 | 22.82% |
| dec | 149 | 75 | 49.66% | 118 | 20.81% |

## Comparisons, bitwise operations, and shifts

Ordinary Solidity does not add overflow checks to these operations. Wrapper calls add overhead with the optimizer disabled. Each grouped row below reports identical measurements for all listed operations.

| Operations | Ordinary Solidity | U256 helper | I256 helper | U256 / I256 operator |
| :--- | ---: | ---: | ---: | ---: |
| and, or, xor | 21 | 132 | 84 | 69 |
| not | 18 | 104 | 61 | 61 |
| eq, lt, gt | 21 | 84 | 84 | 69 |
| neq, lte, gte | 24 | 87 | 87 | 72 |
| lshift, rshift | 24 | 87 | Not provided | Not overloadable |

Shift gas measurements use a primitive count of 2. Correctness tests cover all four shift overloads, including wrapped counts.

## Reproduce

Install the pinned tools and dependencies using the [development instructions](README.md#development), then run:

```sh
pnpm test:gas
# Run every release check, including gas after coverage:
pnpm validate
```

`test:gas` explicitly selects Solidity 0.8.19 regardless of the 0.8.35 correctness-test default. Coverage instrumentation never supplies the gas measurements. The report parser requires exactly 97 successful tests, both measurements for every test, and the full expected operation list. It clears old reports before each run.

Raw test output and measurement JSON remain under `<UNSAFE_MATH_BUILD_DIR>/gas/` on Scratch. Only this summary and the chart belong in the package. The readings apply to the compiler settings above; benchmark the contracts and settings you deploy.
