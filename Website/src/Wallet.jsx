import { useEffect, useState,useContext } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { walletOwnership } from "./Web3/factoryService";
import { balance,owner,credit,debit } from "./Web3/walletService";
import { Web3Context } from "./Web3/Web3Context";
import style from "./Wallet.module.css"

function Wallet(){

    const {web3,account,connectWallet} = useContext(Web3Context)

    const [Balance,setBalance] = useState()
    const [Owner,setOwner] = useState()
    const [WalletAddress,setAddress] = useState()

    const [credit,setCredit]=useState(0)
    const [debit,setDebit]=useState(0)
    
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
    
    return(
        <>
            <div className={style.wallet}>
                <div className={style.display}>
                    <h1 style={{alignSelf:"center"}}>Wallet</h1>
                    <label><label className={style.key}>Address:</label><label style={{fontSize:"20px",paddingInline:"10px"}}>{WalletAddress}</label></label>
                    <label><label className={style.key}>Balance:</label><label style={{fontSize:"20px",paddingInline:"10px"}}>{Balance}</label></label>
                    <label><label className={style.key}>Owner:</label><label style={{fontSize:"20px",paddingInline:"10px"}}>{Owner}</label></label>
                    <label style={{opacity:`${credit||debit}`}} className={style.key}>Amount:<input placeholder="..."></input></label>
                    <label style={{opacity:`${debit}`}} className={style.key}>Address:<input placeholder="..."></input></label>
                    <div className={style.buttonArea}>
                        <button className={style.transactOption} onClick={()=>{setCredit(1);setDebit(0)}}>Credit</button>
                        <button className={style.transactOption} onClick={()=>{setCredit(0);setDebit(1)}}>Debit</button>
                    </div>
                    <button className={style.transact}>Transact</button>
                </div>
            </div>
            <canvas className="canva"></canvas>
        </>
    )
}

export default Wallet