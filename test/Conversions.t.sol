// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {TestBase} from './TestBase.sol';
import {IUnsigned} from './Unsigned.t.sol';
import {TestConversions} from '../contracts/test/TestConversions.sol';
import {U256, I256} from '../contracts/UnsafeMath.sol';

contract ConversionsTest is TestBase {
    TestConversions internal conversions;
    IUnsigned internal shifts;

    function setUp() public {
        conversions = TestConversions(deploy('TestConversions.sol:TestConversions'));
        shifts = IUnsigned(deploy('TestUnsafeMathU256.sol:TestUnsafeMathU256'));
    }

    function check(uint256 bits, bool signedSource) internal view {
        uint256[32] memory unsignedResults =
            signedSource ? conversions.i256ToUints(I256.wrap(int256(bits))) : conversions.u256ToUints(U256.wrap(bits));
        int256[32] memory signedResults =
            signedSource ? conversions.i256ToInts(I256.wrap(int256(bits))) : conversions.u256ToInts(U256.wrap(bits));
        for (uint256 i; i < 32; ++i) {
            uint256 width = 8 * (i + 1);
            uint256 mask = type(uint256).max >> (256 - width);
            uint256 low = bits & mask;
            uint256 sign = uint256(1) << (width - 1);
            int256 signedExpected = int256((low & sign) == 0 ? low : low | ~mask);
            eq(unsignedResults[i], low);
            eq(signedResults[i], signedExpected);
        }
    }

    function testFuzz_AllU256Casts(uint256 value) public view {
        check(value, false);
    }

    function testFuzz_AllI256Casts(int256 value) public view {
        check(uint256(value), true);
    }

    function test_CastBoundariesAtEveryWidth() public view {
        check(0, false);
        check(0, true);
        for (uint256 width = 8; width <= 256; width += 8) {
            uint256 sign = uint256(1) << (width - 1);
            uint256 mask = type(uint256).max >> (256 - width);
            uint256[4] memory values = [sign - 1, sign, mask, wrappedAdd(mask, 1)];
            for (uint256 j; j < values.length; ++j) {
                check(values[j], false);
                check(values[j], true);
            }
        }
        check(type(uint256).max, false);
        check(type(uint256).max, true);
    }

    function testFuzz_Wrapping(uint256 bits) public view {
        eq(conversions.signedToU256(int256(bits)), bits);
        eq(conversions.unsignedToU256(bits), bits);
        eq(conversions.signedToI256(int256(bits)), int256(bits));
        eq(conversions.unsignedToI256(bits), int256(bits));
    }

    function test_WrappingBoundaries() public view {
        testFuzz_Wrapping(0);
        testFuzz_Wrapping(1);
        testFuzz_Wrapping(uint256(type(int256).max));
        testFuzz_Wrapping(uint256(1) << 255);
        testFuzz_Wrapping(type(uint256).max);
    }

    function testFuzz_AllShiftOverloads(uint256 value, uint256 count) public view {
        uint256 left = count >= 256 ? 0 : wrappedMul(value, uint256(1) << count);
        uint256 right = count >= 256 ? 0 : value / (uint256(1) << count);
        (, uint256 actual) = shifts.lshift(value, count);
        eq(actual, left);
        (, actual) = shifts.rshift(value, count);
        eq(actual, right);
        eq(conversions.leftWrapped(U256.wrap(value), U256.wrap(count)), left);
        eq(conversions.rightWrapped(U256.wrap(value), U256.wrap(count)), right);
    }

    function test_ShiftBoundaries() public view {
        uint256[5] memory values = [uint256(0), 1, 255, 1 << 255, type(uint256).max];
        uint256[8] memory counts = [uint256(0), 1, 8, 127, 255, 256, 257, type(uint256).max];
        for (uint256 a; a < values.length; ++a) {
            for (uint256 b; b < counts.length; ++b) {
                testFuzz_AllShiftOverloads(values[a], counts[b]);
            }
        }
    }
}
