// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {UnsafeMath} from './UnsafeMath.sol';
import {U256} from './types/U256.sol';

library UnsafeU256 {
    using UnsafeMath for uint256;

    function asU256(int256 _i256) internal pure returns (U256) {
        return U256.wrap(uint256(_i256));
    }

    function asU256(uint256 _u256) internal pure returns (U256) {
        return U256.wrap(_u256);
    }

    function asUint256(U256 _u256) internal pure returns (uint256) {
        return U256.unwrap(_u256);
    }

    function asUint128(U256 _u256) internal pure returns (uint128) {
        return uint128(U256.unwrap(_u256));
    }

    function asUint64(U256 _u256) internal pure returns (uint64) {
        return uint64(U256.unwrap(_u256));
    }

    function asUint32(U256 _u256) internal pure returns (uint32) {
        return uint32(U256.unwrap(_u256));
    }

    function asUint16(U256 _u256) internal pure returns (uint16) {
        return uint16(U256.unwrap(_u256));
    }

    function asUint8(U256 _u256) internal pure returns (uint8) {
        return uint8(U256.unwrap(_u256));
    }

    function asInt256(U256 _u256) internal pure returns (int256) {
        return int256(U256.unwrap(_u256));
    }

    function asInt128(U256 _u256) internal pure returns (int128) {
        return int128(int256(U256.unwrap(_u256)));
    }

    function asInt64(U256 _u256) internal pure returns (int64) {
        return int64(int256(U256.unwrap(_u256)));
    }

    function asInt32(U256 _u256) internal pure returns (int32) {
        return int32(int256(U256.unwrap(_u256)));
    }

    function asInt16(U256 _u256) internal pure returns (int16) {
        return int16(int256(U256.unwrap(_u256)));
    }

    function asInt8(U256 _u256) internal pure returns (int8) {
        return int8(int256(U256.unwrap(_u256)));
    }

    function inc(U256 _u256) internal pure returns (U256) {
        return U256.wrap(U256.unwrap(_u256).inc());
    }

    function dec(U256 _u256) internal pure returns (U256) {
        return U256.wrap(U256.unwrap(_u256).dec());
    }

    function add(U256 _u256, uint256 _addend) internal pure returns (U256) {
        return U256.wrap(U256.unwrap(_u256).add(_addend));
    }

    function sub(U256 _u256, uint256 _subtrahend) internal pure returns (U256) {
        return U256.wrap(U256.unwrap(_u256).sub(_subtrahend));
    }

    function mul(U256 _u256, uint256 _multiplier) internal pure returns (U256) {
        return U256.wrap(U256.unwrap(_u256).mul(_multiplier));
    }

    function div(U256 _u256, uint256 _divisor) internal pure returns (U256) {
        return U256.wrap(U256.unwrap(_u256).div(_divisor));
    }

    function neq(U256 _u256, uint256 _value) internal pure returns (bool) {
        return U256.unwrap(_u256) != _value;
    }

    function eq(U256 _u256, uint256 _value) internal pure returns (bool) {
        return U256.unwrap(_u256) == _value;
    }

    function gt(U256 _u256, uint256 _value) internal pure returns (bool) {
        return U256.unwrap(_u256) > _value;
    }

    function gte(U256 _u256, uint256 _value) internal pure returns (bool) {
        return U256.unwrap(_u256) >= _value;
    }

    function lt(U256 _u256, uint256 _value) internal pure returns (bool) {
        return U256.unwrap(_u256) < _value;
    }

    function lte(U256 _u256, uint256 _value) internal pure returns (bool) {
        return U256.unwrap(_u256) <= _value;
    }
}
