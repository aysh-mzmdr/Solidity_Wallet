import { useContext, useEffect } from "react"
import * as THREE from "three"
import style from "./Home.module.css"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { createWallet } from "./Web3/factoryService";
import { useNavigate } from "react-router-dom"
import { Web3Context } from "./Web3/Web3Context";

function Home(){

    const navigate=useNavigate()
    const {web3,account,connectWallet} = useContext(Web3Context)

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

    const metamaskHandle=async()=>{
        await connectWallet()
    }

    const walletHandle=async()=>{
        await createWallet(web3,account)
        navigate("/wallet")
    }

    return(
        <>
            <div className={style.login}>
                <h1 className={style.head}>Wallet Ownership</h1>
                {(!account || !web3)?
                    (<button className={style.connect} onClick={metamaskHandle}>Connect Metamask</button>)
                :
                    (<button className={style.connect} onClick={walletHandle}>Own Wallet</button>)}
            </div>
            <canvas className="canva"></canvas>   
        </>
    )
}

export default Home