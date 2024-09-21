import { Link } from "react-router-dom";
import { flash, logo } from "../assets";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import {
    setUserBalance,
    setLoginState,
    setAlertMessage,
    setWalletAddress,
} from "../store/slice";
import KAZIABI from "../utils/KAZI.json";
import {message} from "antd"



const kaziTokenABI = KAZIABI;

const kaziTokenAddress = import.meta.env.VITE_KAZI_TOKEN_ADDRESS;

function Navbar() {
    const dispatch = useDispatch();

    const userBalance = useSelector((state) => state.userBalance);

    const connectWallet = async () => {
        if (typeof window.ethereum !== "undefined") {
            const web3 = new Web3(window.ethereum);

            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                const kaziTokenContract = new web3.eth.Contract(
                    kaziTokenABI,
                    kaziTokenAddress
                );

                const balance = await kaziTokenContract.methods
                    .balanceOf(accounts[0])
                    .call();

                dispatch(setWalletAddress(accounts[0]));
                dispatch(setUserBalance((parseInt(balance) / 10 ** 18).toFixed(2)));
                dispatch(setLoginState(true));
                console.log('clicked')
                message.success("wallet connected successfully")

            } catch (error) {
                dispatch(
                    setAlertMessage({
                        message: "Error connecting to MetaMask",
                        type: "alert",
                    })
                );
                setTimeout(() => dispatch(setAlertMessage({})), 1000);
            }
        } else {
            message.error("MetaMask is not installed")
        }
    };

    useEffect(() => {
        connectWallet();
    }, []);

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
                            {userBalance ? (
							<div>
								<li>KAZI Balance: {userBalance}</li>
							</div>
						) : (
                            <button
                                onClick={connectWallet} className="text-sm font-medium h-9  px-2 py-1.5 border hover:border-[transparent] border-[#4e5055] justify-center items-center gap-1 xs:inline-flex hidden">
                                <div className="w-4 h-4 relative">
                                    <img src={flash} className="w-4 h-4 left-0 top-0 absolute" />
                                </div>
                                <div className="px-1">
                                    Connect Wallet
                                </div>
                            </button>) }
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Navbar;
