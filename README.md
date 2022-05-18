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
npx hardhat run deploy/01-deploy-nft.ts
```

Deploy to Polygoin testchain (Mumbai):
```
npx hardhat run deploy/01-deploy-nft.ts --network mumbai
```


## Polygon testnet (Mumbai) Contract Address

`0xC6612B54A7E97A8afa2151c45BA3fc8b037e1Efd`

## Polygoin mainnet Contract Address

Not deployed yet