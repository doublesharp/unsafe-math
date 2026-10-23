// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {TestBase} from './TestBase.sol';

contract CheckedReferencesTest is TestBase {
    address internal unsignedReference;
    address internal signedReference;

    function setUp() public {
        unsignedReference = deploy('TestUint256.sol:TestUint256');
        signedReference = deploy('TestInt256.sol:TestInt256');
    }

    function panic(address target, bytes memory data, uint256 code) internal view {
        (bool success, bytes memory reason) = target.staticcall(data);
        require(!success, 'checked reference must revert');
        require(keccak256(reason) == keccak256(abi.encodeWithSignature('Panic(uint256)', code)), 'unexpected panic');
    }

    function test_UnsignedArithmeticPanics() public view {
        panic(unsignedReference, abi.encodeWithSignature('add(uint256,uint256)', type(uint256).max, 1), 0x11);
        panic(unsignedReference, abi.encodeWithSignature('sub(uint256,uint256)', 0, 1), 0x11);
        panic(unsignedReference, abi.encodeWithSignature('mul(uint256,uint256)', type(uint256).max, 2), 0x11);
        panic(unsignedReference, abi.encodeWithSignature('exp(uint256,uint256)', 2, 256), 0x11);
        panic(unsignedReference, abi.encodeWithSignature('inc(uint256)', type(uint256).max), 0x11);
        panic(unsignedReference, abi.encodeWithSignature('dec(uint256)', 0), 0x11);
    }

    function test_SignedArithmeticPanics() public view {
        panic(signedReference, abi.encodeWithSignature('add(int256,int256)', type(int256).max, 1), 0x11);
        panic(signedReference, abi.encodeWithSignature('sub(int256,int256)', type(int256).min, 1), 0x11);
        panic(signedReference, abi.encodeWithSignature('mul(int256,int256)', type(int256).min, int256(-1)), 0x11);
        panic(signedReference, abi.encodeWithSignature('div(int256,int256)', type(int256).min, int256(-1)), 0x11);
        panic(signedReference, abi.encodeWithSignature('inc(int256)', type(int256).max), 0x11);
        panic(signedReference, abi.encodeWithSignature('dec(int256)', type(int256).min), 0x11);
    }

    function test_ZeroDivisorsPanicInCheckedReferences() public view {
        panic(unsignedReference, abi.encodeWithSignature('div(uint256,uint256)', 1, 0), 0x12);
        panic(unsignedReference, abi.encodeWithSignature('mod(uint256,uint256)', 1, 0), 0x12);
        panic(signedReference, abi.encodeWithSignature('div(int256,int256)', 1, 0), 0x12);
        panic(signedReference, abi.encodeWithSignature('mod(int256,int256)', 1, 0), 0x12);
    }
}
