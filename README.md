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

## UnsafeMath

### `uint256`

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

### `int256`

```solidity
import { UnsafeMath } from '@0xdoublesharp/unsafe-math/contracts/UnsafeMath.sol';

contract ContractB {
  using UnsafeMath for int256;

  function sub(int256 a, int256 b) external pure returns (int256) {
    return a.sub(b);
  }
}
```

## Unsafe Types

### `U256`

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

```solidity
import { I256 } from '@0xdoublesharp/unsafe-math/contracts/types/I256.sol';

contract ContractB {
  function add(int256 a, int256 b) external pure returns (int256) {
    return (I256.wrap(a) - I256.wrap(b)).asInt256();
  }
}
```

## Unsafe Type Libraries for `uint256` and `int256`

### `UnsafeU256`

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

### `UnsafeI256`

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