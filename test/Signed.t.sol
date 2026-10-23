// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {TestBase} from './TestBase.sol';

interface ISigned {
    function add(int256 a, int256 b) external view returns (uint256 gasUsed, int256 result);
    function sub(int256 a, int256 b) external view returns (uint256 gasUsed, int256 result);
    function mul(int256 a, int256 b) external view returns (uint256 gasUsed, int256 result);
    function div(int256 a, int256 b) external view returns (uint256 gasUsed, int256 result);
    function mod(int256 a, int256 b) external view returns (uint256 gasUsed, int256 result);
    function and(int256 a, int256 b) external view returns (uint256 gasUsed, int256 result);
    function or(int256 a, int256 b) external view returns (uint256 gasUsed, int256 result);
    function xor(int256 a, int256 b) external view returns (uint256 gasUsed, int256 result);
    function inc(int256 a) external view returns (uint256 gasUsed, int256 result);
    function dec(int256 a) external view returns (uint256 gasUsed, int256 result);
    function not(int256 a) external view returns (uint256 gasUsed, int256 result);
    function eq(int256 a, int256 b) external view returns (uint256 gasUsed, bool result);
    function neq(int256 a, int256 b) external view returns (uint256 gasUsed, bool result);
    function lt(int256 a, int256 b) external view returns (uint256 gasUsed, bool result);
    function lte(int256 a, int256 b) external view returns (uint256 gasUsed, bool result);
    function gt(int256 a, int256 b) external view returns (uint256 gasUsed, bool result);
    function gte(int256 a, int256 b) external view returns (uint256 gasUsed, bool result);
}

contract SignedArithmeticTest is TestBase {
    ISigned[3] internal targets;

    function setUp() public {
        targets[0] = ISigned(deploy('TestUnsafeMathInt256.sol:TestUnsafeMathInt256'));
        targets[1] = ISigned(deploy('TestUnsafeMathI256.sol:TestUnsafeMathI256'));
        targets[2] = ISigned(deploy('TestI256.sol:TestI256'));
    }

    function checkBinary(int256 a, int256 b) internal view {
        for (uint256 i; i < targets.length; ++i) {
            (, int256 value) = targets[i].add(a, b);
            eq(value, int256(wrappedAdd(uint256(a), uint256(b))));
            (, value) = targets[i].sub(a, b);
            eq(value, int256(wrappedSub(uint256(a), uint256(b))));
            (, value) = targets[i].mul(a, b);
            eq(value, int256(wrappedMul(uint256(a), uint256(b))));
            (, value) = targets[i].div(a, b);
            eq(value, signedDiv(a, b));
            (, value) = targets[i].mod(a, b);
            eq(value, signedMod(a, b));
        }
    }

    function testFuzz_Binary(int256 a, int256 b) public view {
        checkBinary(a, b);
    }

    function test_BinaryBoundaries() public view {
        int256[11] memory values =
            [type(int256).min, type(int256).min + 1, -5, -2, -1, 0, 1, 2, 5, type(int256).max - 1, type(int256).max];
        for (uint256 a; a < values.length; ++a) {
            for (uint256 b; b < values.length; ++b) {
                checkBinary(values[a], values[b]);
            }
        }
    }

    function testFuzz_Unary(int256 a) public view {
        for (uint256 i; i < 2; ++i) {
            (, int256 value) = targets[i].inc(a);
            eq(value, int256(wrappedAdd(uint256(a), 1)));
            (, value) = targets[i].dec(a);
            eq(value, int256(wrappedSub(uint256(a), 1)));
        }
    }

    function test_ExplicitWrappingAndDivision() public view {
        for (uint256 i; i < targets.length; ++i) {
            (, int256 value) = targets[i].add(type(int256).max, 1);
            eq(value, type(int256).min);
            (, value) = targets[i].sub(type(int256).min, 1);
            eq(value, type(int256).max);
            (, value) = targets[i].mul(type(int256).min, -1);
            eq(value, type(int256).min);
            (, value) = targets[i].div(type(int256).min, -1);
            eq(value, type(int256).min);
            (, value) = targets[i].mod(type(int256).min, -1);
            eq(value, int256(0));
            (, value) = targets[i].div(5, 2);
            eq(value, int256(2));
            (, value) = targets[i].div(-5, 2);
            eq(value, int256(-2));
            (, value) = targets[i].mod(-5, 2);
            eq(value, int256(-1));
        }
        testFuzz_Unary(type(int256).min);
        testFuzz_Unary(type(int256).max);
    }

    function checkLogic(int256 a, int256 b) internal view {
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
            (, int256 value) = targets[i].and(a, b);
            eq(value, a & b);
            (, value) = targets[i].or(a, b);
            eq(value, a | b);
            (, value) = targets[i].xor(a, b);
            eq(value, a ^ b);
            (, value) = targets[i].not(a);
            eq(value, ~a);
        }
    }

    function testFuzz_ComparisonsAndBits(int256 a, int256 b) public view {
        checkLogic(a, b);
    }

    function test_LogicBoundaries() public view {
        int256[7] memory values = [type(int256).min, -16, -1, 0, 1, 15, type(int256).max];
        for (uint256 a; a < values.length; ++a) {
            for (uint256 b; b < values.length; ++b) {
                checkLogic(values[a], values[b]);
            }
        }
    }
}
