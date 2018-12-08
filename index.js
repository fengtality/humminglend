const express = require('express')
const { getWalletBalancePromise, 
        getTokenBalancePromise,
        approveToken,
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
    res.send("hello world") 
})

app.get('/approve/:symbol', (req, res) => { 
    const symbol = req.params.symbol
    approveToken(symbol)
})


const PORT = 3000
app.listen(PORT, () => {
    console.log(`HummingLend listening on port ${PORT}!`)


    // const symbol = "zrx"
    // console.log(tokenInterface)
})

// Resolve promises
let promises = [getWalletBalancePromise()];
promises = promises.concat(getTokenBalancePromise("bat"));
promises = promises.concat(getTokenBalancePromise("dai"));
promises = promises.concat(getTokenBalancePromise("rep"));
promises = promises.concat(getTokenBalancePromise("weth"));
promises = promises.concat(getTokenBalancePromise("zrx"));

return Promise.all(promises).then((values) => {
    console.log('ETH | balance: ',  values[0].balance)
    console.log('BAT | balance: ',  values[1].balance, `| allowance: `, values[1].allowance)
    console.log('DAI | balance: ',  values[2].balance, `| allowance: `, values[2].allowance)
    console.log('REP | balance: ',  values[3].balance, `| allowance: `, values[3].allowance)
    console.log('WETH | balance: ', values[4].balance, `| allowance: `, values[4].allowance)
    console.log('ZRX | balance: ',  values[5].balance, `| allowance: `, values[5].allowance)
})
