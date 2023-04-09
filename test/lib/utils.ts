import { ethers } from 'hardhat';
import { BigNumber } from 'ethers';
import { expect } from 'chai';

import {
  TestUint256,
  TestInt256,
  TestUnsafeMathUint256,
  TestUnsafeMathInt256,
  TestU256,
  TestI256,
  TestUnsafeU256,
  TestUnsafeI256,
} from '../../sdk/types';

export async function fixtures() {
  const [sender] = await ethers.getSigners();

  const TestUint256 = await ethers.getContractFactory('TestUint256');
  const testUint256 = (await TestUint256.deploy()) as TestUint256;

  const TestInt256 = await ethers.getContractFactory('TestInt256');
  const testInt256 = (await TestInt256.deploy()) as TestInt256;

  const TestUnsafeMathUint256 = await ethers.getContractFactory('TestUnsafeMathUint256');
  const testUnsafeMathUint256 = (await TestUnsafeMathUint256.deploy()) as TestUnsafeMathUint256;

  const TestUnsafeMathInt256 = await ethers.getContractFactory('TestUnsafeMathInt256');
  const testUnsafeMathInt256 = (await TestUnsafeMathInt256.deploy()) as TestUnsafeMathInt256;

  const TestU256 = await ethers.getContractFactory('TestU256');
  const testU256 = (await TestU256.deploy()) as TestU256;

  const TestI256 = await ethers.getContractFactory('TestI256');
  const testI256 = (await TestI256.deploy()) as TestI256;

  const TestUnsafeU256 = await ethers.getContractFactory('TestUnsafeU256');
  const testUnsafeU256 = (await TestUnsafeU256.deploy()) as TestUnsafeU256;

  const TestUnsafeI256 = await ethers.getContractFactory('TestUnsafeI256');
  const testUnsafeI256 = (await TestUnsafeI256.deploy()) as TestUnsafeI256;

  return {
    sender,
    testUint256,
    testInt256,
    testUnsafeMathUint256,
    testUnsafeMathInt256,
    testU256,
    testI256,
    testUnsafeU256,
    testUnsafeI256,
  };
}

export function assertSavesGas(safeGas: BigNumber, unsafeGas: BigNumber) {
  if (!process.env.IS_COVERAGE && safeGas.gt(0)) {
    expect(safeGas).to.be.greaterThan(unsafeGas);
  }
}

export function printGasReport(safeGas: BigNumber, unsafeGas: BigNumber) {
  if (!process.env.IS_COVERAGE && safeGas.gt(0)) {
    console.log('        -------------');
    console.log('        🚗 safe', safeGas.toString());
    console.log('        🏎️  unsafe', unsafeGas.toString());
    console.log(
      '        ⛽ saves',
      safeGas.sub(unsafeGas).toString(),
      '/',
      safeGas.sub(unsafeGas).mul(10000).div(safeGas).div(100).toString() + '%'
    );
  }
}