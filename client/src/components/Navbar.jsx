import { Link } from "react-router-dom";
import { flash, logo } from "../assets";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Web3 from "web3";
import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers5/react'
import { ethers } from 'ethers'
import {
    setUserBalance,
    setLoginState,
    setAlertMessage,
    setWalletAddress,
} from "../store/slice";
import KAZIABI from "../utils/KAZI.json";
import { message } from "antd"

const kaziTokenABI = KAZIABI;

const kaziTokenAddress = import.meta.env.VITE_KAZI_TOKEN_ADDRESS;

function Navbar() {
    const dispatch = useDispatch();
    const { open, provider } = useWeb3Modal()
    const { address, isConnected } = useWeb3ModalAccount()
    const { walletProvider } = useWeb3ModalProvider()
    const [walletConnected, setWalletConnected] = useState(false)
    const [isLoadingBalance, setIsLoadingBalance] = useState(false)
    
    useEffect(() => {
        setWalletConnected(!!provider)
      }, [provider])  

    const userBalance = useSelector((state) => state.userBalance);

    // const connectWallet = async () => {
    //     if (typeof window.ethereum !== "undefined") {
    //         const web3 = new Web3(window.ethereum);

    //         try {
    //             const accounts = await window.ethereum.request({
    //                 method: "eth_requestAccounts",
    //             });

    //             await switchToSepolia();

    //             const kaziTokenContract = new web3.eth.Contract(
    //                 kaziTokenABI,
    //                 kaziTokenAddress
    //             );

    //             const balance = await kaziTokenContract.methods
    //                 .balanceOf(accounts[0])
    //                 .call();

    //             dispatch(setWalletAddress(accounts[0]));
    //             dispatch(setUserBalance((parseInt(balance) / 10 ** 18).toFixed(2)));
    //             dispatch(setLoginState(true));

    //             message.success("Wallet connected successfully");
    //         } catch (error) {
    //             message.error("Error connecting to MetaMask");
    //         }
    //     } else {
    //         message.error("MetaMask is not installed");
    //     }
    // };

    // const switchToSepolia = async () => {
    //     if (window.ethereum) {
    //         try {
    //             await window.ethereum.request({
    //                 method: "wallet_switchEthereumChain",
    //                 params: [{ chainId: "0xaa36a7" }],
    //             });
    //         } catch (switchError) {
    //             message.error("Failed to switch to Sepolia");
    //         }
    //     } else {
    //         message.error("MetaMask is not installed");
    //     }
    // };

    // useEffect(() => {
    //     connectWallet()
    // }, []);

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
          try {
            setIsLoadingBalance(true)
            if (isConnected) {
              const ethersProvider = new ethers.providers.Web3Provider(walletProvider)
              const signer = ethersProvider.getSigner()
              const contract = new ethers.Contract(kaziTokenAddress, kaziTokenABI, signer)
              const balance = await contract.balanceOf(address)
              const decimals = await contract.decimals()
    
              dispatch(setUserBalance(balance / Math.pow(10, decimals)))
              dispatch(setLoginState(true))
              setWalletConnected(true)
            } else {
              await open()
            }
            setIsLoadingBalance(false)
          } catch (error) {
            message.error('Error connecting to MetaMask or fetching balance')
            setIsLoadingBalance(false)
          }
        } else {
            message.error('Wallets not found')
        }
      }
      const handleConnectWallet = async () => {
        await connectWallet()
      }
  


    return (
        <>
            <div className="sticky top-0 w-full z-50 px-4 backdrop-blur-md">
                <nav className="lg:w-[80%] 3xl:w-[1504px] mx-auto border-b border-b-[#5c666c]">
                    <div className="nav flex items-center justify-between w-full mx-auto p-[20px_8px_16px_0px] z-40">
                        <img src={logo} alt="Logo" />
                        <div className="links flex items-center gap-[22px]">
                            <Link
                                to={"/"}
                                className="h-9 px-3 py-1.5 rounded justify-center items-center gap-1 inline-flex text-center text-white text-sm font-medium font-['Inter'] leading-normal"
                            >
                                Home
                            </Link>
                            <Link
                                to={"/"}
                                className="h-9 px-3 py-1.5 rounded justify-center items-center gap-1 inline-flex text-center text-white text-sm font-medium font-['Inter'] leading-normal"
                            >
                                FAQ
                            </Link>
                            <div className="hidden md:block">

                           
                            {userBalance ? (
                                <div>
                                    <li>KAZI Balance: {userBalance}</li>
                                </div>
                            ) : (
                                <button
                                    onClick={handleConnectWallet} className="text-sm font-medium h-9  px-2 py-1.5 border hover:border-[transparent] border-[#4e5055] justify-center items-center gap-1 xs:inline-flex hidden">
                                    <div className="w-4 h-4 relative">
                                        <img src={flash} className="w-4 h-4 left-0 top-0 absolute" />
                                    </div>
                                    <div className="px-1">
                                        Connect Wallet
                                    </div>
                                </button>)}
                        </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Navbar;
