// add global task
import '@nomiclabs/hardhat-ethers';

import 'dotenv/config';

import '@typechain/hardhat';

import '@nomicfoundation/hardhat-chai-matchers';

import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-solhint';

import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import 'hardhat-spdx-license-identifier';
import 'hardhat-contract-sizer';
import 'hardhat-abi-exporter';
import 'hardhat-gas-reporter';
import 'hardhat-watcher';
import 'hardhat-tracer';
import 'hardhat-storage-layout';

import 'solidity-coverage';

import type { HardhatUserConfig } from 'hardhat/config';

const { PRIVATE_KEY, REPORT_GAS, GAS_TOKEN, GAS_CURRENCY } = process.env;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export = {
  solidity: {
    version: '0.8.19',
    settings: {
      optimizer: {
        enabled: false,
        runs: 0,
      },
    },
  },
  networks: {
    hardhat: {
      gas: 'auto',
      chainId: 1337,
    },
  },
  gasReporter: {
    enabled: REPORT_GAS !== undefined,
    currency: GAS_CURRENCY || 'USD',
    token: GAS_TOKEN || 'ETH',
    maxMethodDiff: 1,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  abiExporter: {
    path: './sdk/abi',
    runOnCompile: true,
    clear: true,
    flat: false,
    // only: [':ERC20$'],
    spacing: 2,
  },
  typechain: {
    outDir: './sdk/types',
    target: 'ethers-v5',
  },
} as HardhatUserConfig;
