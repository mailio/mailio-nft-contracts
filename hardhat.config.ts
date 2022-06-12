import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-waffle";
import { HardhatUserConfig } from "hardhat/config";
import '@openzeppelin/hardhat-upgrades';
import dotenv from "dotenv";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-gas-reporter";

dotenv.config();

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        localhost: {
            chainId: 31337,
        },
        mumbai: {
            url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.MUMBAI_ALCHEMY_API_KEY}`,
            accounts: [`${process.env.PRIVATE_KEY}`],
        },
        matic: {
            url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.MATIC_ALCHEMY_API_KEY}`,
            accounts: [`${process.env.PRIVATE_KEY}`],
        }
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        currency: 'MATIC',
        gasPriceApi: 'https://api.polygonscan.com/api?module=proxy&action=eth_gasPrice',
    },
    solidity: {
        compilers: [{
            version: "0.8.9", settings: {
                optimizer: {
                    enabled: true,
                    runs: 200,
                },
            }
        }],
    },
    namedAccounts: {
        deployer: {
            default: 0,
            "mumbai": "0x5D823205413eA17816bdd25d75A535E5B5E5BC13",
            "matic": "0x5D823205413eA17816bdd25d75A535E5B5E5BC13"
        },
        admin: {
            default: 1,
            "mumbai": "0x793D75a76939c1dFF6c517B3f9338c4db557948B",
            "matic": "0x793D75a76939c1dFF6c517B3f9338c4db557948B"
        },
        outsideUser: {
            default: 2
        }
    }
};

export default config;