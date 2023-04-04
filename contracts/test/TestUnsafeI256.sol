// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {I256} from '../types/I256.sol';
import {UnsafeI256} from '../UnsafeI256.sol';

contract TestUnsafeI256 {
    using UnsafeI256 for I256;

    I256 private constant ONE = I256.wrap(1);

    function add(I256 a, int256 b) external view returns (uint256 gasUsed, I256 result) {
        gasUsed = gasleft();
        result = a.add(b);
        gasUsed -= gasleft();
    }

    function sub(I256 a, int256 b) external view returns (uint256 gasUsed, I256 result) {
        gasUsed = gasleft();
        result = a.sub(b);
        gasUsed -= gasleft();
    }

    function mul(I256 a, int256 b) external view returns (uint256 gasUsed, I256 result) {
        gasUsed = gasleft();
        result = a.mul(b);
        gasUsed -= gasleft();
    }

    function div(I256 a, int256 b) external view returns (uint256 gasUsed, I256 result) {
        gasUsed = gasleft();
        result = a.div(b);
        gasUsed -= gasleft();
    }

    function mod(I256 a, int256 b) external view returns (uint256 gasUsed, I256 result) {
        gasUsed = gasleft();
        result = a.mod(b);
        gasUsed -= gasleft();
    }

    function and(I256 a, int256 b) external view returns (uint256 gasUsed, I256 result) {
        gasUsed = gasleft();
        result = a.and(b);
        gasUsed -= gasleft();
    }

    function or(I256 a, int256 b) external view returns (uint256 gasUsed, I256 result) {
        gasUsed = gasleft();
        result = a.or(b);
        gasUsed -= gasleft();
    }

    function xor(I256 a, int256 b) external view returns (uint256 gasUsed, I256 result) {
        gasUsed = gasleft();
        result = a.xor(b);
        gasUsed -= gasleft();
    }

    function not(I256 a) external view returns (uint256 gasUsed, I256 result) {
        gasUsed = gasleft();
        result = a.not();
        gasUsed -= gasleft();
    }

    function eq(I256 a, int256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a.eq(b);
        gasUsed -= gasleft();
    }

    function neq(I256 a, int256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a.neq(b);
        gasUsed -= gasleft();
    }

    function lt(I256 a, int256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a.lt(b);
        gasUsed -= gasleft();
    }

    function lte(I256 a, int256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a.lte(b);
        gasUsed -= gasleft();
    }

    function gt(I256 a, int256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a.gt(b);
        gasUsed -= gasleft();
    }

    function gte(I256 a, int256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a.gte(b);
        gasUsed -= gasleft();
    }

    function asUints(I256 a) external pure returns (uint8 _uint8, uint16 _uint16, uint32 _uint32, uint64 _uint64, uint128 _uint128, uint256 _uint256) {
        _uint8 = a.asUint8();
        _uint16 = a.asUint16();
        _uint32 = a.asUint32();
        _uint64 = a.asUint64();
        _uint128 = a.asUint128();
        _uint256 = a.asUint256();
    }

    function asInts(I256 a) external pure returns (int8 _int8, int16 _int16, int32 _int32, int64 _int64, int128 _int128, int256 _int256) {
        _int8 = a.asInt8();
        _int16 = a.asInt16();
        _int32 = a.asInt32();
        _int64 = a.asInt64();
        _int128 = a.asInt128();
        _int256 = a.asInt256();
    }
}
