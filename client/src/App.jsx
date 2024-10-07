import { useState } from 'react'
import './App.css'
import { FAQ, Home } from './Pages'
import Wallet from "./Pages/Wallet";
import { createWeb3Modal, defaultConfig, useWeb3ModalProvider } from '@web3modal/ethers5/react'
import { ethers } from 'ethers';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
const projectId = '29fa5b8dbe55e7aaa7a0ef6baa46156b'

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}
const sepolia = {
  chainId: 11155111,
  name: 'Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io',
  rpcUrl: 'https://rpc.sepolia.org',
};

// 3. Create a metadata object
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1 // used for the Coinbase SDK
})

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet, sepolia],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

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
          <BrowserRouter>
            <Routes>
              <Route path='*' element={<Home />} />
              <Route path='/faq' element={<FAQ />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>

    </>
  )
}

export default App
