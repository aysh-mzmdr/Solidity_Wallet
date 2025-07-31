import { useEffect, useState } from "react"
import Web3 from "web3"
import { Web3Context } from "./Web3Context.jsx"

function Web3Provider({children}){                  // Destructuring children components
    const [account,setAccount]=useState("")
    const [web3,setWeb3]=useState("")

    useEffect(() => {
        const connect = async() => {
            const user=localStorage.getItem("accountAddress")
            if(user){
                await connectWallet()
            }
        }
        connect()
    },[])

    const connectWallet = async () => {
        if(window.ethereum){
            try{
                const web3Instance=new Web3(window.ethereum)
                const accounts=await window.ethereum.request({method:"eth_requestAccounts"})

                setWeb3(web3Instance)
                setAccount(accounts[0])
                localStorage.setItem("accountAddress",accounts[0])
            }
            catch(err){
                if(err.code==4001)
                    window.alert("Need Permission to connect to Metamask")
                else
                    window.alert("There is some problem with your Metamask. Make sure you have a valid account for Ethereum Blockchain")
            }
        }
        else{
            window.alert("Please install Metamask")
        }
    }

    return (
        <Web3Context.Provider value={{web3,account,connectWallet}}>
            {children}                             
        </Web3Context.Provider>
    )
    // Wraps up the children components with the Web3Context, so that they can access the web3 instance and account, and then render the children
}

export default Web3Provider