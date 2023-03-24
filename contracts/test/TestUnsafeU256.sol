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
}
