import contractABI from "../contracts/WalletFactory.json"

const contractAddress = "0x78450D15425edD64E68B5B081b67e82172B7Ad46"

export const createWallet = async (web3,account) => {

    if(!web3 || !account) throw new Error("Error connecting")

    const WalletFactory=new web3.eth.Contract(contractABI.abi,contractAddress)
    const address=await WalletFactory.methods.walletOwnership(account).call()
    if(address=="0x0000000000000000000000000000000000000000"){
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