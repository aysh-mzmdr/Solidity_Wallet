import contractABI from "../contracts/Wallet.json"

export const balance = async(web3,account,contractAddress)=>{
 
    if(!web3 || !account) throw new Error("Error Connecting")

    const contractInstance = new web3.eth.Contract(contractABI.abi,contractAddress)
    const balance = await contractInstance.methods.balance().call()

    return balance
}

export const owner = async(web3,account,contractAddress)=>{
 
    if(!web3 || !account) throw new Error("Error Connecting")

    const contractInstance = new web3.eth.Contract(contractABI.abi,contractAddress)
    const owner = await contractInstance.methods.owner().call()

    return owner
}

export const debit = async(web3,account,contractAddress,amount,address)=>{
 
    if(!web3 || !account) throw new Error("Error Connecting")

    const contractInstance = new web3.eth.Contract(contractABI.abi,contractAddress)
    const receipt = await contractInstance.methods.debit(amount,address).send({from:account})
    return receipt
}

export const credit = async(web3,account,contractAddress,amount)=>{
 
    if(!web3 || !account) throw new Error("Error Connecting")

    const contractInstance = new web3.eth.Contract(contractABI.abi,contractAddress)
    const receipt = await contractInstance.methods.credit().send({from:account,value:amount})
    return receipt
}