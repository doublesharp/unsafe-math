// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {UnsafeMath} from '../UnsafeMath.sol';

contract TestUnsafeMathInt256 {
    using UnsafeMath for int256;

    function add(int256 a, int256 b) external view returns (uint256 gasUsed, int256 result) {
        gasUsed = gasleft();
        result = a.add(b);
        gasUsed -= gasleft();
    }

    function sub(int256 a, int256 b) external view returns (uint256 gasUsed, int256 result) {
        gasUsed = gasleft();
        result = a.sub(b);
        gasUsed -= gasleft();
    }

    function mul(int256 a, int256 b) external view returns (uint256 gasUsed, int256 result) {
        gasUsed = gasleft();
        result = a.mul(b);
        gasUsed -= gasleft();
    }

    function div(int256 a, int256 b) external view returns (uint256 gasUsed, int256 result) {
        gasUsed = gasleft();
        result = a.div(b);
        gasUsed -= gasleft();
    }

    function inc(int256 a) external view returns (uint256 gasUsed, int256 result) {
        gasUsed = gasleft();
        result = a.inc();
        gasUsed -= gasleft();
    }

    function dec(int256 a) external view returns (uint256 gasUsed, int256 result) {
        gasUsed = gasleft();
        result = a.dec();
        gasUsed -= gasleft();
    }
}
