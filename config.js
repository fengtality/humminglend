const fs = require("fs")

const moneyMarketAddress = "0x61bbd7bd5ee2a202d7e62519750170a52a8dfd45"

const tokenAddresses = {
    zrx: "0x8de2f821bc97979b7171e7a6fe065b9e17f73b87",
    rep: "0x930b647320f738d92f5647b2e5c4458497ce3c95",
    bat: "0xbf7bbeef6c56e53f79de37ee9ef5b111335bd2ab",
    dai: "0x4e17c87c52d0e9a0cad3fbc53b77d9514f003807",
    weth: "0xc778417e063141139fce010982780140aa0cd5ab",
}

const moneyMarketInterface = JSON.parse(fs.readFileSync('./compound/MoneyMarket.json', 'utf8'))
const tokenInterface = JSON.parse(fs.readFileSync('./compound/erc20.json', 'utf8'))

module.exports = {
    moneyMarketAddress,
    tokenAddresses,
    moneyMarketInterface,
    tokenInterface,
}