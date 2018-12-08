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
        else resolve({ balance: web3.utils.fromWei(bal, 'ether'), timestamp: new Date() })
    })
})

const getTokenBalancePromise = (symbol) => new Promise((resolve, reject) => {
    const tokenAddress = tokenAddresses[symbol]
    const tokenContract = new web3.eth.Contract(tokenInterface, tokenAddress)

    tokenContract.methods.balanceOf(walletAddress).call((err, bal) => {
        if (err) reject({ error: 'Token balance not available', timestamp: new Date() })
        // else resolve({ balance: web3.fromWei(bal, 'ether').toNumber(), timestamp: new Date() })

        else {
            tokenContract.methods.allowance(walletAddress, moneyMarketAddress).call((err, allow) => {
                if (err) reject({ error: 'Allowance not available', timestamp: new Date() })
                resolve({
                    balance: web3.utils.fromWei(bal, 'ether'), 
                    allowance: web3.utils.fromWei(allow, 'ether'), 
                    timestamp: new Date() 
                })
            })
        }
    })
})

const approveToken = (symbol) => {
    console.log(symbol)
    const tokenAddress = tokenAddresses[symbol]
    const tokenContract = new web3.eth.Contract(tokenInterface, tokenAddress)

    tokenContract.methods.approve(moneyMarketAddress, '10000000000000000000000000000000000000000').send({
        from: walletAddress
    }).then(console.log)
}

module.exports = {
    getWalletBalancePromise,
    getTokenBalancePromise,
    approveToken,
}
