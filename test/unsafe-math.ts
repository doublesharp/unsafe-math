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
    expect(safeGas).to.equal(21793);

    const unsafeGas = await testUnsafeMath.estimateGas.unsafeAdd(1, 2);
    expect(unsafeGas).to.equal(21663);

    expect(safeGas).to.be.greaterThan(unsafeGas);
  });

  it('Sub', async () => {
    const { testUnsafeMath } = await loadFixture(fixtures);

    const safeGas = await testUnsafeMath.estimateGas.safeSub(2, 1);
    expect(safeGas).to.equal(21794);

    const unsafeGas = await testUnsafeMath.estimateGas.unsafeSub(2, 1);
    expect(unsafeGas).to.equal(21718);

    expect(safeGas).to.be.greaterThan(unsafeGas);
  });

  it('Mul', async () => {
    const { testUnsafeMath } = await loadFixture(fixtures);

    const safeGas = await testUnsafeMath.estimateGas.safeMul(2, 2);
    expect(safeGas).to.equal(21787);

    const unsafeGas = await testUnsafeMath.estimateGas.unsafeMul(2, 2);
    expect(unsafeGas).to.equal(21698);

    expect(safeGas).to.be.greaterThan(unsafeGas);
  });

  it('Div', async () => {
    const { testUnsafeMath } = await loadFixture(fixtures);

    const safeGas = await testUnsafeMath.estimateGas.safeDiv(2, 2);
    expect(safeGas).to.equal(21734);

    const unsafeGas = await testUnsafeMath.estimateGas.unsafeDiv(2, 2);
    expect(unsafeGas).to.equal(21675);

    expect(safeGas).to.be.greaterThan(unsafeGas);
  });
});
