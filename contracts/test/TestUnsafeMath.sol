// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {UnsafeMath} from '../UnsafeMath.sol';

contract TestUnsafeMath {
    using UnsafeMath for uint256;

    function safeAdd(uint256 a, uint256 b) external pure returns (uint256) {
        return a + b;
    }

    function safeSub(uint256 a, uint256 b) external pure returns (uint256) {
        return a - b;
    }

    function safeMul(uint256 a, uint256 b) external pure returns (uint256) {
        return a * b;
    }

    function safeDiv(uint256 a, uint256 b) external pure returns (uint256) {
        return a / b;
    }

    function unsafeAdd(uint256 a, uint256 b) external pure returns (uint256) {
        return a.add(b);
    }

    function unsafeSub(uint256 a, uint256 b) external pure returns (uint256) {
        return a.sub(b);
    }

    function unsafeMul(uint256 a, uint256 b) external pure returns (uint256) {
        return a.mul(b);
    }

    function unsafeDiv(uint256 a, uint256 b) external pure returns (uint256) {
        return a.div(b);
    }
}
