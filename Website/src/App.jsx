import Home from "./Home.jsx"
import Wallet from "./Wallet.jsx"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"

function App(){

    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/wallet" element={<Wallet/>}/>
            </Routes>
        </Router>
    )
}

export default App