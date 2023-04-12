import { expect } from 'chai';

import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';

import { BigNumber } from 'ethers';

import { fixtures, assertSavesGas, printGasReport } from './lib/utils';

describe('UnsafeMathI256', () => {
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
      const { testInt256, testUnsafeMathI256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.add(1, 2);
      [unsafeGas, unsafeResult] = await testUnsafeMathI256.add(1, 2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Sub', async () => {
      const { testInt256, testUnsafeMathI256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.sub(2, 1);
      [unsafeGas, unsafeResult] = await testUnsafeMathI256.sub(2, 1);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Inc', async () => {
      const { testInt256, testUnsafeMathI256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.inc(2);
      [unsafeGas, unsafeResult] = await testUnsafeMathI256.inc(2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Dec', async () => {
      const { testInt256, testUnsafeMathI256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.dec(2);
      [unsafeGas, unsafeResult] = await testUnsafeMathI256.dec(2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Mul', async () => {
      const { testInt256, testUnsafeMathI256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.mul(2, 2);
      [unsafeGas, unsafeResult] = await testUnsafeMathI256.mul(2, 2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Div', async () => {
      const { testInt256, testUnsafeMathI256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.div(4, 2);
      [unsafeGas, unsafeResult] = await testUnsafeMathI256.div(4, 2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Mod', async () => {
      const { testInt256, testUnsafeMathI256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.mod(333, 2);
      [unsafeGas, unsafeResult] = await testUnsafeMathI256.mod(333, 2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });
  });

  describe('Bitwise', () => {
    it('And', async () => {
      const { testInt256, testUnsafeMathI256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.and(0x0f, 0x03);
      [unsafeGas, unsafeResult] = await testUnsafeMathI256.and(0x0f, 0x03);

      expect(safeResult).to.equal(unsafeResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Or', async () => {
      const { testInt256, testUnsafeMathI256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.or(0x0f, 0x03);
      [unsafeGas, unsafeResult] = await testUnsafeMathI256.or(0x0f, 0x03);

      expect(safeResult).to.equal(unsafeResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Xor', async () => {
      const { testInt256, testUnsafeMathI256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.xor(0x0f, 0x03);
      [unsafeGas, unsafeResult] = await testUnsafeMathI256.xor(0x0f, 0x03);

      expect(safeResult).to.equal(unsafeResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Not', async () => {
      const { testInt256, testUnsafeMathI256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testInt256.not(0x0f);
      [unsafeGas, unsafeResult] = await testUnsafeMathI256.not(0x0f);

      expect(safeResult).to.equal(unsafeResult);
      // assertSavesGas(safeGas, unsafeGas);
    });
  });

  describe('Comparison', () => {
    it('Eq', async () => {
      const { testInt256, testUnsafeMathI256 } = await loadFixture(fixtures);

      [safeGas, safeBoolResult] = await testInt256.eq(0x0f, 0x0f);
      [unsafeGas, unsafeBoolResult] = await testUnsafeMathI256.eq(0x0f, 0x0f);

      expect(safeBoolResult).to.equal(unsafeBoolResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Neq', async () => {
      const { testInt256, testUnsafeMathI256 } = await loadFixture(fixtures);

      [safeGas, safeBoolResult] = await testInt256.neq(0x0f, 0x0f);
      [unsafeGas, unsafeBoolResult] = await testUnsafeMathI256.neq(0x0f, 0x0f);

      expect(safeBoolResult).to.equal(unsafeBoolResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Lt', async () => {
      const { testInt256, testUnsafeMathI256 } = await loadFixture(fixtures);

      [safeGas, safeBoolResult] = await testInt256.lt(0x0f, 0x0f);
      [unsafeGas, unsafeBoolResult] = await testUnsafeMathI256.lt(0x0f, 0x0f);

      expect(safeBoolResult).to.equal(unsafeBoolResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Lte', async () => {
      const { testInt256, testUnsafeMathI256 } = await loadFixture(fixtures);

      [safeGas, safeBoolResult] = await testInt256.lte(0x0f, 0x0f);
      [unsafeGas, unsafeBoolResult] = await testUnsafeMathI256.lte(0x0f, 0x0f);

      expect(safeBoolResult).to.equal(unsafeBoolResult);
    });

    it('Gt', async () => {
      const { testInt256, testUnsafeMathI256 } = await loadFixture(fixtures);

      [safeGas, safeBoolResult] = await testInt256.gt(0x0f, 0x0f);
      [unsafeGas, unsafeBoolResult] = await testUnsafeMathI256.gt(0x0f, 0x0f);

      expect(safeBoolResult).to.equal(unsafeBoolResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Gte', async () => {
      const { testInt256, testUnsafeMathI256 } = await loadFixture(fixtures);

      [safeGas, safeBoolResult] = await testInt256.gte(0x0f, 0x0f);
      [unsafeGas, unsafeBoolResult] = await testUnsafeMathI256.gte(0x0f, 0x0f);

      expect(safeBoolResult).to.equal(unsafeBoolResult);
      // assertSavesGas(safeGas, unsafeGas);
    });
  });

  describe('Conversion', () => {
    it('asUints', async () => {
      const { testInt256, testUnsafeMathI256 } = await loadFixture(fixtures);

      const safeTypes = await testInt256.asUints(0x0f);
      const unsafeTypes = await testUnsafeMathI256.asUints(0x0f);

      expect(safeTypes).to.deep.equal(unsafeTypes);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('asInts', async () => {
      const { testInt256, testUnsafeMathI256 } = await loadFixture(fixtures);

      const safeTypes = await testInt256.asInts(0x0f);
      const unsafeTypes = await testUnsafeMathI256.asInts(0x0f);

      expect(safeTypes).to.deep.equal(unsafeTypes);
      // assertSavesGas(safeGas, unsafeGas);
    });
  });
});
