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

    function inc(I256 a) external view returns (uint256 gasUsed, I256 result) {
        gasUsed = gasleft();
        result = a.add(1);
        gasUsed -= gasleft();
    }

    function dec(I256 a) external view returns (uint256 gasUsed, I256 result) {
        gasUsed = gasleft();
        result = a.sub(1);
        gasUsed -= gasleft();
    }
}
