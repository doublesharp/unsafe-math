import { expect } from 'chai';

import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';

import { BigNumber } from 'ethers';

import { fixtures, assertSavesGas, printGasReport } from './lib/utils';

describe('I256', () => {
  let safeGas: BigNumber, unsafeGas: BigNumber;
  let safeResult: BigNumber, unsafeResult: BigNumber;
  let safeBoolResult = true,
    unsafeBoolResult = false;

  beforeEach(async () => {
    safeGas = BigNumber.from(0);
    unsafeGas = BigNumber.from(0);
    safeResult = BigNumber.from(0);
    unsafeResult = BigNumber.from(0);
    safeBoolResult = true;
    unsafeBoolResult = false;
  });

  afterEach(async () => {
    printGasReport(safeGas, unsafeGas);
  });

  describe('Math', () => {
    it('Add', async () => {
      const { testInt256, testI256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.add(1, 2);
      [unsafeGas, unsafeResult] = await testI256.add(1, 2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Sub', async () => {
      const { testInt256, testI256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.sub(2, 1);
      [unsafeGas, unsafeResult] = await testI256.sub(2, 1);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Mul', async () => {
      const { testInt256, testI256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.mul(2, 2);
      [unsafeGas, unsafeResult] = await testI256.mul(2, 2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Div', async () => {
      const { testInt256, testI256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.div(4, 2);
      [unsafeGas, unsafeResult] = await testI256.div(4, 2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Mod', async () => {
      const { testInt256, testI256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.mod(333, 2);
      [unsafeGas, unsafeResult] = await testI256.mod(333, 2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });
  });

  describe('Bitwise', () => {
    it('And', async () => {
      const { testInt256, testI256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.and(2234, 22342234);
      [unsafeGas, unsafeResult] = await testI256.and(2234, 22342234);

      expect(safeResult).to.equal(unsafeResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Or', async () => {
      const { testInt256, testI256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.or(2234, 22342234);
      [unsafeGas, unsafeResult] = await testI256.or(2234, 22342234);

      expect(safeResult).to.equal(unsafeResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Xor', async () => {
      const { testInt256, testI256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.xor(2234, 22342234);
      [unsafeGas, unsafeResult] = await testI256.xor(2234, 22342234);

      expect(safeResult).to.equal(unsafeResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Not', async () => {
      const { testInt256, testI256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.not(2234);
      [unsafeGas, unsafeResult] = await testI256.not(2234);

      expect(safeResult).to.equal(unsafeResult);
      // assertSavesGas(safeGas, unsafeGas);
    });
  });

  describe('Comparison', () => {

    it('Eq', async () => {
      const { testInt256, testI256 } = await loadFixture(fixtures);

      [safeGas, safeBoolResult] = await testInt256.eq(2234, 2234);
      [unsafeGas, unsafeBoolResult] = await testI256.eq(2234, 2234);

      expect(safeBoolResult).to.equal(unsafeBoolResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Neq', async () => {
      const { testInt256, testI256 } = await loadFixture(fixtures);

      [safeGas, safeBoolResult] = await testInt256.neq(2234, 2234);
      [unsafeGas, unsafeBoolResult] = await testI256.neq(2234, 2234);

      expect(safeBoolResult).to.equal(unsafeBoolResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Gt', async () => {
      const { testInt256, testI256 } = await loadFixture(fixtures);

      [safeGas, safeBoolResult] = await testInt256.gt(2234, 2234);
      [unsafeGas, unsafeBoolResult] = await testI256.gt(2234, 2234);

      expect(safeBoolResult).to.equal(unsafeBoolResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Gte', async () => {
      const { testInt256, testI256 } = await loadFixture(fixtures);

      [safeGas, safeBoolResult] = await testInt256.gte(2234, 2234);
      [unsafeGas, unsafeBoolResult] = await testI256.gte(2234, 2234);

      expect(safeBoolResult).to.equal(unsafeBoolResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Lt', async () => {
      const { testInt256, testI256 } = await loadFixture(fixtures);

      [safeGas, safeBoolResult] = await testInt256.lt(2234, 2234);
      [unsafeGas, unsafeBoolResult] = await testI256.lt(2234, 2234);

      expect(safeBoolResult).to.equal(unsafeBoolResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Lte', async () => {
      const { testInt256, testI256 } = await loadFixture(fixtures);

      [safeGas, safeBoolResult] = await testInt256.lte(2234, 2234);
      [unsafeGas, unsafeBoolResult] = await testI256.lte(2234, 2234);

      expect(safeBoolResult).to.equal(unsafeBoolResult);
      // assertSavesGas(safeGas, unsafeGas);
    });
  });
});
