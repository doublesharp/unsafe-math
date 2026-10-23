// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {TestBase} from './TestBase.sol';

interface IUnsigned {
    function add(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result);
    function sub(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result);
    function mul(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result);
    function div(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result);
    function mod(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result);
    function exp(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result);
    function and(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result);
    function or(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result);
    function xor(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result);
    function rshift(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result);
    function lshift(uint256 a, uint256 b) external view returns (uint256 gasUsed, uint256 result);
    function inc(uint256 a) external view returns (uint256 gasUsed, uint256 result);
    function dec(uint256 a) external view returns (uint256 gasUsed, uint256 result);
    function not(uint256 a) external view returns (uint256 gasUsed, uint256 result);
    function eq(uint256 a, uint256 b) external view returns (uint256 gasUsed, bool result);
    function neq(uint256 a, uint256 b) external view returns (uint256 gasUsed, bool result);
    function lt(uint256 a, uint256 b) external view returns (uint256 gasUsed, bool result);
    function lte(uint256 a, uint256 b) external view returns (uint256 gasUsed, bool result);
    function gt(uint256 a, uint256 b) external view returns (uint256 gasUsed, bool result);
    function gte(uint256 a, uint256 b) external view returns (uint256 gasUsed, bool result);
}

contract UnsignedArithmeticTest is TestBase {
    IUnsigned[3] internal targets;

    function setUp() public {
        targets[0] = IUnsigned(deploy('TestUnsafeMathUint256.sol:TestUnsafeMathUint256'));
        targets[1] = IUnsigned(deploy('TestUnsafeMathU256.sol:TestUnsafeMathU256'));
        targets[2] = IUnsigned(deploy('TestU256.sol:TestU256'));
    }

    function checkBinary(uint256 a, uint256 b) internal view {
        for (uint256 i; i < targets.length; ++i) {
            (, uint256 value) = targets[i].add(a, b);
            eq(value, wrappedAdd(a, b));
            (, value) = targets[i].sub(a, b);
            eq(value, wrappedSub(a, b));
            (, value) = targets[i].mul(a, b);
            eq(value, wrappedMul(a, b));
            (, value) = targets[i].div(a, b);
            eq(value, b == 0 ? 0 : a / b);
            (, value) = targets[i].mod(a, b);
            eq(value, b == 0 ? 0 : a % b);
        }
    }

    function testFuzz_Binary(uint256 a, uint256 b) public view {
        checkBinary(a, b);
    }

    function test_BinaryBoundaries() public view {
        uint256[8] memory values = [uint256(0), 1, 2, 5, 1 << 128, 1 << 255, type(uint256).max - 1, type(uint256).max];
        for (uint256 a; a < values.length; ++a) {
            for (uint256 b; b < values.length; ++b) {
                checkBinary(values[a], values[b]);
            }
        }
    }

    function testFuzz_Unary(uint256 a) public view {
        for (uint256 i; i < 2; ++i) {
            (, uint256 value) = targets[i].inc(a);
            eq(value, wrappedAdd(a, 1));
            (, value) = targets[i].dec(a);
            eq(value, wrappedSub(a, 1));
        }
    }

    function test_ExplicitWrapping() public view {
        for (uint256 i; i < targets.length; ++i) {
            (, uint256 value) = targets[i].add(type(uint256).max, 1);
            eq(value, uint256(0));
            (, value) = targets[i].sub(0, 1);
            eq(value, type(uint256).max);
            (, value) = targets[i].mul(type(uint256).max, 2);
            eq(value, type(uint256).max - 1);
        }
        testFuzz_Unary(0);
        testFuzz_Unary(type(uint256).max);
    }

    function testFuzz_Exponent(uint256 a, uint256 b) public view {
        for (uint256 i; i < 2; ++i) {
            (, uint256 value) = targets[i].exp(a, b);
            eq(value, pow(a, b));
        }
    }

    function test_ExponentBoundaries() public view {
        for (uint256 i; i < 2; ++i) {
            (, uint256 value) = targets[i].exp(0, 0);
            eq(value, uint256(1));
            (, value) = targets[i].exp(0, 1);
            eq(value, uint256(0));
            (, value) = targets[i].exp(2, 0);
            eq(value, uint256(1));
            (, value) = targets[i].exp(2, 255);
            eq(value, uint256(1) << 255);
            (, value) = targets[i].exp(2, 256);
            eq(value, uint256(0));
            (, value) = targets[i].exp(type(uint256).max, 2);
            eq(value, uint256(1));
        }
        testFuzz_Exponent(1, type(uint256).max);
        testFuzz_Exponent(3, type(uint256).max);
    }

    function checkLogic(uint256 a, uint256 b) internal view {
        for (uint256 i = 1; i < targets.length; ++i) {
            (, bool yes) = targets[i].eq(a, b);
            eq(yes, a == b);
            (, yes) = targets[i].neq(a, b);
            eq(yes, a != b);
            (, yes) = targets[i].lt(a, b);
            eq(yes, a < b);
            (, yes) = targets[i].lte(a, b);
            eq(yes, a <= b);
            (, yes) = targets[i].gt(a, b);
            eq(yes, a > b);
            (, yes) = targets[i].gte(a, b);
            eq(yes, a >= b);
            (, uint256 value) = targets[i].and(a, b);
            eq(value, a & b);
            (, value) = targets[i].or(a, b);
            eq(value, a | b);
            (, value) = targets[i].xor(a, b);
            eq(value, a ^ b);
            (, value) = targets[i].not(a);
            eq(value, ~a);
        }
    }

    function testFuzz_ComparisonsAndBits(uint256 a, uint256 b) public view {
        checkLogic(a, b);
    }

    function test_LogicBoundaries() public view {
        uint256[6] memory values = [uint256(0), 1, 10, 12, 1 << 255, type(uint256).max];
        for (uint256 a; a < values.length; ++a) {
            for (uint256 b; b < values.length; ++b) {
                checkLogic(values[a], values[b]);
            }
        }
    }
}
