// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {U256} from '../types/U256.sol';

contract TestU256 {
    U256 private constant ONE = U256.wrap(1);

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

    function inc(U256 a) external view returns (uint256 gasUsed, U256 result) {
        gasUsed = gasleft();
        result = a + ONE;
        gasUsed -= gasleft();
    }

    function dec(U256 a) external view returns (uint256 gasUsed, U256 result) {
        gasUsed = gasleft();
        result = a - ONE;
        gasUsed -= gasleft();
    }
}
