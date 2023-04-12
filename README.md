# Unsafe Math for Solidity 0.8+

This library and custom user types allow for the use of unchecked math operations when appropriate.
Gas savings can be realized when it is already known that the results will not overflow.

## Install

```shell
npm install -D @0xdoublesharp/unsafe-math
```

```shell
yarn add -D @0xdoublesharp/unsafe-math
```

## Library `UnsafeMath` for `uint256` and `int256`

The `UnsafeMath` library provides unchecked math operations for `uint256` and `int256` types with Solidity 0.8.0+.

### Type `uint256`

Use the `UnsafeMath` library for `uint256` types to perform unchecked math operations on two unsigned integers.

#### Math

- `_uint256.add(uint256 _addend)`: add a uint256 to a uint256
- `_uint256.sub(uint256 _subtrahend)`: subtract a uint256 from a uint256
- `_uint256.inc()`: increment a uint256
- `_uint256.dec()`: decrement a uint256
- `_uint256.mul(uint256 _multiplier)`: multiply a uint256 by a uint256
- `_uint256.div(uint256 _divisor)`: divide a uint256 from a uint256
- `_uint256.mod(uint256 _divisor)`: get the modulus of uint256s
- `_uint256.exp(uint256 _exponent)`: raise a uint256 by an exponent

#### Example

```solidity
import { UnsafeMath } from '@0xdoublesharp/unsafe-math/contracts/UnsafeMath.sol';

contract ContractA {
  using UnsafeMath for uint256;

  function add(uint256 a, uint256 b) external pure returns (uint256) {
    return a.add(b);
  }

  function while(uint256 times) external pure {
      uint256 _iter = times;
      while (_iter != 0) {
        _iter = _iter.dec();
        int64 _int64 = int64(_iter);
        // ...
    }
  }

  function for(uint256 times) external pure {
    for (uint256 _iter; _iter < times; _iter = _iter.inc()) {
        int64 _int64 = int64(_iter);
        // ...
    }
  }
}
```

### Type `int256`

Use the `UnsafeMath` library for `int256` types to perform unchecked math operations on two signed integers. Note that `exp()` is not available for signed integers.

#### Math

- `_int256.add(int256 _addend)`: add an int256 to an int256
- `_int256.sub(int256 _subtrahend)`: subtract an int256 from an int256
- `_int256.inc()`: increment an int256 value
- `_int256.dec()`: decrement an int256
- `_int256.mul(int256 _multipier)`: multiply an int256 by an int256
- `_int256.div(int256 _divisor)`: divide an int256 from an int256
- `_int256.mod(int256 _divisor)`: get the modulus of int256s

#### Example

```solidity
import { UnsafeMath } from '@0xdoublesharp/unsafe-math/contracts/UnsafeMath.sol';

contract ContractB {
  using UnsafeMath for int256;

  function sub(int256 a, int256 b) external pure returns (int256) {
    return a.sub(b);
  }
}
```

## User Defined Types: `U256` and `I256`

User defined types with operator overloads are also provided to take advantage of the latest Solidity features. Use `U256` for unchecked unsigned integer operations, or `I256` for unchecked signed integer operations. Helper methods are also provided for interoperating with `uint256` and `int256` types via the `UnsafeU256` and `UnsafeI256` libraries, respectively.

The overloads also provide comparison and bitwise operators where available.

### User Defined Type `U256`

The `U256` user defined type can perform unchecked math operations using overloaded operators.

#### Math

- `_u256 + _u256`: add a U256 to a U256
- `_u256 - _u256`: subtract a U256 from a U256
- `_u256 * _u256`: multiply a U256 by a U256
- `_u256 / _u256`: divide a U256 from a U256
- `_u256 % _u256`: get the modulus of U256s

#### Comparison

- `_u256 == _u256`: compare U256 equality
- `_u256 != _u256`: compare U256 non-equality
- `_u256 < _u256`: compare U256 less than U256
- `_u256 <= _u256`: compare U256 less than or equal to U256
- `_u256 > _u256`: compare U256 greater than U256
- `_u256 >= _u256`: compare U256 greater than or equal to U256

#### Bitwise

- `_u256 & _u256`: bitwise AND on U256
- `_u256 | _u256`: bitwise OR on U256
- `_u256 ^ _u256`: bitwise XOR on U256
- `~_u256`: bitwise NOT on U256

