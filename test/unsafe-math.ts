import { ethers, deployments } from 'hardhat';
import { expect } from 'chai';

import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';

import {
  TestUint256,
  TestInt256,
  TestUnsafeMathUint256,
  TestUnsafeMathInt256,
  TestU256,
  TestI256,
  TestUnsafeU256,
  TestUnsafeI256,
} from '../sdk/types';

import { BigNumber } from 'ethers';

async function fixtures() {
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

function savesGas(safeGas: BigNumber, unsafeGas: BigNumber) {
  if (!process.env.IS_COVERAGE) {
    console.log('        🚗 safe', safeGas.toString());
    console.log('        🏎️  unsafe', unsafeGas.toString());
    console.log(
      '        ⛽ saves',
      safeGas.sub(unsafeGas).toString(),
      '/',
      safeGas.sub(unsafeGas).mul(10000).div(safeGas).div(100).toString() + '%'
    );
    expect(safeGas).to.be.greaterThan(unsafeGas);
  }
}

describe('UnsafeMath', () => {
  describe('Uint256', () => {
    it('Add', async () => {
      const { testUint256, testUnsafeMathUint256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.add(1, 2);
      const [unsafeGas, unsafeResult] = await testUnsafeMathUint256.add(1, 2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Sub', async () => {
      const { testUint256, testUnsafeMathUint256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.sub(2, 1);
      const [unsafeGas, unsafeResult] = await testUnsafeMathUint256.sub(2, 1);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Mul', async () => {
      const { testUint256, testUnsafeMathUint256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.mul(2, 2);
      const [unsafeGas, unsafeResult] = await testUnsafeMathUint256.mul(2, 2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Div', async () => {
      const { testUint256, testUnsafeMathUint256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.div(4, 2);
      const [unsafeGas, unsafeResult] = await testUnsafeMathUint256.div(4, 2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Inc', async () => {
      const { testUint256, testUnsafeMathUint256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.inc(2);
      const [unsafeGas, unsafeResult] = await testUnsafeMathUint256.inc(2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Dec', async () => {
      const { testUint256, testUnsafeMathUint256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.dec(2);
      const [unsafeGas, unsafeResult] = await testUnsafeMathUint256.dec(2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });
  });

  describe('Int256', () => {
    it('Add', async () => {
      const { testInt256, testUnsafeMathInt256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testInt256.add(2, 1);
      const [unsafeGas, unsafeResult] = await testUnsafeMathInt256.add(2, 1);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Sub', async () => {
      const { testInt256, testUnsafeMathInt256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testInt256.sub(2, 1);
      const [unsafeGas, unsafeResult] = await testUnsafeMathInt256.sub(2, 1);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Mul', async () => {
      const { testInt256, testUnsafeMathInt256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testInt256.mul(2, 3);
      const [unsafeGas, unsafeResult] = await testUnsafeMathInt256.mul(2, 3);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Div', async () => {
      const { testInt256, testUnsafeMathInt256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testInt256.add(5, 2);
      const [unsafeGas, unsafeResult] = await testUnsafeMathInt256.add(5, 2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Inc', async () => {
      const { testInt256, testUnsafeMathInt256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testInt256.inc(5);
      const [unsafeGas, unsafeResult] = await testUnsafeMathInt256.inc(5);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Dec', async () => {
      const { testInt256, testUnsafeMathInt256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testInt256.dec(5);
      const [unsafeGas, unsafeResult] = await testUnsafeMathInt256.dec(5);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });
  });

  describe('U256', () => {
    it('Add', async () => {
      const { testUint256, testU256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.add(1, 2);
      const [unsafeGas, unsafeResult] = await testU256.add(1, 2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Sub', async () => {
      const { testUint256, testU256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.sub(2, 1);
      const [unsafeGas, unsafeResult] = await testU256.sub(2, 1);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Mul', async () => {
      const { testUint256, testU256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.mul(2, 2);
      const [unsafeGas, unsafeResult] = await testU256.mul(2, 2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Div', async () => {
      const { testUint256, testU256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.div(4, 2);
      const [unsafeGas, unsafeResult] = await testU256.div(4, 2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Inc', async () => {
      const { testUint256, testU256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.inc(2);
      const [unsafeGas, unsafeResult] = await testU256.inc(2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Dec', async () => {
      const { testUint256, testU256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.dec(2);
      const [unsafeGas, unsafeResult] = await testU256.dec(2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });
  });

  describe('I256', () => {
    it('Add', async () => {
      const { testUint256, testI256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.add(1, 2);
      const [unsafeGas, unsafeResult] = await testI256.add(1, 2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Sub', async () => {
      const { testUint256, testI256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.sub(2, 1);
      const [unsafeGas, unsafeResult] = await testI256.sub(2, 1);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Mul', async () => {
      const { testUint256, testI256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.mul(2, 2);
      const [unsafeGas, unsafeResult] = await testI256.mul(2, 2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Div', async () => {
      const { testUint256, testI256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.div(4, 2);
      const [unsafeGas, unsafeResult] = await testI256.div(4, 2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Inc', async () => {
      const { testUint256, testI256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.inc(2);
      const [unsafeGas, unsafeResult] = await testI256.inc(2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Dec', async () => {
      const { testUint256, testI256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.dec(2);
      const [unsafeGas, unsafeResult] = await testI256.dec(2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });
  });

  describe('UnsafeU256', () => {
    it('Add', async () => {
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.add(1, 2);
      const [unsafeGas, unsafeResult] = await testUnsafeU256.add(1, 2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Sub', async () => {
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.sub(2, 1);
      const [unsafeGas, unsafeResult] = await testUnsafeU256.sub(2, 1);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Mul', async () => {
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.mul(2, 2);
      const [unsafeGas, unsafeResult] = await testUnsafeU256.mul(2, 2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Div', async () => {
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.div(4, 2);
      const [unsafeGas, unsafeResult] = await testUnsafeU256.div(4, 2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Inc', async () => {
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.inc(2);
      const [unsafeGas, unsafeResult] = await testUnsafeU256.inc(2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Dec', async () => {
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.dec(2);
      const [unsafeGas, unsafeResult] = await testUnsafeU256.dec(2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });
  });

  describe('UnsafeI256', () => {
    it('Add', async () => {
      const { testUint256, testUnsafeI256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.add(1, 2);
      const [unsafeGas, unsafeResult] = await testUnsafeI256.add(1, 2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Sub', async () => {
      const { testUint256, testUnsafeI256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.sub(2, 1);
      const [unsafeGas, unsafeResult] = await testUnsafeI256.sub(2, 1);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Mul', async () => {
      const { testUint256, testUnsafeI256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.mul(2, 2);
      const [unsafeGas, unsafeResult] = await testUnsafeI256.mul(2, 2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Div', async () => {
      const { testUint256, testUnsafeI256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.div(4, 2);
      const [unsafeGas, unsafeResult] = await testUnsafeI256.div(4, 2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Inc', async () => {
      const { testUint256, testUnsafeI256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.inc(2);
      const [unsafeGas, unsafeResult] = await testUnsafeI256.inc(2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });

    it('Dec', async () => {
      const { testUint256, testUnsafeI256 } = await loadFixture(fixtures);

      const [safeGas, safeResult] = await testUint256.dec(2);
      const [unsafeGas, unsafeResult] = await testUnsafeI256.dec(2);

      expect(safeResult).to.equal(unsafeResult);
      savesGas(safeGas, unsafeGas);
    });
  });
});
