import { useState } from 'react'
import './App.css'
import { Home } from './Pages'
import Wallet from "./Pages/Wallet";
function App() {

  const [openWallet, setOpenWallet] = useState(false)
  return (
    <>
      <div className="app-wolf relative">

        <div className="app-grad ">
          {
            openWallet && <div className="absolute w-screen h-screen flex backdrop-blur-[4px] top-0 justify-center items-center z-[100]">
              <Wallet setOpenWallet={setOpenWallet} />
            </div>
          }
          <Home setOpenWallet={setOpenWallet} />
        </div>
      </div>

    </>
  )
}

export default App
