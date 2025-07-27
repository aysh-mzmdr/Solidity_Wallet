import contractABI from "../contracts/WalletFactory.json"

const contractAddress = "0xe251C6f1D7041664d9b3A1b94b9D3a78C5d84572"

export const createWallet = async (web3,account) => {

    console.log(web3)
    console.log(account)

    if(!web3 || !account) throw new Error("Error connecting")

    const WalletFactory=new web3.eth.Contract(contractABI.abi,contractAddress)
    const receipt = await WalletFactory.methods.createWallet().send({from:account})
    return receipt
}

export const walletOwnership = async (web3,account) => {
    if(!web3 || !account) throw new Error("Error connecting")

    const WalletFactory=new web3.eth.Contract(contractABI,contractAddress)
    const walletAddress = await WalletFactory.methods.walletOwnership(account).call()
    return walletAddress
}