#### Example

```solidity
import {U256} from '@0xdoublesharp/unsafe-math/contracts/types/U256.sol';

contract ContractA {
  function add(uint256 a, uint256 b) external pure returns (uint256) {
      return (U256.wrap(a) - U256.wrap(b)).asUint256();
  }

  function while(uint256 times) external pure {
      U256 _iter = U256.wrap(times);
      while (_iter.neq(0)) {
        _iter = _iter.dec();
        uint256 _uint256 = _iter.asUint256();
        int64 _int64 = _iter.asInt64();
        // ...
    }
  }

  function for(uint256 times) external pure {
    U256 _times = U256.wrap(times);
    for (U256 _iter; _iter < _times; _iter = _iter.inc()) {
        uint256 _uint256 = _iter.asUint256();
        int64 _int64 = _iter.asInt64();
        // ...
    }
  }
}
```

### `I256`

The `I256` user defined type can perform unchecked math operations using overloaded operators.

#### Math

- `_i256 + _i256`: add a I256 to a I256
- `_i256 - _i256`: subtract a I256 from a I256
- `_i256 * _i256`: multiply a I256 by a I256
- `_i256 / _i256`: divide a I256 from a I256
- `_i256 % _i256`: get the modulus of I256s

#### Comparison

- `_i256 == _i256`: compare I256 equality
- `_i256 != _i256`: compare I256 non-equality
- `_i256 < _i256`: compare I256 less than I256
- `_i256 <= _i256`: compare I256 less than or equal to I256
- `_i256 > _i256`: compare I256 greater than I256
- `_i256 >= _i256`: compare I256 greater than or equal to I256

#### Bitwise

- `_i256 & _i256`: bitwise AND on I256
- `_i256 | _i256`: bitwise OR on I256
- `_i256 ^ _i256`: bitwise XOR on I256
- `~_i256`: bitwise NOT on I256

#### Example

```solidity
import { I256 } from '@0xdoublesharp/unsafe-math/contracts/types/I256.sol';

contract ContractB {
  function add(int256 a, int256 b) external pure returns (int256) {
    return (I256.wrap(a) - I256.wrap(b)).asInt256();
  }
}
```

## Libraries for `U256` and `I256`

The `UnsafeU256` and `UnsafeI256` libraries provide additional functionality for the user defined types as well as interoperability with `uint256` and `int256` types.

### Library `UnsafeU256`

Use the `UnsafeU256` library for `U256` to access helper methods for interacting with `uint256` types and functionality not available in overloaded operators, such as bit shifting and exponential operations.

#### Math

- `_U256.add(uint256 _addend)`: add a U256 to a uint256
- `_U256.sub(uint256 _subtrahend)`: subtract a U256 from a uint256
- `_U256.inc()`: increment a U256
- `_U256.dec()`: decrement a U256
- `_U256.mul(uint256 _multiplier)`: multiply a U256 by a uint256
- `_U256.div(uint256 _divisor)`: divide a uint256 from a U256
- `_U256.mod(uint256 _divisor)`: get the modulus of U256 and uint256
- `_U256.exp(uint256 _exponent)`: raise a U256 by an exponent

#### Comparison

- `_U256.eq(uint256 _compare)`: compare U256 and uint256 equality
- `_U256.neq(uint256 _compare)`: compare U256 and uint256 non-equality
- `_U256.lt(uint256 _compare)`: compare U256 and uint256 less than uint256
- `_U256.lte(uint256 _compare)`: compare U256 less than or equal to uint256
- `_U256.gt(uint256 _compare`: compare U256 greater than uint256
- `_U256.gte(uint256 _compare)`: compare U256 greater than or equal to uint256

#### Bitwise

- `_U256.rshift(U256 _shift)`: right shift U256 by U256
- `_U256.lshift(U256 _shift)`: right shift U256 by U256
- `_U256.rshift(uint256 _shift)`: right shift U256 by uint256
- `_U256.lshift(uint256 _shift)`: right shift U256 by uint256

- `_U256.and(uint256 _operator)`: bitwise AND on U256 and uint256
- `_U256.or(uint256 _operator)`: bitwise OR on U256 and uint256
- `_U256.xor(uint256 _operator)`: bitwise XOR on U256 and uint256
- `_U256.not()`: bitwise NOT on U256

