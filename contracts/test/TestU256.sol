// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {U256} from '../UnsafeMath.sol';

contract TestU256 {
    function add(U256 a, U256 b) external view returns (uint256 gasUsed, U256 result) {
        gasUsed = gasleft();
        result = a + b;
        gasUsed -= gasleft();
    }

    function sub(U256 a, U256 b) external view returns (uint256 gasUsed, U256 result) {
        gasUsed = gasleft();
        result = a - b;
        gasUsed -= gasleft();
    }

    function mul(U256 a, U256 b) external view returns (uint256 gasUsed, U256 result) {
        gasUsed = gasleft();
        result = a * b;
        gasUsed -= gasleft();
    }

    function div(U256 a, U256 b) external view returns (uint256 gasUsed, U256 result) {
        gasUsed = gasleft();
        result = a / b;
        gasUsed -= gasleft();
    }

    function mod(U256 a, U256 b) external view returns (uint256 gasUsed, U256 result) {
        gasUsed = gasleft();
        result = a % b;
        gasUsed -= gasleft();
    }

    function and(U256 a, U256 b) external view returns (uint256 gasUsed, U256 result) {
        gasUsed = gasleft();
        result = a & b;
        gasUsed -= gasleft();
    }

    function or(U256 a, U256 b) external view returns (uint256 gasUsed, U256 result) {
        gasUsed = gasleft();
        result = a | b;
        gasUsed -= gasleft();
    }

    function xor(U256 a, U256 b) external view returns (uint256 gasUsed, U256 result) {
        gasUsed = gasleft();
        result = a ^ b;
        gasUsed -= gasleft();
    }

    function not(U256 a) external view returns (uint256 gasUsed, U256 result) {
        gasUsed = gasleft();
        result = ~a;
        gasUsed -= gasleft();
    }

    function eq(U256 a, U256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a == b;
        gasUsed -= gasleft();
    }

    function neq(U256 a, U256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a != b;
        gasUsed -= gasleft();
    }

    function lt(U256 a, U256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a < b;
        gasUsed -= gasleft();
    }

    function lte(U256 a, U256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a <= b;
        gasUsed -= gasleft();
    }

    function gt(U256 a, U256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a > b;
        gasUsed -= gasleft();
    }

    function gte(U256 a, U256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a >= b;
        gasUsed -= gasleft();
    }
}
