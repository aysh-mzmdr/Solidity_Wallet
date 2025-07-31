import contractABI from "../contracts/Wallet.json"

export const balance = async(web3,account,contractAddress)=>{
 
    if(!web3 || !account) throw new Error("Error Connecting")

    try{
        const contractInstance = new web3.eth.Contract(contractABI.abi,contractAddress)
        const balance = await contractInstance.methods.balance().call()
        const balanceSent = web3.utils.fromWei(balance,"ether")

        return balanceSent
    }
    catch(err){
        throw new Error("Some error occurred:\n"+err)
    }

}

export const owner = async(web3,account,contractAddress)=>{
 
    if(!web3 || !account) throw new Error("Error Connecting")

    try{
        const contractInstance = new web3.eth.Contract(contractABI.abi,contractAddress)
        const owner = await contractInstance.methods.owner().call()

        return owner
    }
    catch(err){
        throw new Error("Some error occurred:\n"+err)
    }
}

export const debit = async(web3,account,contractAddress,amount,address)=>{
 
    if(!web3 || !account) throw new Error("Error Connecting")

    try{
        const sentAmount = web3.utils.toWei(amount,"ether")
        const contractInstance = new web3.eth.Contract(contractABI.abi,contractAddress)
        const receipt = await contractInstance.methods.debit(sentAmount,address).send({from:account})
        return receipt
    }
    catch(err){
        throw new Error("Failed Transaction!")
    }
}

export const credit = async(web3,account,contractAddress,amount)=>{
 
    if(!web3 || !account) throw new Error("Error Connecting")
    
    try{
        const sentAmount= web3.utils.toWei(amount,"ether")
        const contractInstance = new web3.eth.Contract(contractABI.abi,contractAddress)
        const receipt = await contractInstance.methods.credit().send({from:account,value:sentAmount})
        return receipt
    }
    catch(err){
        throw new Error("Failed Transaction!")
    }
}