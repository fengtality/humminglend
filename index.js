const express = require('express')
const Web3 = require('web3')
// web3 = new Web3(new Web3.providers.HttpProvider(


// Address and ABIs for the Compound MoneyMarket Contract and supported tokens
const {
    moneyMarketAddress,
    tokenAddresses,
    moneyMarketInterface,
    tokenInterface,
} = require('./config')

// User-specific port and wallet address info
// TO-DO: Move to an env file
const PORT = 3000
const walletAddress = "0xfb4338272d74373da20b55e6f7351bcbba1edd43"

// Express
const app = express()
// app.use(express.static('public'));

app.get('/', (req, res) => { 
    res.send("hello world") 
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
})