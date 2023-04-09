// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {UnsafeMath} from '../UnsafeMath.sol';

contract TestUnsafeMathUint256 {
    using UnsafeMath for uint256;

    function add(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result) {
        gasUsed = gasleft();
        result = a.add(b);
        gasUsed -= gasleft();
    }

    function sub(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result) {
        gasUsed = gasleft();
        result = a.sub(b);
        gasUsed -= gasleft();
    }

    function mul(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result) {
        gasUsed = gasleft();
        result = a.mul(b);
        gasUsed -= gasleft();
    }

    function div(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result) {
        gasUsed = gasleft();
        result = a.div(b);
        gasUsed -= gasleft();
    }

    function exp(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result) {
        gasUsed = gasleft();
        result = a.exp(b);
        gasUsed -= gasleft();
    }

    function mod(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result) {
        gasUsed = gasleft();
        result = a.mod(b);
        gasUsed -= gasleft();
    }

    function inc(uint256 a) external view returns (uint256 gasUsed, uint256 result) {
        gasUsed = gasleft();
        result = a.inc();
        gasUsed -= gasleft();
    }

    function dec(uint256 a) external view returns (uint256 gasUsed, uint256 result) {
        gasUsed = gasleft();
        result = a.dec();
        gasUsed -= gasleft();
    }
}
