import { DeployProxyOptions } from "@openzeppelin/hardhat-upgrades/dist/utils";
import { expect } from "chai";
import { Contract, ContractReceipt, ContractTransaction } from "ethers";
import { ethers, getNamedAccounts } from "hardhat";
import hre from "hardhat";

let MailioNFT: Contract;

const categoryId = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
const tokenURI = "/test/test.png";

beforeEach(async () => {
    // await deployments.fixture(["MailioNFT"]);
    // MailioNFT = await ethers.getContractFactory("MailioNFT");
    // console.log('afeter fixture');
    // MailioNFT = await ethers.getContract("MailioNFT");
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

it("should deploy", async () => {
    expect(await MailioNFT.symbol()).to.equal("MFT");
});

it('mint new token', async () => {
    const { deployer } = await getNamedAccounts();

    const safeMintTx: ContractTransaction = await MailioNFT.safeMint(
        deployer,
        tokenURI,
        categoryId
    )
    const rc = await safeMintTx.wait(1);
    const transferEvent = rc.events?.find(e => e.event === 'Transfer');

    if (!transferEvent) {
        throw Error("transfer event not found");
    }
    const tokenId = transferEvent!.args ? transferEvent!.args!.tokenId : null;
    if (tokenId == null) {
        throw Error("tokenId not found");
    }

    // check the balance and the newly minted tokenId
    const balanceOfTx = await MailioNFT.balanceOf(deployer);
    const balanceNumber = balanceOfTx.toNumber();
    console.log("balanceOfTx: ", balanceNumber);
    const ownerOf = await MailioNFT.ownerOf(tokenId);
    console.log("Owner of: ", ownerOf);
    expect(ownerOf).to.equal(deployer);

    // check the tokenURI
    const uri = await MailioNFT.tokenURI(tokenId);
    console.log("tokenURI: ", uri);
});

it('Check if only owner can mint', async () => {
    const { outsideUser } = await getNamedAccounts();
    console.log("outsideUSer: ", outsideUser);
    const outsideSigner = await ethers.getSigner(outsideUser);
    await expect(MailioNFT.connect(outsideSigner).safeMint(
        outsideUser,
        tokenURI,
        categoryId
    )).to.be.reverted;
});

it('Check if admin can mint new tokens', async () => {
    const { outsideUser, admin } = await getNamedAccounts();
    console.log("admin: ", admin);
    const adminSigner = await ethers.getSigner(admin);

    const safeMintTx: ContractTransaction = await MailioNFT.connect(adminSigner).safeMint(
        outsideUser,
        tokenURI,
        categoryId
    );
    let tokenId = null;
    const rc = await safeMintTx.wait(1);
    if (rc.events) {
        if (rc.events[0].args) {
            tokenId = rc.events[0].args.tokenId.toNumber();
        }
    }
    if (tokenId == null) {
        throw Error("tokenId not found");
    }
    // check the balance and the newly minted tokenId
    const balanceOfTx = await MailioNFT.balanceOf(outsideUser);
    expect(balanceOfTx.toNumber()).to.equal(1);
});

it('Check number of minted tokens per cateogry increments', async () => {
    const { deployer } = await getNamedAccounts();
    const safeMintTx: ContractTransaction = await MailioNFT.safeMint(
        deployer,
        tokenURI,
        categoryId
    )
    const rc = await safeMintTx.wait(1);
    const numTokensTx = await MailioNFT.categoryTokenCount(categoryId);
    expect(numTokensTx.toNumber()).equal(1);
});

it('Check maximum tokens minted per category', async () => {
    const { admin } = await getNamedAccounts();
    const adminSigner = await ethers.getSigner(admin);

    for (let i = 1; i <= 100; i++) {
        const safeMintTx: ContractTransaction = await MailioNFT.connect(adminSigner).safeMint(
            admin,
            tokenURI,
            categoryId
        );
        const receipt: ContractReceipt = await safeMintTx.wait(1); // wait 1 block
    }
    const safeMintTx: ContractTransaction = await MailioNFT.connect(adminSigner).safeMint(
        admin,
        tokenURI,
        categoryId
    );
    const receipt: ContractReceipt = await safeMintTx.wait(1);
    expect(safeMintTx.wait(1)).to.revertedWith("Maximum claims in this category reached"); // wait 1 block
});

it('Check if 2 categories filled up to the rim work', async () => {
    const { admin } = await getNamedAccounts();
    const adminSigner = await ethers.getSigner(admin);

    const categoryId1 = new Uint8Array([1, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    for (let i = 1; i <= 100; i++) {
        const safeMintTx: ContractTransaction = await MailioNFT.connect(adminSigner).safeMint(
            admin,
            tokenURI,
            categoryId
        );
        await safeMintTx.wait(1); // wait 1 block
    }
    for (let i = 1; i <= 100; i++) {
        const safeMintTx: ContractTransaction = await MailioNFT.connect(adminSigner).safeMint(
            admin,
            tokenURI,
            categoryId1
        );
        await safeMintTx.wait(1); // wait 1 block
    }
});

it('Number of tokens in category', async () => {
    const { admin } = await getNamedAccounts();
    const adminSigner = await ethers.getSigner(admin);

    const mint_tokens = 3;
    for (let i = 1; i <= mint_tokens; i++) {
        const safeMintTx: ContractTransaction = await MailioNFT.connect(adminSigner).safeMint(
            admin,
            tokenURI,
            categoryId
        );
        await safeMintTx.wait(1); // wait 1 block
    }
    const numTokensTx = await MailioNFT.categoryTokenCount(categoryId);
    expect(numTokensTx.toNumber()).equal(mint_tokens);
});

it('Validate token in Category', async () => {
    const { admin } = await getNamedAccounts();
    const adminSigner = await ethers.getSigner(admin);
    const safeMintTx: ContractTransaction = await MailioNFT.connect(adminSigner).safeMint(
        admin,
        tokenURI,
        categoryId
    );
    let tokenId = null;
    const rc = await safeMintTx.wait(1);
    if (rc.events) {
        if (rc.events[0].args) {
            tokenId = rc.events[0].args.tokenId.toNumber();
        }
    }
    const foundCategoryId = await MailioNFT.tokenIdToCategoryId(tokenId);
    const fcId: Uint8Array = ethers.utils.arrayify(foundCategoryId);
    expect(fcId).to.deep.equal(categoryId);
});