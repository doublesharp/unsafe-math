import { ethers, deployments } from 'hardhat';
import { expect } from 'chai';

import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';

import { TestUnsafeMath } from '../sdk/types';

async function fixtures() {
  const [sender] = await ethers.getSigners();

  const TestUnsafeMath = await ethers.getContractFactory('TestUnsafeMath');
  const testUnsafeMath = await TestUnsafeMath.deploy();

  return { sender, testUnsafeMath };
}

describe('UnsafeMath', () => {
  it('Add', async () => {
    const { testUnsafeMath } = await loadFixture(fixtures);

    const safeGas = await testUnsafeMath.estimateGas.safeAdd(1, 2);
    const safeResult = await testUnsafeMath.safeAdd(1, 2);
    // expect(safeGas).to.equal(22439);

    const unsafeGas = await testUnsafeMath.estimateGas.unsafeAdd(1, 2);
    const unsafeResult = await testUnsafeMath.unsafeAdd(1, 2);
    // expect(unsafeGas).to.equal(22166);

    expect(safeGas).to.be.greaterThan(unsafeGas);
    expect(safeResult).to.equal(unsafeResult);
  });

  it('Sub', async () => {
    const { testUnsafeMath } = await loadFixture(fixtures);

    const safeGas = await testUnsafeMath.estimateGas.safeSub(2, 1);
    const safeResult = await testUnsafeMath.safeSub(2, 1);
    // expect(safeGas).to.equal(22351);

    const unsafeGas = await testUnsafeMath.estimateGas.unsafeSub(2, 1);
    const unsafeResult = await testUnsafeMath.unsafeSub(2, 1);
    // expect(unsafeGas).to.equal(22210);

    expect(safeGas).to.be.greaterThan(unsafeGas);
    expect(safeResult).to.equal(1);
    expect(safeResult).to.equal(unsafeResult);
  });

  it('Mul', async () => {
    const { testUnsafeMath } = await loadFixture(fixtures);

    const safeGas = await testUnsafeMath.estimateGas.safeMul(2, 2);
    const safeResult = await testUnsafeMath.safeMul(2, 2);
    // expect(safeGas).to.equal(22481);

    const unsafeGas = await testUnsafeMath.estimateGas.unsafeMul(2, 2);
    const unsafeResult = await testUnsafeMath.unsafeMul(2, 2);
    // expect(unsafeGas).to.equal(22190);

    expect(safeGas).to.be.greaterThan(unsafeGas);
    expect(safeResult).to.equal(4);
    expect(safeResult).to.equal(unsafeResult);
  });

  it('Div', async () => {
    const { testUnsafeMath } = await loadFixture(fixtures);

    const safeGas = await testUnsafeMath.estimateGas.safeDiv(2, 2);
    const safeResult = await testUnsafeMath.safeDiv(2, 2);
    // expect(safeGas).to.equal(22388);

    const unsafeGas = await testUnsafeMath.estimateGas.unsafeDiv(2, 2);
    const unsafeResult = await testUnsafeMath.unsafeDiv(2, 2);
    // expect(unsafeGas).to.equal(22269);

    // expect(safeGas).to.be.greaterThan(unsafeGas);
    expect(safeResult).to.equal(1);
    expect(safeResult).to.equal(unsafeResult);
  });
});
