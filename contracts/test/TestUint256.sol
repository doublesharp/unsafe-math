// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TestUint256 {
    function add(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result) {
        gasUsed = gasleft();
        result = a + b;
        gasUsed -= gasleft();
    }

    function sub(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result) {
        gasUsed = gasleft();
        result = a - b;
        gasUsed -= gasleft();
    }

    function mul(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result) {
        gasUsed = gasleft();
        result = a * b;
        gasUsed -= gasleft();
    }

    function div(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result) {
        gasUsed = gasleft();
        result = a / b;
        gasUsed -= gasleft();
    }

    function mod(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result) {
        gasUsed = gasleft();
        result = a % b;
        gasUsed -= gasleft();
    }

    function exp(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result) {
        gasUsed = gasleft();
        result = a ** b;
        gasUsed -= gasleft();
    }

    function inc(uint256 a) external view returns (uint256 gasUsed, uint256 result) {
        gasUsed = gasleft();
        result = ++a;
        gasUsed -= gasleft();
    }

    function dec(uint256 a) external view returns (uint256 gasUsed, uint256 result) {
        gasUsed = gasleft();
        result = --a;
        gasUsed -= gasleft();
    }

    function rshift(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result) {
        gasUsed = gasleft();
        result = a >> b;
        gasUsed -= gasleft();
    }

    function lshift(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result) {
        gasUsed = gasleft();
        result = a << b;
        gasUsed -= gasleft();
    }

    function and(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result) {
        gasUsed = gasleft();
        result = a & b;
        gasUsed -= gasleft();
    }

    function or(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result) {
        gasUsed = gasleft();
        result = a | b;
        gasUsed -= gasleft();
    }

    function xor(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result) {
        gasUsed = gasleft();
        result = a ^ b;
        gasUsed -= gasleft();
    }

    function not(uint256 a) external view returns (uint256 gasUsed, uint256 result) {
        gasUsed = gasleft();
        result = ~a;
        gasUsed -= gasleft();
    }

    function eq(uint256 a, uint256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a == b;
        gasUsed -= gasleft();
    }

    function neq(uint256 a, uint256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a != b;
        gasUsed -= gasleft();
    }

    function lt(uint256 a, uint256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a < b;
        gasUsed -= gasleft();
    }

    function lte(uint256 a, uint256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a <= b;
        gasUsed -= gasleft();
    }

    function gt(uint256 a, uint256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a > b;
        gasUsed -= gasleft();
    }

    function gte(uint256 a, uint256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a >= b;
        gasUsed -= gasleft();
    }

    function asUints(uint256 a) external pure returns (uint8 _uint8, uint16 _uint16, uint32 _uint32, uint64 _uint64, uint128 _uint128, uint256 _uint256) {
        _uint8 = uint8(a);
        _uint16 = uint16(a);
        _uint32 = uint32(a);
        _uint64 = uint64(a);
        _uint128 = uint128(a);
        _uint256 = uint256(a);
    }

    function asInts(uint256 a) external pure returns (int8 _int8, int16 _int16, int32 _int32, int64 _int64, int128 _int128, int256 _int256) {
        _int8 = int8(int256(a));
        _int16 = int16(int256(a));
        _int32 = int32(int256(a));
        _int64 = int64(int256(a));
        _int128 = int128(int256(a));
        _int256 = int256(a);
    }
}
