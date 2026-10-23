// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {PrimitiveUnsafeMath} from '../contracts/PrimitiveUnsafeMath.sol';
import {TestBase} from './TestBase.sol';

contract PrimitiveArithmeticTest is TestBase {
    using PrimitiveUnsafeMath for uint256;
    using PrimitiveUnsafeMath for int256;

    function testFuzz_Unsigned(uint256 a, uint256 b) public pure {
        eq(a.add(b), wrappedAdd(a, b));
        eq(a.sub(b), wrappedSub(a, b));
        eq(a.mul(b), wrappedMul(a, b));
        eq(a.div(b), b == 0 ? 0 : a / b);
        eq(a.mod(b), b == 0 ? 0 : a % b);
        eq(a.inc(), wrappedAdd(a, 1));
        eq(a.dec(), wrappedSub(a, 1));
        eq(a.exp(b), pow(a, b));
    }

    function testFuzz_Signed(int256 a, int256 b) public pure {
        eq(a.add(b), int256(wrappedAdd(uint256(a), uint256(b))));
        eq(a.sub(b), int256(wrappedSub(uint256(a), uint256(b))));
        eq(a.mul(b), int256(wrappedMul(uint256(a), uint256(b))));
        eq(a.div(b), signedDiv(a, b));
        eq(a.mod(b), signedMod(a, b));
        eq(a.inc(), int256(wrappedAdd(uint256(a), 1)));
        eq(a.dec(), int256(wrappedSub(uint256(a), 1)));
    }

    function test_UnsignedBoundaries() public pure {
        uint256[8] memory values = [uint256(0), 1, 2, 5, 255, 1 << 255, type(uint256).max - 1, type(uint256).max];
        for (uint256 i; i < values.length; ++i) {
            for (uint256 j; j < values.length; ++j) {
                testFuzz_Unsigned(values[i], values[j]);
            }
        }
        eq(uint256(2).exp(255), uint256(1) << 255);
        eq(uint256(2).exp(256), uint256(0));
        eq(uint256(0).exp(0), uint256(1));
    }

    function test_SignedBoundaries() public pure {
        int256[9] memory values = [type(int256).min, type(int256).min + 1, -5, -2, -1, 0, 1, 2, type(int256).max];
        for (uint256 i; i < values.length; ++i) {
            for (uint256 j; j < values.length; ++j) {
                testFuzz_Signed(values[i], values[j]);
            }
        }
        eq(type(int256).min.div(-1), type(int256).min);
        eq(type(int256).min.mod(-1), int256(0));
    }
}
