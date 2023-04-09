import { expect } from 'chai';

import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';

import { BigNumber } from 'ethers';

import { fixtures, assertSavesGas, printGasReport } from './lib/utils';

describe('U256', () => {
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
      const { testUint256, testU256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.add(1, 2);
      [unsafeGas, unsafeResult] = await testU256.add(1, 2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Sub', async () => {
      const { testUint256, testU256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.sub(2, 1);
      [unsafeGas, unsafeResult] = await testU256.sub(2, 1);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Mul', async () => {
      const { testUint256, testU256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.mul(2, 2);
      [unsafeGas, unsafeResult] = await testU256.mul(2, 2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Div', async () => {
      const { testUint256, testU256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.div(4, 2);
      [unsafeGas, unsafeResult] = await testU256.div(4, 2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });

    it('Mod', async () => {
      const { testUint256, testU256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.mod(333, 2);
      [unsafeGas, unsafeResult] = await testU256.mod(333, 2);

      expect(safeResult).to.equal(unsafeResult);
      assertSavesGas(safeGas, unsafeGas);
    });
  });

  describe('Bitwise', () => {
    it('And', async () => {
      const { testUint256, testU256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.and(0x0f, 0x0f);
      [unsafeGas, unsafeResult] = await testU256.and(0x0f, 0x0f);

      expect(safeResult).to.equal(unsafeResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Or', async () => {
      const { testUint256, testU256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.or(0x0f, 0x0f);
      [unsafeGas, unsafeResult] = await testU256.or(0x0f, 0x0f);

      expect(safeResult).to.equal(unsafeResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Xor', async () => {
      const { testUint256, testU256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.xor(0x0f, 0x0f);
      [unsafeGas, unsafeResult] = await testU256.xor(0x0f, 0x0f);

      expect(safeResult).to.equal(unsafeResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Not', async () => {
      const { testUint256, testU256 } = await loadFixture(fixtures);

      [safeGas, safeResult] = await testUint256.not(0x0f);
      [unsafeGas, unsafeResult] = await testU256.not(0x0f);

      expect(safeResult).to.equal(unsafeResult);
      // assertSavesGas(safeGas, unsafeGas);
    });
  });

  describe('Comparison', () => {
    it('Eq', async () => {
      const { testUint256, testU256 } = await loadFixture(fixtures);

      [safeGas, safeBoolResult] = await testUint256.eq(0x0f, 0x0f);
      [unsafeGas, unsafeBoolResult] = await testU256.eq(0x0f, 0x0f);

      expect(safeBoolResult).to.equal(unsafeBoolResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Neq', async () => {
      const { testUint256, testU256 } = await loadFixture(fixtures);

      [safeGas, safeBoolResult] = await testUint256.neq(0x0f, 0x0f);
      [unsafeGas, unsafeBoolResult] = await testU256.neq(0x0f, 0x0f);

      expect(safeBoolResult).to.equal(unsafeBoolResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Lt', async () => {
      const { testUint256, testU256 } = await loadFixture(fixtures);

      [safeGas, safeBoolResult] = await testUint256.lt(0x0f, 0x0f);
      [unsafeGas, unsafeBoolResult] = await testU256.lt(0x0f, 0x0f);

      expect(safeBoolResult).to.equal(unsafeBoolResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Lte', async () => {
      const { testUint256, testU256 } = await loadFixture(fixtures);

      [safeGas, safeBoolResult] = await testUint256.lte(0x0f, 0x0f);
      [unsafeGas, unsafeBoolResult] = await testU256.lte(0x0f, 0x0f);

      expect(safeBoolResult).to.equal(unsafeBoolResult);
    });

    it('Gt', async () => {
      const { testUint256, testU256 } = await loadFixture(fixtures);

      [safeGas, safeBoolResult] = await testUint256.gt(0x0f, 0x0f);
      [unsafeGas, unsafeBoolResult] = await testU256.gt(0x0f, 0x0f);

      expect(safeBoolResult).to.equal(unsafeBoolResult);
      // assertSavesGas(safeGas, unsafeGas);
    });

    it('Gte', async () => {
      const { testUint256, testU256 } = await loadFixture(fixtures);

      [safeGas, safeBoolResult] = await testUint256.gte(0x0f, 0x0f);
      [unsafeGas, unsafeBoolResult] = await testU256.gte(0x0f, 0x0f);

      expect(safeBoolResult).to.equal(unsafeBoolResult);
      // assertSavesGas(safeGas, unsafeGas);
    });
  });
});
