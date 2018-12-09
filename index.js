const express = require('express')
const axios = require('axios');
const path = require('path')

const { walletAddress,
        getWalletBalancePromise, 
        getTokenBalancePromise,
        getMoneyMarketPromise,
        approveToken,
        supplyToken,
} = require('./balances')

const {
    moneyMarketAddress,
    tokenAddresses,
    moneyMarketInterface,
    tokenInterface,
} = require('./config')

// Express
const app = express()
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname + "/index.html"))
})

app.get('/approve/:symbol', (req, res) => { 
    const symbol = req.params.symbol
    approveToken(symbol)
})

app.get('/supply/:symbol', (req, res) => { 
    const symbol = req.params.symbol
    supplyToken(symbol)
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`HummingLend listening on port ${PORT}!`)


    // const symbol = "zrx"
    // console.log(tokenInterface)
})

// Resolve promises
let promises = [getWalletBalancePromise()];

// Token balances
promises = promises.concat(getTokenBalancePromise("bat"));
promises = promises.concat(getTokenBalancePromise("dai"));
promises = promises.concat(getTokenBalancePromise("rep"));
promises = promises.concat(getTokenBalancePromise("weth"));
promises = promises.concat(getTokenBalancePromise("zrx"));

// Lending rates
promises = promises.concat(getMoneyMarketPromise("bat"));
promises = promises.concat(getMoneyMarketPromise("dai"));
promises = promises.concat(getMoneyMarketPromise("rep"));
promises = promises.concat(getMoneyMarketPromise("weth"));
promises = promises.concat(getMoneyMarketPromise("zrx"));

return Promise.all(promises).then((values) => {
    console.log('Wallet address:', walletAddress)
    console.log('Wallet ETH balance:', values[0].balance)
    console.log('')
    console.log('Token balances:')
    console.log('Token | Balance |  Allowance')
    console.log('------------------------------')
    console.log('BAT   | ', values[1].balance, `   | `, values[1].allowance)
    console.log('DAI   | ', values[2].balance, `   | `, values[2].allowance)
    console.log('REP   | ', values[3].balance, `   | `, values[3].allowance)
    console.log('WETH  | ', values[4].balance, `    | `, values[4].allowance)
    console.log('ZRX   | ', values[5].balance, `   | `, values[5].allowance)
    console.log('')
    console.log('Lending rates:')
    console.log('Token |  Rate   |  Supplied')
    console.log('------------------------------')
    console.log('BAT   | ', values[6].supplyRate, `  | `, values[6].supplyBalance)
    console.log('DAI   | ', values[7].supplyRate, `  | `, values[7].supplyBalance)
    console.log('REP   | ', values[8].supplyRate, `  | `, values[8].supplyBalance)
    console.log('WETH  | ', values[9].supplyRate, `  | `, values[9].supplyBalance)
    console.log('ZRX   | ', values[10].supplyRate, `  | `, values[10].supplyBalance)
})