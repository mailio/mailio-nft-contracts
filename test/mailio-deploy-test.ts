import { Contract } from "ethers";
import { ethers, getNamedAccounts } from "hardhat";
import hre from "hardhat";
import { DeployProxyOptions } from "@openzeppelin/hardhat-upgrades/dist/utils";

let MailioNFT: Contract;

beforeEach(async () => {

    const { admin } = await getNamedAccounts();
    const nft = await ethers.getContractFactory("MailioNFT");

    const opts: DeployProxyOptions = {
        initializer: "initialize",
        kind: "uups",
    }
    const mailioNft: Contract = await hre.upgrades.deployProxy(nft, [admin], opts);
    await mailioNft.deployed();
    MailioNFT = mailioNft;
});

it('check if contract deployed', async () => {
    console.log(MailioNFT.address);
}); 