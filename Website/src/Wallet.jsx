import { useEffect, useState,useContext } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { walletOwnership } from "./Web3/factoryService";
import { balance,owner,credit,debit } from "./Web3/walletService";
import { Web3Context } from "./Web3/Web3Context";
import style from "./Wallet.module.css"

function Wallet(){

    const {web3,account} = useContext(Web3Context)

    const [Balance,setBalance] = useState(0)
    const [Owner,setOwner] = useState(0)
    const [WalletAddress,setAddress] = useState(0)

    const [creditStatus,setCredit]=useState(0)
    const [debitStatus,setDebit]=useState(0)

    const [sentAddress,setSentAddress] = useState(0)
    const [amount,setAmount] = useState(0)
    
    useEffect(() => {

        const setup = async()=>{
            const Address = await walletOwnership(web3,account)
            setAddress(Address)
            setOwner(await owner(web3,account,Address))
            setBalance(await balance(web3,account,Address))
        }

        setup()
    },[web3,account])

    useEffect(() => {
        const scene=new THREE.Scene()
        
        const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,200)
        camera.position.x=0
        camera.position.y=1.6
        camera.position.z=2.9

        const canvas=document.querySelector("canvas.canva")
        const renderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true})
        renderer.setSize(window.innerWidth,window.innerHeight)

        const model={box:new THREE.Mesh()}
        const gltfLoader=new GLTFLoader()
        gltfLoader.load("src/loginBlender.glb",(gltf) => {
        model.box=gltf.scene;
        model.box.position.set(0,-1,0);
        scene.add(model.box);
        })

        const bglight=new THREE.AmbientLight("white",2)
        const light=new THREE.PointLight("white",20000)
        light.position.set(0,50,-3)

        scene.background=new THREE.Color(0x82bdbd)
        scene.add(light,bglight)

        const handleResize = () => {
            camera.aspect=window.innerWidth/window.innerHeight,
            camera.updateProjectionMatrix(),
            renderer.setSize(window.innerWidth,window.innerHeight)
        }

        window.addEventListener("resize", handleResize)

        const clock = new THREE.Clock()
        const renderloop=()=>{
            const elapsedTime=clock.getElapsedTime()
            model.box.position.y=Math.sin(elapsedTime)*0.5
            renderer.render(scene,camera)
            window.requestAnimationFrame(renderloop)
        }

        renderloop()

        return () => { window.removeEventListener("resize",handleResize)}

    },[])

    const transactHandle=async()=>{
        if(creditStatus)
            await credit(web3,account,WalletAddress,amount)
        else if(debitStatus)
            await debit(web3,account,WalletAddress,amount,sentAddress)
        else
            window.alert("Please either choose Debit or Credit")
    }
    
    return(
        <>
            <div className={style.wallet}>
                <div className={style.display}>
                    <h1 style={{alignSelf:"center"}}>Wallet</h1>
                    <label><label className={style.key}>Address:</label><label style={{fontSize:"20px",paddingInline:"10px"}}>{WalletAddress}</label></label>
                    <label><label className={style.key}>Balance:</label><label style={{fontSize:"20px",paddingInline:"10px"}}>{Balance}</label>ETH</label>
                    <label><label className={style.key}>Owner:</label><label style={{fontSize:"20px",paddingInline:"10px"}}>{Owner}</label></label>
                    <label style={{opacity:`${creditStatus||debitStatus}`}} className={style.key}>Amount:<input className={style.amount} value={amount} onChange={e => setAmount(e.target.value)}></input><label className={style.temp}>ETH</label></label>
                    <label style={{opacity:`${debitStatus}`}} className={style.key}>Address:<input value={sentAddress} onChange={e => setSentAddress(e.target.value)}></input></label>
                    <div className={style.buttonArea}>
                        <button className={style.transactOption} onClick={()=>{setCredit(1);setDebit(0)}}>Credit</button>
                        <button className={style.transactOption} onClick={()=>{setCredit(0);setDebit(1)}}>Debit</button>
                    </div>
                    <button className={style.transact} onClick={transactHandle}>Transact</button>
                </div>
            </div>
            <canvas className="canva"></canvas>
        </>
    )
}

export default Wallet