// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {TestBase} from './TestBase.sol';

contract GasSavingsTest is TestBase {
    event log_named_uint(string key, uint256 value);
    address[2] internal checked;
    address[8] internal targets;

    function setUp() public {
        checked[0] = deploy('TestUint256.sol:TestUint256');
        checked[1] = deploy('TestInt256.sol:TestInt256');
        targets[0] = deploy('TestUnsafeMathUint256.sol:TestUnsafeMathUint256');
        targets[1] = deploy('TestUnsafeMathU256.sol:TestUnsafeMathU256');
        targets[2] = deploy('TestU256.sol:TestU256');
        targets[3] = deploy('TestUnsafeMathInt256.sol:TestUnsafeMathInt256');
        targets[4] = deploy('TestUnsafeMathI256.sol:TestUnsafeMathI256');
        targets[5] = deploy('TestI256.sol:TestI256');
        targets[6] = deploy('TestPrimitiveUint256.sol:TestPrimitiveUint256');
        targets[7] = deploy('TestPrimitiveInt256.sol:TestPrimitiveInt256');
    }

    function compare(uint256 target, string memory label, bytes memory data, bool saves) internal {
        (bool ok, bytes memory returned) = checked[target < 3 || target == 6 ? 0 : 1].staticcall(data);
        require(ok, 'checked reference reverted');
        (uint256 checkedGas, uint256 checkedResult) = abi.decode(returned, (uint256, uint256));
        (ok, returned) = targets[target].staticcall(data);
        require(ok, 'unchecked call reverted');
        (uint256 unsafeGas, uint256 unsafeResult) = abi.decode(returned, (uint256, uint256));
        eq(unsafeResult, checkedResult);
        if (saves) require(unsafeGas < checkedGas, 'arithmetic must save gas');
        emit log_named_uint(string.concat(label, '.checked'), checkedGas);
        emit log_named_uint(string.concat(label, '.unchecked'), unsafeGas);
    }

    function testGas_Primitive_uint256_add() public {
        compare(6, 'Primitive_uint256.add', abi.encodeWithSignature('add(uint256,uint256)', 5, 2), true);
    }

    function testGas_Primitive_uint256_sub() public {
        compare(6, 'Primitive_uint256.sub', abi.encodeWithSignature('sub(uint256,uint256)', 5, 2), true);
    }

    function testGas_Primitive_uint256_mul() public {
        compare(6, 'Primitive_uint256.mul', abi.encodeWithSignature('mul(uint256,uint256)', 5, 2), true);
    }

    function testGas_Primitive_uint256_div() public {
        compare(6, 'Primitive_uint256.div', abi.encodeWithSignature('div(uint256,uint256)', 5, 2), true);
    }

    function testGas_Primitive_uint256_mod() public {
        compare(6, 'Primitive_uint256.mod', abi.encodeWithSignature('mod(uint256,uint256)', 5, 2), true);
    }

    function testGas_Primitive_uint256_inc() public {
        compare(6, 'Primitive_uint256.inc', abi.encodeWithSignature('inc(uint256)', 5), true);
    }

    function testGas_Primitive_uint256_dec() public {
        compare(6, 'Primitive_uint256.dec', abi.encodeWithSignature('dec(uint256)', 5), true);
    }

    function testGas_Primitive_uint256_exp() public {
        compare(6, 'Primitive_uint256.exp', abi.encodeWithSignature('exp(uint256,uint256)', 5, 2), true);
    }

    function testGas_Primitive_int256_add() public {
        compare(7, 'Primitive_int256.add', abi.encodeWithSignature('add(int256,int256)', 5, 2), true);
    }

    function testGas_Primitive_int256_sub() public {
        compare(7, 'Primitive_int256.sub', abi.encodeWithSignature('sub(int256,int256)', 5, 2), true);
    }

    function testGas_Primitive_int256_mul() public {
        compare(7, 'Primitive_int256.mul', abi.encodeWithSignature('mul(int256,int256)', 5, 2), true);
    }

    function testGas_Primitive_int256_div() public {
        compare(7, 'Primitive_int256.div', abi.encodeWithSignature('div(int256,int256)', 5, 2), true);
    }

    function testGas_Primitive_int256_mod() public {
        compare(7, 'Primitive_int256.mod', abi.encodeWithSignature('mod(int256,int256)', 5, 2), true);
    }

    function testGas_Primitive_int256_inc() public {
        compare(7, 'Primitive_int256.inc', abi.encodeWithSignature('inc(int256)', 5), true);
    }

    function testGas_Primitive_int256_dec() public {
        compare(7, 'Primitive_int256.dec', abi.encodeWithSignature('dec(int256)', 5), true);
    }

    function testGas_uint256_add() public {
        compare(0, 'uint256.add', abi.encodeWithSignature('add(uint256,uint256)', 5, 2), true);
    }

    function testGas_uint256_sub() public {
        compare(0, 'uint256.sub', abi.encodeWithSignature('sub(uint256,uint256)', 5, 2), true);
    }

    function testGas_uint256_mul() public {
        compare(0, 'uint256.mul', abi.encodeWithSignature('mul(uint256,uint256)', 5, 2), true);
    }

    function testGas_uint256_div() public {
        compare(0, 'uint256.div', abi.encodeWithSignature('div(uint256,uint256)', 5, 2), true);
    }

    function testGas_uint256_mod() public {
        compare(0, 'uint256.mod', abi.encodeWithSignature('mod(uint256,uint256)', 5, 2), true);
    }

    function testGas_uint256_inc() public {
        compare(0, 'uint256.inc', abi.encodeWithSignature('inc(uint256)', 5), true);
    }

    function testGas_uint256_dec() public {
        compare(0, 'uint256.dec', abi.encodeWithSignature('dec(uint256)', 5), true);
    }

    function testGas_uint256_exp() public {
        compare(0, 'uint256.exp', abi.encodeWithSignature('exp(uint256,uint256)', 5, 2), true);
    }

    function testGas_U256_helper_add() public {
        compare(1, 'U256_helper.add', abi.encodeWithSignature('add(uint256,uint256)', 5, 2), true);
    }

    function testGas_U256_helper_sub() public {
        compare(1, 'U256_helper.sub', abi.encodeWithSignature('sub(uint256,uint256)', 5, 2), true);
    }

    function testGas_U256_helper_mul() public {
        compare(1, 'U256_helper.mul', abi.encodeWithSignature('mul(uint256,uint256)', 5, 2), true);
    }

    function testGas_U256_helper_div() public {
        compare(1, 'U256_helper.div', abi.encodeWithSignature('div(uint256,uint256)', 5, 2), true);
    }

    function testGas_U256_helper_mod() public {
        compare(1, 'U256_helper.mod', abi.encodeWithSignature('mod(uint256,uint256)', 5, 2), true);
    }

    function testGas_U256_helper_inc() public {
        compare(1, 'U256_helper.inc', abi.encodeWithSignature('inc(uint256)', 5), true);
    }

    function testGas_U256_helper_dec() public {
        compare(1, 'U256_helper.dec', abi.encodeWithSignature('dec(uint256)', 5), true);
    }

    function testGas_U256_helper_exp() public {
        compare(1, 'U256_helper.exp', abi.encodeWithSignature('exp(uint256,uint256)', 5, 2), true);
    }

    function testGas_U256_helper_and() public {
        compare(1, 'U256_helper.and', abi.encodeWithSignature('and(uint256,uint256)', 5, 2), false);
    }

    function testGas_U256_helper_or() public {
        compare(1, 'U256_helper.or', abi.encodeWithSignature('or(uint256,uint256)', 5, 2), false);
    }

    function testGas_U256_helper_xor() public {
        compare(1, 'U256_helper.xor', abi.encodeWithSignature('xor(uint256,uint256)', 5, 2), false);
    }

    function testGas_U256_helper_not() public {
        compare(1, 'U256_helper.not', abi.encodeWithSignature('not(uint256)', 5), false);
    }

    function testGas_U256_helper_eq() public {
        compare(1, 'U256_helper.eq', abi.encodeWithSignature('eq(uint256,uint256)', 5, 2), false);
    }

    function testGas_U256_helper_neq() public {
        compare(1, 'U256_helper.neq', abi.encodeWithSignature('neq(uint256,uint256)', 5, 2), false);
    }

    function testGas_U256_helper_lt() public {
        compare(1, 'U256_helper.lt', abi.encodeWithSignature('lt(uint256,uint256)', 5, 2), false);
    }

    function testGas_U256_helper_lte() public {
        compare(1, 'U256_helper.lte', abi.encodeWithSignature('lte(uint256,uint256)', 5, 2), false);
    }

    function testGas_U256_helper_gt() public {
        compare(1, 'U256_helper.gt', abi.encodeWithSignature('gt(uint256,uint256)', 5, 2), false);
    }

    function testGas_U256_helper_gte() public {
        compare(1, 'U256_helper.gte', abi.encodeWithSignature('gte(uint256,uint256)', 5, 2), false);
    }

    function testGas_U256_helper_lshift() public {
        compare(1, 'U256_helper.lshift', abi.encodeWithSignature('lshift(uint256,uint256)', 5, 2), false);
    }

    function testGas_U256_helper_rshift() public {
        compare(1, 'U256_helper.rshift', abi.encodeWithSignature('rshift(uint256,uint256)', 5, 2), false);
    }

    function testGas_U256_operator_add() public {
        compare(2, 'U256_operator.add', abi.encodeWithSignature('add(uint256,uint256)', 5, 2), true);
    }

    function testGas_U256_operator_sub() public {
        compare(2, 'U256_operator.sub', abi.encodeWithSignature('sub(uint256,uint256)', 5, 2), true);
    }

    function testGas_U256_operator_mul() public {
        compare(2, 'U256_operator.mul', abi.encodeWithSignature('mul(uint256,uint256)', 5, 2), true);
    }

    function testGas_U256_operator_div() public {
        compare(2, 'U256_operator.div', abi.encodeWithSignature('div(uint256,uint256)', 5, 2), true);
    }

    function testGas_U256_operator_mod() public {
        compare(2, 'U256_operator.mod', abi.encodeWithSignature('mod(uint256,uint256)', 5, 2), true);
    }

    function testGas_U256_operator_and() public {
        compare(2, 'U256_operator.and', abi.encodeWithSignature('and(uint256,uint256)', 5, 2), false);
    }

    function testGas_U256_operator_or() public {
        compare(2, 'U256_operator.or', abi.encodeWithSignature('or(uint256,uint256)', 5, 2), false);
    }

    function testGas_U256_operator_xor() public {
        compare(2, 'U256_operator.xor', abi.encodeWithSignature('xor(uint256,uint256)', 5, 2), false);
    }

    function testGas_U256_operator_not() public {
        compare(2, 'U256_operator.not', abi.encodeWithSignature('not(uint256)', 5), false);
    }

    function testGas_U256_operator_eq() public {
        compare(2, 'U256_operator.eq', abi.encodeWithSignature('eq(uint256,uint256)', 5, 2), false);
    }

    function testGas_U256_operator_neq() public {
        compare(2, 'U256_operator.neq', abi.encodeWithSignature('neq(uint256,uint256)', 5, 2), false);
    }

    function testGas_U256_operator_lt() public {
        compare(2, 'U256_operator.lt', abi.encodeWithSignature('lt(uint256,uint256)', 5, 2), false);
    }

    function testGas_U256_operator_lte() public {
        compare(2, 'U256_operator.lte', abi.encodeWithSignature('lte(uint256,uint256)', 5, 2), false);
    }

    function testGas_U256_operator_gt() public {
        compare(2, 'U256_operator.gt', abi.encodeWithSignature('gt(uint256,uint256)', 5, 2), false);
    }

    function testGas_U256_operator_gte() public {
        compare(2, 'U256_operator.gte', abi.encodeWithSignature('gte(uint256,uint256)', 5, 2), false);
    }

    function testGas_int256_add() public {
        compare(3, 'int256.add', abi.encodeWithSignature('add(int256,int256)', 5, 2), true);
    }

    function testGas_int256_sub() public {
        compare(3, 'int256.sub', abi.encodeWithSignature('sub(int256,int256)', 5, 2), true);
    }

    function testGas_int256_mul() public {
        compare(3, 'int256.mul', abi.encodeWithSignature('mul(int256,int256)', 5, 2), true);
    }

    function testGas_int256_div() public {
        compare(3, 'int256.div', abi.encodeWithSignature('div(int256,int256)', 5, 2), true);
    }

    function testGas_int256_mod() public {
        compare(3, 'int256.mod', abi.encodeWithSignature('mod(int256,int256)', 5, 2), true);
    }

    function testGas_int256_inc() public {
        compare(3, 'int256.inc', abi.encodeWithSignature('inc(int256)', 5), true);
    }

    function testGas_int256_dec() public {
        compare(3, 'int256.dec', abi.encodeWithSignature('dec(int256)', 5), true);
    }

    function testGas_I256_helper_add() public {
        compare(4, 'I256_helper.add', abi.encodeWithSignature('add(int256,int256)', 5, 2), true);
    }

    function testGas_I256_helper_sub() public {
        compare(4, 'I256_helper.sub', abi.encodeWithSignature('sub(int256,int256)', 5, 2), true);
    }

    function testGas_I256_helper_mul() public {
        compare(4, 'I256_helper.mul', abi.encodeWithSignature('mul(int256,int256)', 5, 2), true);
    }

    function testGas_I256_helper_div() public {
        compare(4, 'I256_helper.div', abi.encodeWithSignature('div(int256,int256)', 5, 2), true);
    }

    function testGas_I256_helper_mod() public {
        compare(4, 'I256_helper.mod', abi.encodeWithSignature('mod(int256,int256)', 5, 2), true);
    }

    function testGas_I256_helper_inc() public {
        compare(4, 'I256_helper.inc', abi.encodeWithSignature('inc(int256)', 5), true);
    }

    function testGas_I256_helper_dec() public {
        compare(4, 'I256_helper.dec', abi.encodeWithSignature('dec(int256)', 5), true);
    }

    function testGas_I256_helper_and() public {
        compare(4, 'I256_helper.and', abi.encodeWithSignature('and(int256,int256)', 5, 2), false);
    }

    function testGas_I256_helper_or() public {
        compare(4, 'I256_helper.or', abi.encodeWithSignature('or(int256,int256)', 5, 2), false);
    }

    function testGas_I256_helper_xor() public {
        compare(4, 'I256_helper.xor', abi.encodeWithSignature('xor(int256,int256)', 5, 2), false);
    }

    function testGas_I256_helper_not() public {
        compare(4, 'I256_helper.not', abi.encodeWithSignature('not(int256)', 5), false);
    }

    function testGas_I256_helper_eq() public {
        compare(4, 'I256_helper.eq', abi.encodeWithSignature('eq(int256,int256)', 5, 2), false);
    }

    function testGas_I256_helper_neq() public {
        compare(4, 'I256_helper.neq', abi.encodeWithSignature('neq(int256,int256)', 5, 2), false);
    }

    function testGas_I256_helper_lt() public {
        compare(4, 'I256_helper.lt', abi.encodeWithSignature('lt(int256,int256)', 5, 2), false);
    }

    function testGas_I256_helper_lte() public {
        compare(4, 'I256_helper.lte', abi.encodeWithSignature('lte(int256,int256)', 5, 2), false);
    }

    function testGas_I256_helper_gt() public {
        compare(4, 'I256_helper.gt', abi.encodeWithSignature('gt(int256,int256)', 5, 2), false);
    }

    function testGas_I256_helper_gte() public {
        compare(4, 'I256_helper.gte', abi.encodeWithSignature('gte(int256,int256)', 5, 2), false);
    }

    function testGas_I256_operator_add() public {
        compare(5, 'I256_operator.add', abi.encodeWithSignature('add(int256,int256)', 5, 2), true);
    }

    function testGas_I256_operator_sub() public {
        compare(5, 'I256_operator.sub', abi.encodeWithSignature('sub(int256,int256)', 5, 2), true);
    }

    function testGas_I256_operator_mul() public {
        compare(5, 'I256_operator.mul', abi.encodeWithSignature('mul(int256,int256)', 5, 2), true);
    }

    function testGas_I256_operator_div() public {
        compare(5, 'I256_operator.div', abi.encodeWithSignature('div(int256,int256)', 5, 2), true);
    }

    function testGas_I256_operator_mod() public {
        compare(5, 'I256_operator.mod', abi.encodeWithSignature('mod(int256,int256)', 5, 2), true);
    }

    function testGas_I256_operator_and() public {
        compare(5, 'I256_operator.and', abi.encodeWithSignature('and(int256,int256)', 5, 2), false);
    }

    function testGas_I256_operator_or() public {
        compare(5, 'I256_operator.or', abi.encodeWithSignature('or(int256,int256)', 5, 2), false);
    }

    function testGas_I256_operator_xor() public {
        compare(5, 'I256_operator.xor', abi.encodeWithSignature('xor(int256,int256)', 5, 2), false);
    }

    function testGas_I256_operator_not() public {
        compare(5, 'I256_operator.not', abi.encodeWithSignature('not(int256)', 5), false);
    }

    function testGas_I256_operator_eq() public {
        compare(5, 'I256_operator.eq', abi.encodeWithSignature('eq(int256,int256)', 5, 2), false);
    }

    function testGas_I256_operator_neq() public {
        compare(5, 'I256_operator.neq', abi.encodeWithSignature('neq(int256,int256)', 5, 2), false);
    }

    function testGas_I256_operator_lt() public {
        compare(5, 'I256_operator.lt', abi.encodeWithSignature('lt(int256,int256)', 5, 2), false);
    }

    function testGas_I256_operator_lte() public {
        compare(5, 'I256_operator.lte', abi.encodeWithSignature('lte(int256,int256)', 5, 2), false);
    }

    function testGas_I256_operator_gt() public {
        compare(5, 'I256_operator.gt', abi.encodeWithSignature('gt(int256,int256)', 5, 2), false);
    }

    function testGas_I256_operator_gte() public {
        compare(5, 'I256_operator.gte', abi.encodeWithSignature('gte(int256,int256)', 5, 2), false);
    }
}
