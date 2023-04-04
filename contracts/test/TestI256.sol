// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {I256} from '../types/I256.sol';

contract TestI256 {
    I256 private constant ONE = I256.wrap(1);

    function add(I256 a, I256 b) external view returns (uint256 gasUsed, I256 result) {
        gasUsed = gasleft();
        result = a + b;
        gasUsed -= gasleft();
    }

    function sub(I256 a, I256 b) external view returns (uint256 gasUsed, I256 result) {
        gasUsed = gasleft();
        result = a - b;
        gasUsed -= gasleft();
    }

    function mul(I256 a, I256 b) external view returns (uint256 gasUsed, I256 result) {
        gasUsed = gasleft();
        result = a * b;
        gasUsed -= gasleft();
    }

    function div(I256 a, I256 b) external view returns (uint256 gasUsed, I256 result) {
        gasUsed = gasleft();
        result = a / b;
        gasUsed -= gasleft();
    }

    function mod(I256 a, I256 b) external view returns (uint256 gasUsed, I256 result) {
        gasUsed = gasleft();
        result = a % b;
        gasUsed -= gasleft();
    }

    function and(I256 a, I256 b) external view returns (uint256 gasUsed, I256 result) {
        gasUsed = gasleft();
        result = a & b;
        gasUsed -= gasleft();
    }

    function or(I256 a, I256 b) external view returns (uint256 gasUsed, I256 result) {
        gasUsed = gasleft();
        result = a | b;
        gasUsed -= gasleft();
    }

    function xor(I256 a, I256 b) external view returns (uint256 gasUsed, I256 result) {
        gasUsed = gasleft();
        result = a ^ b;
        gasUsed -= gasleft();
    }

    function not(I256 a) external view returns (uint256 gasUsed, I256 result) {
        gasUsed = gasleft();
        result = ~a;
        gasUsed -= gasleft();
    }

    function eq(I256 a, I256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a == b;
        gasUsed -= gasleft();
    }

    function neq(I256 a, I256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a != b;
        gasUsed -= gasleft();
    }

    function lt(I256 a, I256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a < b;
        gasUsed -= gasleft();
    }

    function lte(I256 a, I256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a <= b;
        gasUsed -= gasleft();
    }

    function gt(I256 a, I256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a > b;
        gasUsed -= gasleft();
    }

    function gte(I256 a, I256 b) external view returns (uint256 gasUsed, bool result) {
        gasUsed = gasleft();
        result = a >= b;
        gasUsed -= gasleft();
    }
}
