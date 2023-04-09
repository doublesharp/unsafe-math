// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {U256} from '../types/U256.sol';
import {UnsafeU256} from '../UnsafeU256.sol';

contract TestUnsafeU256 {
    using UnsafeU256 for U256;

    U256 private constant ONE = U256.wrap(1);

    function add(U256 a, uint256 b) external view returns (uint256 gasUsed, U256 result) {
        gasUsed = gasleft();
        result = a.add(b);
        gasUsed -= gasleft();
    }

    function sub(U256 a, uint256 b) external view returns (uint256 gasUsed, U256 result) {
        gasUsed = gasleft();
        result = a.sub(b);
        gasUsed -= gasleft();
    }

    function mul(U256 a, uint256 b) external view returns (uint256 gasUsed, U256 result) {
        gasUsed = gasleft();
        result = a.mul(b);
        gasUsed -= gasleft();
    }

    function div(U256 a, uint256 b) external view returns (uint256 gasUsed, U256 result) {
        gasUsed = gasleft();
        result = a.div(b);
        gasUsed -= gasleft();
    }

    function mod(U256 a, uint256 b) external view returns (uint256 gasUsed, U256 result) {
        gasUsed = gasleft();
        result = a.mod(b);
        gasUsed -= gasleft();
    }

    function exp(U256 a, uint256 b) external view returns (uint256 gasUsed, U256 result) {
        gasUsed = gasleft();
        result = a.exp(b);
        gasUsed -= gasleft();
    }

    function inc(U256 a) external view returns (uint256 gasUsed, U256 result) {
        gasUsed = gasleft();
        result = a.add(1);
        gasUsed -= gasleft();
    }

    function dec(U256 a) external view returns (uint256 gasUsed, U256 result) {
        gasUsed = gasleft();
        result = a.sub(1);
        gasUsed -= gasleft();
    }

    function rshift(U256 a, uint256 b) external view returns (uint256 gasUsed, U256 result) {
        gasUsed = gasleft();
        result = a.rshift(b);
        gasUsed -= gasleft();
    }

    function lshift(U256 a, uint256 b) external view returns (uint256 gasUsed, U256 result) {
        gasUsed = gasleft();
        result = a.lshift(b);
        gasUsed -= gasleft();
    }

    function and(U256 a, uint256 b) external view returns (uint256 gasUsed, U256 result) {
        gasUsed = gasleft();
        result = a.and(b);
        gasUsed -= gasleft();
    }

    function or(U256 a, uint256 b) external view returns (uint256 gasUsed, U256 result) {
        gasUsed = gasleft();
        result = a.or(b);
        gasUsed -= gasleft();
    }

    function xor(U256 a, uint256 b) external view returns (uint256 gasUsed, U256 result) {
        gasUsed = gasleft();
        result = a.xor(b);
        gasUsed -= gasleft();
    }

    function not(U256 a) external view returns (uint256 gasUsed, U256 result) {
        gasUsed = gasleft();
        result = a.not();
        gasUsed -= gasleft();
    }

    function eq(U256 a, uint256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a.eq(b);
        gasUsed -= gasleft();
    }

    function neq(U256 a, uint256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a.neq(b);
        gasUsed -= gasleft();
    }

    function lt(U256 a, uint256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a.lt(b);
        gasUsed -= gasleft();
    }

    function lte(U256 a, uint256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a.lte(b);
        gasUsed -= gasleft();
    }

    function gt(U256 a, uint256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a.gt(b);
        gasUsed -= gasleft();
    }

    function gte(U256 a, uint256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a.gte(b);
        gasUsed -= gasleft();
    }

    function asUints(
        U256 a
    )
        external
        pure
        returns (uint8 _uint8, uint16 _uint16, uint32 _uint32, uint64 _uint64, uint128 _uint128, uint256 _uint256)
    {
        _uint8 = a.asUint8();
        _uint16 = a.asUint16();
        _uint32 = a.asUint32();
        _uint64 = a.asUint64();
        _uint128 = a.asUint128();
        _uint256 = a.asUint256();
    }

    function asInts(
        U256 a
    ) external pure returns (int8 _int8, int16 _int16, int32 _int32, int64 _int64, int128 _int128, int256 _int256) {
        _int8 = a.asInt8();
        _int16 = a.asInt16();
        _int32 = a.asInt32();
        _int64 = a.asInt64();
        _int128 = a.asInt128();
        _int256 = a.asInt256();
    }
}
