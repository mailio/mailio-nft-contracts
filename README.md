# Mailio NFT (ERC 721) Contract

![https://discord.gg/hXjFS2zWra](https://img.shields.io/static/v1?label=discord&message=developers&color=green)
![GitHub issues](https://img.shields.io/github/issues/mailio/mailio-nft-bridge)

This is blockchain (Polygon) ERC-721 upgreadable contract for `Attestation of Consuming Mailio Content`.

## Setup

```javascript
npm install
```

## Contract

Compiling contracts:

```
npx hardhat compile
```

Run test:

```
npx hardhat test
```

Deploy:

```
npx hardhat deploy --network localhost
```

Deploy to Polygon testchain (Mumbai):

```
npx hardhat deploy --network mumbai
```

Deploy to Polygon mainnet (MATIC)

```
npx hardhat deploy --network matic
```

## Verify contract

```
npx hardhat verify ADDRESS --network matic
```

## Polygon testnet (Mumbai) Contract Address

`0xC6612B54A7E97A8afa2151c45BA3fc8b037e1Efd`

## Polygoin mainnet Contract Address

Proxy:
`0x4f4e788e31889649E9524C603D4DF85aBC56B8D9`

[PolygonScan Proxy Contract](https://polygonscan.com/address/0x4f4e788e31889649e9524c603d4df85abc56b8d9#readProxyContract)

Contract:
`0xff9d91b8174247f83e17db430bc9b54ba1b8b937`

[PolygonScan Contract](https://polygonscan.com/address/0xff9d91b8174247f83e17db430bc9b54ba1b8b937#readContract)
