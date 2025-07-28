import contractABI from "../contracts/WalletFactory.json"

const contractAddress = "0x01a54146A6fC9A324A368CC900c56599C00275D7"

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