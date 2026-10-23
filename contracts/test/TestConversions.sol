// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {UnsafeMath, U256, I256} from '../UnsafeMath.sol';

// Test every supported conversion through the actual public extension methods.
contract TestConversions {
    using UnsafeMath for U256;
    using UnsafeMath for I256;
    using UnsafeMath for uint256;
    using UnsafeMath for int256;

    function u256ToUints(U256 value) external pure returns (uint256[32] memory results) {
        results[0] = value.asUint8();
        results[1] = value.asUint16();
        results[2] = value.asUint24();
        results[3] = value.asUint32();
        results[4] = value.asUint40();
        results[5] = value.asUint48();
        results[6] = value.asUint56();
        results[7] = value.asUint64();
        results[8] = value.asUint72();
        results[9] = value.asUint80();
        results[10] = value.asUint88();
        results[11] = value.asUint96();
        results[12] = value.asUint104();
        results[13] = value.asUint112();
        results[14] = value.asUint120();
        results[15] = value.asUint128();
        results[16] = value.asUint136();
        results[17] = value.asUint144();
        results[18] = value.asUint152();
        results[19] = value.asUint160();
        results[20] = value.asUint168();
        results[21] = value.asUint176();
        results[22] = value.asUint184();
        results[23] = value.asUint192();
        results[24] = value.asUint200();
        results[25] = value.asUint208();
        results[26] = value.asUint216();
        results[27] = value.asUint224();
        results[28] = value.asUint232();
        results[29] = value.asUint240();
        results[30] = value.asUint248();
        results[31] = value.asUint256();
    }

    function u256ToInts(U256 value) external pure returns (int256[32] memory results) {
        results[0] = value.asInt8();
        results[1] = value.asInt16();
        results[2] = value.asInt24();
        results[3] = value.asInt32();
        results[4] = value.asInt40();
        results[5] = value.asInt48();
        results[6] = value.asInt56();
        results[7] = value.asInt64();
        results[8] = value.asInt72();
        results[9] = value.asInt80();
        results[10] = value.asInt88();
        results[11] = value.asInt96();
        results[12] = value.asInt104();
        results[13] = value.asInt112();
        results[14] = value.asInt120();
        results[15] = value.asInt128();
        results[16] = value.asInt136();
        results[17] = value.asInt144();
        results[18] = value.asInt152();
        results[19] = value.asInt160();
        results[20] = value.asInt168();
        results[21] = value.asInt176();
        results[22] = value.asInt184();
        results[23] = value.asInt192();
        results[24] = value.asInt200();
        results[25] = value.asInt208();
        results[26] = value.asInt216();
        results[27] = value.asInt224();
        results[28] = value.asInt232();
        results[29] = value.asInt240();
        results[30] = value.asInt248();
        results[31] = value.asInt256();
    }

    function i256ToUints(I256 value) external pure returns (uint256[32] memory results) {
        results[0] = value.asUint8();
        results[1] = value.asUint16();
        results[2] = value.asUint24();
        results[3] = value.asUint32();
        results[4] = value.asUint40();
        results[5] = value.asUint48();
        results[6] = value.asUint56();
        results[7] = value.asUint64();
        results[8] = value.asUint72();
        results[9] = value.asUint80();
        results[10] = value.asUint88();
        results[11] = value.asUint96();
        results[12] = value.asUint104();
        results[13] = value.asUint112();
        results[14] = value.asUint120();
        results[15] = value.asUint128();
        results[16] = value.asUint136();
        results[17] = value.asUint144();
        results[18] = value.asUint152();
        results[19] = value.asUint160();
        results[20] = value.asUint168();
        results[21] = value.asUint176();
        results[22] = value.asUint184();
        results[23] = value.asUint192();
        results[24] = value.asUint200();
        results[25] = value.asUint208();
        results[26] = value.asUint216();
        results[27] = value.asUint224();
        results[28] = value.asUint232();
        results[29] = value.asUint240();
        results[30] = value.asUint248();
        results[31] = value.asUint256();
    }

    function i256ToInts(I256 value) external pure returns (int256[32] memory results) {
        results[0] = value.asInt8();
        results[1] = value.asInt16();
        results[2] = value.asInt24();
        results[3] = value.asInt32();
        results[4] = value.asInt40();
        results[5] = value.asInt48();
        results[6] = value.asInt56();
        results[7] = value.asInt64();
        results[8] = value.asInt72();
        results[9] = value.asInt80();
        results[10] = value.asInt88();
        results[11] = value.asInt96();
        results[12] = value.asInt104();
        results[13] = value.asInt112();
        results[14] = value.asInt120();
        results[15] = value.asInt128();
        results[16] = value.asInt136();
        results[17] = value.asInt144();
        results[18] = value.asInt152();
        results[19] = value.asInt160();
        results[20] = value.asInt168();
        results[21] = value.asInt176();
        results[22] = value.asInt184();
        results[23] = value.asInt192();
        results[24] = value.asInt200();
        results[25] = value.asInt208();
        results[26] = value.asInt216();
        results[27] = value.asInt224();
        results[28] = value.asInt232();
        results[29] = value.asInt240();
        results[30] = value.asInt248();
        results[31] = value.asInt256();
    }

    function signedToU256(int256 value) external pure returns (uint256) {
        return U256.unwrap(value.asU256());
    }

    function unsignedToU256(uint256 value) external pure returns (uint256) {
        return U256.unwrap(value.asU256());
    }

    function signedToI256(int256 value) external pure returns (int256) {
        return I256.unwrap(value.asI256());
    }

    function unsignedToI256(uint256 value) external pure returns (int256) {
        return I256.unwrap(value.asI256());
    }

    function leftWrapped(U256 value, U256 count) external pure returns (uint256) {
        return U256.unwrap(value.lshift(count));
    }

    function rightWrapped(U256 value, U256 count) external pure returns (uint256) {
        return U256.unwrap(value.rshift(count));
    }
}
