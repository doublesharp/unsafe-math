import { expect } from 'chai';

import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';

import { BigNumber } from 'ethers';

import { fixtures, assertSavesGas, printGasReport } from './lib/utils';

describe('UnsafeU256', () => {
  let safeGas: BigNumber, unsafeGas: BigNumber;
  let safeResult: BigNumber, unsafeResult: BigNumber;
  let safeBoolResult: boolean, unsafeBoolResult: boolean;

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
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.add(1, 2);
      [unsafeGas, unsafeResult] = await testUnsafeU256.add(1, 2);

      expect(safeResult).to.equal(unsafeResult);
    });

    it('Sub', async () => {
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.sub(2, 1);
      [unsafeGas, unsafeResult] = await testUnsafeU256.sub(2, 1);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Mul', async () => {
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.mul(2, 2);
      [unsafeGas, unsafeResult] = await testUnsafeU256.mul(2, 2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Div', async () => {
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.div(4, 2);
      [unsafeGas, unsafeResult] = await testUnsafeU256.div(4, 2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Mod', async () => {
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.mod(333, 2);
      [unsafeGas, unsafeResult] = await testUnsafeU256.mod(333, 2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Inc', async () => {
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.inc(2);
      [unsafeGas, unsafeResult] = await testUnsafeU256.inc(2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Dec', async () => {
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.dec(2);
      [unsafeGas, unsafeResult] = await testUnsafeU256.dec(2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Exp', async () => {
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.exp(2, 3);
      [unsafeGas, unsafeResult] = await testUnsafeU256.exp(2, 3);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });
  });

  describe('Bitwise', () => {
    it('And', async () => {
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.and(2, 2);
      [unsafeGas, unsafeResult] = await testUnsafeU256.and(2, 2);

      expect(safeResult).to.equal(unsafeResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Or', async () => {
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.or(2, 2);
      [unsafeGas, unsafeResult] = await testUnsafeU256.or(2, 2);

      expect(safeResult).to.equal(unsafeResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Xor', async () => {
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.xor(2, 2);
      [unsafeGas, unsafeResult] = await testUnsafeU256.xor(2, 2);

      expect(safeResult).to.equal(unsafeResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Not', async () => {
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.not(2);
      [unsafeGas, unsafeResult] = await testUnsafeU256.not(2);

      expect(safeResult).to.equal(unsafeResult);
      // assertSavesGas(safeGas, unsafeGas);
    });
  });

  describe('Comparison', () => {
    it('Eq', async () => {
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      [safeGas, safeBoolResult] = await testUint256.eq(2, 2);
      [unsafeGas, unsafeBoolResult] = await testUnsafeU256.eq(2, 2);

      expect(safeBoolResult).to.equal(unsafeBoolResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Neq', async () => {
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      [safeGas, safeBoolResult] = await testUint256.neq(2, 2);
      [unsafeGas, unsafeBoolResult] = await testUnsafeU256.neq(2, 2);

      expect(safeBoolResult).to.equal(unsafeBoolResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Gt', async () => {
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      [safeGas, safeBoolResult] = await testUint256.gt(2, 2);
      [unsafeGas, unsafeBoolResult] = await testUnsafeU256.gt(2, 2);

      expect(safeBoolResult).to.equal(unsafeBoolResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Gte', async () => {
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      [safeGas, safeBoolResult] = await testUint256.gte(2, 2);
      [unsafeGas, unsafeBoolResult] = await testUnsafeU256.gte(2, 2);

      expect(safeBoolResult).to.equal(unsafeBoolResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Lt', async () => {
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      [safeGas, safeBoolResult] = await testUint256.lt(2, 2);
      [unsafeGas, unsafeBoolResult] = await testUnsafeU256.lt(2, 2);

      expect(safeBoolResult).to.equal(unsafeBoolResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Lte', async () => {
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      [safeGas, safeBoolResult] = await testUint256.lte(2, 2);
      [unsafeGas, unsafeBoolResult] = await testUnsafeU256.lte(2, 2);

      expect(safeBoolResult).to.equal(unsafeBoolResult);
      // assertSavesGas(safeGas, unsafeGas);
    });
  });


  describe('Conversion', () => {
    it('asUints', async () => {
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      const safeTypes = await testUint256.asUints(20);
      const unsafeTypes = await testUnsafeU256.asUints(20);

      expect(safeTypes).to.deep.equal(unsafeTypes);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('asInts', async () => {
      const { testUint256, testUnsafeU256 } = await loadFixture(fixtures);

      const safeTypes = await testUint256.asInts(20);
      const unsafeTypes = await testUnsafeU256.asInts(20);

      expect(safeTypes).to.deep.equal(unsafeTypes);
      // assertSavesGas(safeGas, unsafeGas);
    });
  });
});
