require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const LOW_OPTIMIZER_COMPILER_SETTINGS = {
    version: "0.7.6",
    settings: {
        evmVersion: "istanbul",
        optimizer: {
            enabled: true,
            runs: 2_000,
        },
        metadata: {
            bytecodeHash: "none",
        },
    },
}

const LOWEST_OPTIMIZER_COMPILER_SETTINGS = {
    version: "0.7.6",
    settings: {
        evmVersion: "istanbul",
        optimizer: {
            enabled: true,
            runs: 1_000,
        },
        metadata: {
            bytecodeHash: "none",
        },
    },
}
const DEFAULT_COMPILER_SETTINGS = {
    version: "0.7.6",
    settings: {
        evmVersion: "istanbul",
        optimizer: {
            enabled: true,
            runs: 1_000_000,
        },
        metadata: {
            bytecodeHash: "none",
        },
    },
}

module.exports = {
    defaultNetwork: "hardhat",
    etherscan: {
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
    networks: {
        hardhat: {
            // // If you want to do some forking, uncomment this
            // forking: {
            //   url: MAINNET_RPC_URL
            // }
            chainId: 31337,
            allowUnlimitedContractSize: true,
        },
        localhost: {
            chainId: 31337,
            allowUnlimitedContractSize: true,
        },
    },
    gasReporter: {
        enabled: true,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    },
    contractSizer: {
        runOnCompile: false,
        only: [],
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
        },
        player: {
            default: 1,
        },
    },
    solidity: {
        settings: {
            optimizer: {
                enabled: true,
                runs: 800,
            },
            metadata: {
                // do not include the metadata hash, since this is machine dependent
                // and we want all generated code to be deterministic
                // https://docs.soliditylang.org/en/v0.7.6/metadata.html
                bytecodeHash: "none",
            },
        },
        compilers: [DEFAULT_COMPILER_SETTINGS],
        overrides: {
            "contracts/v3-periphery/NonfungiblePositionManager.sol":
                LOW_OPTIMIZER_COMPILER_SETTINGS,
            "contracts/v3-periphery/test/MockTimeNonfungiblePositionManager.sol":
                LOW_OPTIMIZER_COMPILER_SETTINGS,
            "contracts/v3-periphery/test/NFTDescriptorTest.sol": LOWEST_OPTIMIZER_COMPILER_SETTINGS,
            "contracts/v3-periphery/NonfungibleTokenPositionDescriptor.sol":
                LOWEST_OPTIMIZER_COMPILER_SETTINGS,
            "contracts/v3-periphery/libraries/NFTDescriptor.sol":
                LOWEST_OPTIMIZER_COMPILER_SETTINGS,
        },
    },
    mocha: {
        timeout: 500000, // 500 seconds max for running tests
    },
}
// module.exports = {
//     defaultNetwork: "hardhat",
//     networks: {
//         hardhat: {
//             allowUnlimitedContractSize: true,
//         },
//         localhost: {
//             allowUnlimitedContractSize: true,
//         },
//     },
//     etherscan: {
//         // Your API key for Etherscan
//         // Obtain one at https://etherscan.io/
//         apiKey: process.env.ETHERSCAN_API_KEY,
//     },
//     solidity: {
//         version: "0.7.6",
//         settings: {
//             optimizer: {
//                 enabled: true,
//                 runs: 800,
//             },
//             metadata: {
//                 // do not include the metadata hash, since this is machine dependent
//                 // and we want all generated code to be deterministic
//                 // https://docs.soliditylang.org/en/v0.7.6/metadata.html
//                 bytecodeHash: "none",
//             },
//         },
//     },
// }
