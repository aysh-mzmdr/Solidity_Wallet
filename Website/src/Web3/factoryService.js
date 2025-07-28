import contractABI from "../contracts/WalletFactory.json"

const contractAddress = "0xbfC0548AA52fD58bE94893d3E5FE8fc2FA46826e"

export const createWallet = async (web3,account) => {

    if(!web3 || !account) throw new Error("Error connecting")

    const WalletFactory=new web3.eth.Contract(contractABI.abi,contractAddress)
    const address=await WalletFactory.methods.walletOwnership(account).call()
    if(!address){
        const receipt = await WalletFactory.methods.createWallet().send({from:account})
        return receipt
    }
}

export const walletOwnership = async (web3,account) => {
    if(!web3 || !account) throw new Error("Error connecting")

    const WalletFactory=new web3.eth.Contract(contractABI.abi,contractAddress)
    const walletAddress = await WalletFactory.methods.walletOwnership(account).call()
    return walletAddress
}