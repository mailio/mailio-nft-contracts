import { DeployProxyOptions } from "@openzeppelin/hardhat-upgrades/dist/utils";
import { Contract } from "ethers";
import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import "hardhat-deploy";

const deployMailioNFT: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    console.log('Starting deployment ... ');
    const { getNamedAccounts, deployments, upgrades, ethers } = hre;
    const { log } = deployments;
    const { admin } = await getNamedAccounts();
    log("Deploying Mailio NFT...");

    const nft = await ethers.getContractFactory("MailioNFT");

    const opts: DeployProxyOptions = {
        initializer: "initialize",
        kind: "uups",
    }
    const mailioNft: Contract = await upgrades.deployProxy(nft, [admin], opts);
    await mailioNft.deployed();

    log("Mailio NFT deployed at", mailioNft.address);
};

export default deployMailioNFT;
deployMailioNFT.tags = ['MailioNFT'];