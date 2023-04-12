// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {UnsafeMath} from './UnsafeMath.sol';
import {I256} from './types/I256.sol';

library UnsafeI256 {
    using UnsafeMath for int256;

    function asI256(int256 _i256) internal pure returns (I256) {
        return I256.wrap(_i256);
    }

    function asI256(uint256 _i256) internal pure returns (I256) {
        return I256.wrap(int256(_i256));
    }

    function asInt256(I256 _i256) internal pure returns (int256) {
        return I256.unwrap(_i256);
    }

    function asInt128(I256 _i256) internal pure returns (int128) {
        return int128(I256.unwrap(_i256));
    }

    function asInt64(I256 _i256) internal pure returns (int64) {
        return int64(I256.unwrap(_i256));
    }

    function asInt32(I256 _i256) internal pure returns (int32) {
        return int32(I256.unwrap(_i256));
    }

    function asInt16(I256 _i256) internal pure returns (int16) {
        return int16(I256.unwrap(_i256));
    }

    function asInt8(I256 _i256) internal pure returns (int8) {
        return int8(I256.unwrap(_i256));
    }

    function asUint256(I256 _u256) internal pure returns (uint256) {
        return uint256(I256.unwrap(_u256));
    }

    function asUint128(I256 _i256) internal pure returns (uint128) {
        return uint128(uint256(I256.unwrap(_i256)));
    }

    function asUint64(I256 _i256) internal pure returns (uint64) {
        return uint64(uint256(I256.unwrap(_i256)));
    }

    function asUint32(I256 _i256) internal pure returns (uint32) {
        return uint32(uint256(I256.unwrap(_i256)));
    }

    function asUint16(I256 _i256) internal pure returns (uint16) {
        return uint16(uint256(I256.unwrap(_i256)));
    }

    function asUint8(I256 _i256) internal pure returns (uint8) {
        return uint8(uint256(I256.unwrap(_i256)));
    }

    function add(I256 _i256, int256 _addend) internal pure returns (I256) {
        return I256.wrap(I256.unwrap(_i256).add(_addend));
    }

    function sub(I256 _i256, int256 _subtrahend) internal pure returns (I256) {
        return I256.wrap(I256.unwrap(_i256).sub(_subtrahend));
    }

    function inc(I256 _i256) internal pure returns (I256) {
        return I256.wrap(I256.unwrap(_i256).inc());
    }

    function dec(I256 _i256) internal pure returns (I256) {
        return I256.wrap(I256.unwrap(_i256).dec());
    }

    function mul(I256 _i256, int256 _multiplier) internal pure returns (I256) {
        return I256.wrap(I256.unwrap(_i256).mul(_multiplier));
    }

    function div(I256 _i256, int256 _divisor) internal pure returns (I256) {
        return I256.wrap(I256.unwrap(_i256).div(_divisor));
    }

    function mod(I256 _i256, int256 _divisor) internal pure returns (I256) {
        return I256.wrap(I256.unwrap(_i256).mod(_divisor));
    }

    function and(I256 _i256, int256 _value) internal pure returns (I256) {
        return I256.wrap(I256.unwrap(_i256) & _value);
    }

    function or(I256 _i256, int256 _value) internal pure returns (I256) {
        return I256.wrap(I256.unwrap(_i256) | _value);
    }

    function xor(I256 _i256, int256 _value) internal pure returns (I256) {
        return I256.wrap(I256.unwrap(_i256) ^ _value);
    }

    function not(I256 _i256) internal pure returns (I256) {
        return I256.wrap(~I256.unwrap(_i256));
    }

    function neq(I256 _i256, int256 _value) internal pure returns (bool) {
        return I256.unwrap(_i256) != _value;
    }

    function eq(I256 _i256, int256 _value) internal pure returns (bool) {
        return I256.unwrap(_i256) == _value;
    }

    function gt(I256 _i256, int256 _value) internal pure returns (bool) {
        return I256.unwrap(_i256) > _value;
    }

    function gte(I256 _i256, int256 _value) internal pure returns (bool) {
        return I256.unwrap(_i256) >= _value;
    }

    function lt(I256 _i256, int256 _value) internal pure returns (bool) {
        return I256.unwrap(_i256) < _value;
    }

    function lte(I256 _i256, int256 _value) internal pure returns (bool) {
        return I256.unwrap(_i256) <= _value;
    }
}
