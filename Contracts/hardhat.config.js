require("dotenv/config");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan"); // To learn how to set multiple arguments: https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html
require("hardhat-deploy");
require("hardhat-deploy-ethers");
require("./tasks");

let accounts;

if (process.env.PRIVATE_KEY) {
    accounts = [process.env.PRIVATE_KEY];
} else {
    accounts = {
        mnemonic: process.env.MNEMONIC || "test test test test test test test test test test test junk",
    };
}

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    defaultNetwork: "MATIC_TESTNET", // Change this back later to "moonriver"
    namedAccounts: {
        deployer: {
            default: 0,
        },
        dev: {
            default: 1,
        },
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
    networks: {
        moonriver: {
            url: `https://rpc.moonriver.moonbeam.network`,
            chainId: 1285,
            accounts,
            live: true,
            saveDeployments: true,
            tags: ["moonriver"],
            gasPrice: 1000000000,
            gas: 8000000,
        },
        moonbase_alpha: {
            url: `https://rpc.testnet.moonbeam.network`,
            chainId: 1287,
            accounts,
            live: true,
            saveDeployments: true,
            tags: ["moonbase_alpha"],
            gasPrice: 1000000000,
            gas: 8000000,
        },
        MATIC_TESTNET: {
            url: `https://rpc-mumbai.maticvigil.com/`,
            chainId: 80001,
            accounts,
            live: true,
            saveDeployments: true,
            tags: ["MATIC_TESTNET"],
            gasPrice: 1000000000,
            gas: 8000000,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.6.12",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.8.2",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
};
