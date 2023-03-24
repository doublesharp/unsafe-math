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
}
