import contractABI from "../contracts/WalletFactory.json"

const contractAddress = "0xB18cB5e47a3bA39058Fe901b16197f6D3b9148D4"

export const createWallet = async (web3,account) => {

    if(!web3 || !account) throw new Error("Error connecting")

    try{
        console.log(account)
        const WalletFactory=new web3.eth.Contract(contractABI.abi,contractAddress)
        const address=await WalletFactory.methods.walletOwnership(account).call()
        if(address=="0x0000000000000000000000000000000000000000"){
            const receipt = await WalletFactory.methods.createWallet().send({from:account})
            return receipt
        }
    }
    catch(err){
        throw new Error("Some error occurred:\n"+err)
    }
}

export const walletOwnership = async (web3,account) => {
    if(!web3 || !account) throw new Error("Error connecting")

    try{
        const WalletFactory=new web3.eth.Contract(contractABI.abi,contractAddress)
        const walletAddress = await WalletFactory.methods.walletOwnership(account).call()
        return walletAddress
    }
    catch(err){
        throw new Error("Some error occurred:\n"+err)
    }
}