#### As Unsigned Integer

- `_U256.asUint8()`: U256 to uint8
- `_U256.asUint16()`: U256 to uint16
- `_U256.asUint32()`: U256 to uint32
- `_U256.asUint64()`: U256 to uint64
- `_U256.asUint128()`: U256 to uint128
- `_U256.asUint256()`: U256 to uint256

#### As Signed Integer

- `_U256.asInt8()`: U256 to int8
- `_U256.asInt16()`: U256 to int16
- `_U256.asInt32()`: U256 to int32
- `_U256.asInt64()`: U256 to int64
- `_U256.asInt128()`: U256 to int128
- `_U256.asInt256()`: U256 to int256

#### As U256

- `_uint256.asU256()`: convert a uint256 to U256
- `_int256.asU256()`: convert an int256 to U256

#### Example

```solidity
import { UnsafeU256 } from '@0xdoublesharp/unsafe-math/contracts/UnsafeU256.sol';
import { U256 } from '@0xdoublesharp/unsafe-math/contracts/types/U256.sol';

contract ContractA {
  using UnsafeU256 for U256;
  using UnsafeU256 for uint256;
  using UnsafeU256 for int256;

  function add(int256 a, uint256 b) external pure returns (uint256) {
    return a.asU256().add(b).asUint256();
  }

  function sub(uint256 a, uint256 b) external pure returns (uint256) {
    return (a.asU256() - b.asU256()).asUint256();
  }
}
```

### Library `UnsafeI256`

Use the `UnsafeI256` library for `I256` to access helper methods for interacting with `int256` types and functionality not available in overloaded operators.

#### Math

- `_I256.add(uint256 _addend)`: add an I256 to a int256
- `_I256.sub(uint256 _subtrahend)`: subtract an I256 from a int256
- `_I256.inc()`: increment an I256
- `_I256.dec()`: decrement an I256
- `_I256.mul(uint256 _multiplier)`: multiply an I256 by a int256
- `_I256.div(uint256 _divisor)`: divide a int256 from an I256
- `_I256.mod(uint256 _divisor)`: get the modulus of U256 and uint256

#### Comparison

- `_I256.eq(uint256 _compare)`: compare U256 and uint256 equality
- `_I256.neq(uint256 _compare)`: compare U256 and uint256 non-equality
- `_I256.lt(uint256 _compare)`: compare U256 and uint256 less than uint256
- `_I256.lte(uint256 _compare)`: compare U256 less than or equal to uint256
- `_I256.gt(uint256 _compare`: compare U256 greater than uint256
- `_I256.gte(uint256 _compare)`: compare U256 greater than or equal to uint256

#### Bitwise

- `_I256.and(uint256 _operator)`: bitwise AND on U256 and uint256
- `_I256.or(uint256 _operator)`: bitwise OR on U256 and uint256
- `_I256.xor(uint256 _operator)`: bitwise XOR on U256 and uint256
- `_I256.not()`: bitwise NOT on U256

#### As Unsigned Integer

- `_I256.asUint8()`: U256 to uint8
- `_I256.asUint16()`: U256 to uint16
- `_I256.asUint32()`: U256 to uint32
- `_I256.asUint64()`: U256 to uint64
- `_I256.asUint128()`: U256 to uint128
- `_I256.asUint256()`: U256 to uint256

#### As Signed Integer

- `_I256.asInt8()`: U256 to int8
- `_I256.asInt16()`: U256 to int16
- `_I256.asInt32()`: U256 to int32
- `_I256.asInt64()`: U256 to int64
- `_I256.asInt128()`: U256 to int128
- `_I256.asInt256()`: U256 to int256

#### As an I256

- `_uint256.asI256()`: convert a int256 to I256
- `_int256.asI256()`: convert an int256 to I256

#### Example

```solidity
import { UnsafeI256 } from '@0xdoublesharp/unsafe-math/contracts/UnsafeI256.sol';
import { I256 } from '@0xdoublesharp/unsafe-math/contracts/types/I256.sol';

contract ContractB {
  using UnsafeI256 for I256;
  using UnsafeI256 for uint256;
  using UnsafeI256 for int256;

  function add(int256 a, uint256 b) external pure returns (int256) {
    I256 _a = a.asI256();
    return _a.add(int256(b)).asInt256();
  }

  function sub(uint256 a, uint256 b) external pure returns (int256) {
    I256 _a = a.asI256();
    I256 _b = b.asI256();
    return (a - b).asInt256();
  }
}
```

