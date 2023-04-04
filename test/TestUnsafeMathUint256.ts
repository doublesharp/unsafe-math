import { expect } from 'chai';

import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';

import { BigNumber } from 'ethers';

import { fixtures, assertSavesGas, printGasReport } from './lib/utils';

describe('Uint256', () => {
  let safeGas: BigNumber, unsafeGas: BigNumber;
  let safeResult: BigNumber, unsafeResult: BigNumber;

  beforeEach(async () => {
    safeGas = BigNumber.from(0);
    unsafeGas = BigNumber.from(0);
    safeResult = BigNumber.from(0);
    unsafeResult = BigNumber.from(0);
  });

  afterEach(async () => {
    printGasReport(safeGas, unsafeGas);
  });

  describe('Math', () => {
    it('Add', async () => {
      const { testUint256, testUnsafeMathUint256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.add(1, 2);
      [unsafeGas, unsafeResult] = await testUnsafeMathUint256.add(1, 2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Sub', async () => {
      const { testUint256, testUnsafeMathUint256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.sub(2, 1);
      [unsafeGas, unsafeResult] = await testUnsafeMathUint256.sub(2, 1);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Mul', async () => {
      const { testUint256, testUnsafeMathUint256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.mul(2, 2);
      [unsafeGas, unsafeResult] = await testUnsafeMathUint256.mul(2, 2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Div', async () => {
      const { testUint256, testUnsafeMathUint256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.div(4, 2);
      [unsafeGas, unsafeResult] = await testUnsafeMathUint256.div(4, 2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Mod', async () => {
      const { testUint256, testUnsafeMathUint256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.mod(333, 2);
      [unsafeGas, unsafeResult] = await testUnsafeMathUint256.mod(333, 2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Exp', async () => {
      const { testUint256, testUnsafeMathUint256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.exp(2, 2);
      [unsafeGas, unsafeResult] = await testUnsafeMathUint256.exp(2, 2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Inc', async () => {
      const { testUint256, testUnsafeMathUint256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.inc(2);
      [unsafeGas, unsafeResult] = await testUnsafeMathUint256.inc(2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Dec', async () => {
      const { testUint256, testUnsafeMathUint256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.dec(2);
      [unsafeGas, unsafeResult] = await testUnsafeMathUint256.dec(2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });
  });
});
