const Web3 = require('web3')

// Address and ABIs for the Compound MoneyMarket Contract and supported tokens
const {
    moneyMarketAddress,
    tokenAddresses,
    moneyMarketInterface,
    tokenInterface,
} = require('./config')

// User-specific port and wallet global constants
// TO-DO: Move to an env file
const RPC_PORT = 8546
const walletAddress = "0xfb4338272d74373da20b55e6f7351bcbba1edd43"

// Initialize web3
web3 = new Web3(new Web3.providers.HttpProvider(`http://localhost:${RPC_PORT}`))

// Define promises
const getWalletBalancePromise = () => new Promise((resolve, reject) => {
    web3.eth.getBalance(walletAddress, (err, bal) => {
        if (err) reject({ error: 'Ether wallet balance not available', timestamp: new Date() })
        else resolve({ balance: web3.fromWei(bal, 'ether').toNumber(), timestamp: new Date() })
    })
})

const getTokenBalancePromise = (symbol) => new Promise((resolve, reject) => {
    const tokenAddress = tokenAddresses[symbol]
    const tokenContract = web3.eth.contract(tokenInterface).at(tokenAddress)

    tokenContract.balanceOf(walletAddress, (err, bal) => {
        if (err) reject({ error: 'Token balance not available', timestamp: new Date() })
        // else resolve({ balance: web3.fromWei(bal, 'ether').toNumber(), timestamp: new Date() })

        else {
            tokenContract.allowance(walletAddress, moneyMarketAddress, (err, allow) => {
                if (err) reject({ error: 'Allowance not available', timestamp: new Date() })
                resolve({
                    balance: web3.fromWei(bal, 'ether').toNumber(), 
                    allowance: web3.fromWei(allow, 'ether').toNumber(), 
                    timestamp: new Date() 
                })
            })
        }
    })
})

// const approveToken = (symbol) => {
//     const tokenAddress = tokenAddresses[symbol]
//     const tokenContract = web3.eth.contract(tokenInterface).at(tokenAddress)

//     tokenContract.approve(moneyMarketAddress, )
// }


module.exports = {
    getWalletBalancePromise,
    getTokenBalancePromise,
    // approveToken,
}