## Gas Usage Optimization Disabled

```
  I256
    Math
      ✔ Add (502ms)
        -------------
        🚗 safe 245
        🏎️ unsafe 132
        ⛽ saves 113 / 46%
      ✔ Sub
        -------------
        🚗 safe 242
        🏎️ unsafe 132
        ⛽ saves 110 / 45%
      ✔ Mul
        -------------
        🚗 safe 305
        🏎️ unsafe 134
        ⛽ saves 171 / 56%
      ✔ Div
        -------------
        🚗 safe 240
        🏎️ unsafe 147
        ⛽ saves 93 / 38%
      ✔ Mod (40ms)
        -------------
        🚗 safe 196
        🏎️ unsafe 147
        ⛽ saves 49 / 25%

  U256
    Math
      ✔ Add
        -------------
        🚗 safe 203
        🏎️ unsafe 132
        ⛽ saves 71 / 34%
      ✔ Sub
        -------------
        🚗 safe 203
        🏎️ unsafe 132
        ⛽ saves 71 / 34%
      ✔ Mul
        -------------
        🚗 safe 267
        🏎️ unsafe 134
        ⛽ saves 133 / 49%
      ✔ Div
        -------------
        🚗 safe 196
        🏎️ unsafe 147
        ⛽ saves 49 / 25%
      ✔ Mod
        -------------
        🚗 safe 196
        🏎️ unsafe 147
        ⛽ saves 49 / 25%

  UnsafeI256
    Math
      ✔ Add
        -------------
        🚗 safe 245
        🏎️ unsafe 147
        ⛽ saves 98 / 40%
      ✔ Sub
        -------------
        🚗 safe 242
        🏎️ unsafe 147
        ⛽ saves 95 / 39%
      ✔ Mul
        -------------
        🚗 safe 305
        🏎️ unsafe 149
        ⛽ saves 156 / 51%
      ✔ Div
        -------------
        🚗 safe 240
        🏎️ unsafe 162
        ⛽ saves 78 / 32%
      ✔ Mod
        -------------
        🚗 safe 196
        🏎️ unsafe 162
        ⛽ saves 34 / 17%

  Int256
    Math
      ✔ Add
        -------------
        🚗 safe 245
        🏎️ unsafe 84
        ⛽ saves 161 / 65%
      ✔ Sub
        -------------
        🚗 safe 242
        🏎️ unsafe 84
        ⛽ saves 158 / 65%
      ✔ Mul
        -------------
        🚗 safe 305
        🏎️ unsafe 86
        ⛽ saves 219 / 71%
      ✔ Div
        -------------
        🚗 safe 245
        🏎️ unsafe 84
        ⛽ saves 161 / 65%
      ✔ Mod
        -------------
        🚗 safe 196
        🏎️ unsafe 99
        ⛽ saves 97 / 49%
      ✔ Inc
        -------------
        🚗 safe 149
        🏎️ unsafe 72
        ⛽ saves 77 / 51%
      ✔ Dec
        -------------
        🚗 safe 149
        🏎️ unsafe 75
        ⛽ saves 74 / 49%

  Uint256
    Math
      ✔ Add
        -------------
        🚗 safe 203
        🏎️ unsafe 84
        ⛽ saves 119 / 58%
      ✔ Sub
        -------------
        🚗 safe 203
        🏎️ unsafe 84
        ⛽ saves 119 / 58%
      ✔ Mul
        -------------
        🚗 safe 267
        🏎️ unsafe 86
        ⛽ saves 181 / 67%
      ✔ Div
        -------------
        🚗 safe 196
        🏎️ unsafe 99
        ⛽ saves 97 / 49%
      ✔ Mod
        -------------
        🚗 safe 196
        🏎️ unsafe 99
        ⛽ saves 97 / 49%
      ✔ Exp
        -------------
        🚗 safe 435
        🏎️ unsafe 154
        ⛽ saves 281 / 64%
      ✔ Inc
        -------------
        🚗 safe 149
        🏎️ unsafe 72
        ⛽ saves 77 / 51%
      ✔ Dec
        -------------
        🚗 safe 149
        🏎️ unsafe 75
        ⛽ saves 74 / 49%
```
