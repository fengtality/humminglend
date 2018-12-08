const express = require('express')

const {
    moneyMarketAddress,
    tokenAddresses,
    moneyMarketInterface,
    tokenInterface,
} = require('./config')

const app = express()
// app.use(express.static('public'));
const PORT = 3000

app.get('/', (req, res) => { 
    res.send("hello world") 
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
})