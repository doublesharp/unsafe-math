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

    function inc(I256 a) external view returns (uint256 gasUsed, I256 result) {
        gasUsed = gasleft();
        result = a + ONE;
        gasUsed -= gasleft();
    }

    function dec(I256 a) external view returns (uint256 gasUsed, I256 result) {
        gasUsed = gasleft();
        result = a - ONE;
        gasUsed -= gasleft();
    }
}
