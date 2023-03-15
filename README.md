# Unsafe Math for Solidity 0.8+

This library and custom user types allow for the use of unchecked math operations when appropriate. 
Gas savings can be realized when it is already known that the results will not overflow.

## Install

```shell
npm install -D unsafe-math
```

```shell
yarn add -D unsafe-math
```

## UnsafeMath

### `uint256`

```solidity
import { UnsafeMath } from '@0xdoublesharp/unsafe-math/contracts/UnsafeMath.sol';

contract ContractA {
  using UnsafeMath for uint256;

  function add(uint256 a, uint256 b) external returns (uint256) {
    return a.add(b);
  }

  function while(uint256 times) external {
      uint256 _iter = times;
      while (_iter != 0) {
        _iter = _iter.dec();
        int64 _int64 = int64(_iter);
        // ...
    }
  }

  function for(uint256 times) external {
    for (uint256 _iter; iter < times; _iter = _iter.inc()) {
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

  function sub(int256 a, int256 b) external returns (int256) {
    return a.sub(b);
  }
}
```

## Unsafe Types

### `U256`

```solidity
import {U256} from '@0xdoublesharp/unsafe-math/contracts/types/U256.sol';

contract ContractA {
  function add(uint256 a, uint256 b) external returns (uint256) {
      return (U256.wrap(a) - U256.wrap(b)).asUint256();
  }

  function while(uint256 times) external {
      U256 _iter = U256.wrap(times);
      while (_iter.neq(0)) {
        _iter = _iter.dec();
        uint256 _uint256 = _iter.asUint256();
        int64 _int64 = _iter.asInt64();
        // ...
    }
  }

  function for(uint256 times) external {
    U256 _times = U256.wrap(times);
    for (U256 _iter; iter < _times; _iter = _iter.inc()) {
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
  function add(int256 a, int256 b) external returns (int256) {
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

  function add(int256 a, uint256 b) external returns (uint256) {
    return a.asU256().add(b).asUint256();
  }

  function sub(uint256 a, uint256 b) external returns (uint256) {
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

  function add(int256 a, uint256 b) external returns (int256) {
    I256 _a = a.asI256();
    return _a.add(int256(b)).asInt256();
  }

  function sub(uint256 a, uint256 b) external returns (int256) {
    I256 _a = a.asI256();
    I256 _b = b.asI256();
    return (a - b).asInt256();
  }
}
```
