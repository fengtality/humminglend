# HummingLend
A lending bot that maximizes the interest you earn from decentralized lending protocols like Compound Finance

## Install
1. Install geth
See https://github.com/ethereum/go-ethereum/wiki/Installing-Geth

2. Install yarn
See https://yarnpkg.com/lang/en/docs/install/

3. Install JS dependencies
```
yarn install
```

4. Create an Ethereum wallet on the Rinkeby testnet

5. Import the Ethereum wallet into Metamask using the wallet keystore file

6. Follow https://faucet.rinkeby.io/ to get some test ETH

7. Go to app.compound.finance and wrap your test ETH into WETH. Make sure that you are on the Rinkeby testnet!

## Run
1. In a separate Terminal window, run an unlocked geth node in light sync mode on Rinkeby
```
geth --rinkeby --sync=light
```

2. Start the app
```
yarn run start-dev
```
