import { expect } from 'chai';

import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';

import { BigNumber } from 'ethers';

import { fixtures, assertSavesGas, printGasReport } from './lib/utils';

describe('Int256', () => {
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
      const { testInt256, testUnsafeMathInt256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.add(2, 1);
      [unsafeGas, unsafeResult] = await testUnsafeMathInt256.add(2, 1);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Sub', async () => {
      const { testInt256, testUnsafeMathInt256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.sub(2, 1);
      [unsafeGas, unsafeResult] = await testUnsafeMathInt256.sub(2, 1);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Mul', async () => {
      const { testInt256, testUnsafeMathInt256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.mul(2, 3);
      [unsafeGas, unsafeResult] = await testUnsafeMathInt256.mul(2, 3);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Div', async () => {
      const { testInt256, testUnsafeMathInt256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.add(5, 2);
      [unsafeGas, unsafeResult] = await testUnsafeMathInt256.add(5, 2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Mod', async () => {
      const { testInt256, testUnsafeMathInt256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.mod(333, 2);
      [unsafeGas, unsafeResult] = await testUnsafeMathInt256.mod(333, 2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Inc', async () => {
      const { testInt256, testUnsafeMathInt256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.inc(5);
      [unsafeGas, unsafeResult] = await testUnsafeMathInt256.inc(5);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Dec', async () => {
      const { testInt256, testUnsafeMathInt256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.dec(5);
      [unsafeGas, unsafeResult] = await testUnsafeMathInt256.dec(5);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });
  });
});
