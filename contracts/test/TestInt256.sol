// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TestInt256 {

    function add(int256 a, int256 b) external view returns (uint256 gasUsed, int256 result) {
        gasUsed = gasleft();
        result = a + b;
        gasUsed -= gasleft();
    }

    function sub(int256 a, int256 b) external view returns (uint256 gasUsed, int256 result) {
        gasUsed = gasleft();
        result = a - b;
        gasUsed -= gasleft();
    }

    function mul(int256 a, int256 b) external view returns (uint256 gasUsed, int256 result) {
        gasUsed = gasleft();
        result = a * b;
        gasUsed -= gasleft();
    }

    function div(int256 a, int256 b) external view returns (uint256 gasUsed, int256 result) {
        gasUsed = gasleft();
        result = a / b;
        gasUsed -= gasleft();
    }

    function mod(int256 a, int256 b) external view returns (uint256 gasUsed, int256 result) {
        gasUsed = gasleft();
        result = a % b;
        gasUsed -= gasleft();
    }

    function inc(int256 a) external view returns (uint256 gasUsed, int256 result) {
        gasUsed = gasleft();
        result = ++a;
        gasUsed -= gasleft();
    }

    function dec(int256 a) external view returns (uint256 gasUsed, int256 result) {
        gasUsed = gasleft();
        result = --a;
        gasUsed -= gasleft();
    }

    function and(int256 a, int256 b) external view returns (uint256 gasUsed, int256 result) {
        gasUsed = gasleft();
        result = a & b;
        gasUsed -= gasleft();
    }

    function or(int256 a, int256 b) external view returns (uint256 gasUsed, int256 result) {
        gasUsed = gasleft();
        result = a | b;
        gasUsed -= gasleft();
    }

    function xor(int256 a, int256 b) external view returns (uint256 gasUsed, int256 result) {
        gasUsed = gasleft();
        result = a ^ b;
        gasUsed -= gasleft();
    }

    function not(int256 a) external view returns (uint256 gasUsed, int256 result) {
        gasUsed = gasleft();
        result = ~a;
        gasUsed -= gasleft();
    }

    function eq(int256 a, int256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a == b;
        gasUsed -= gasleft();
    }

    function neq(int256 a, int256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a != b;
        gasUsed -= gasleft();
    }

    function lt(int256 a, int256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a < b;
        gasUsed -= gasleft();
    }

    function lte(int256 a, int256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a <= b;
        gasUsed -= gasleft();
    }

    function gt(int256 a, int256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a > b;
        gasUsed -= gasleft();
    }

    function gte(int256 a, int256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a >= b;
        gasUsed -= gasleft();
    }

    function asUints(int256 a) external pure returns (uint8 _uint8, uint16 _uint16, uint32 _uint32, uint64 _uint64, uint128 _uint128, uint256 _uint256) {
        _uint8 = uint8(uint256(a));
        _uint16 = uint16(uint256(a));
        _uint32 = uint32(uint256(a));
        _uint64 = uint64(uint256(a));
        _uint128 = uint128(uint256(a));
        _uint256 = uint256(a);
    }

    function asInts(int256 a) external pure returns (int8 _int8, int16 _int16, int32 _int32, int64 _int64, int128 _int128, int256 _int256) {
        _int8 = int8(a);
        _int16 = int16(a);
        _int32 = int32(a);
        _int64 = int64(a);
        _int128 = int128(a);
        _int256 = a;
    }
}
