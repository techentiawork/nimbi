import { Link } from "react-router-dom";
import { cryptocurrency, flash, wolf, yellowFlash } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import { setUserBalance } from "../store/slice";
import { message } from "antd";
import KAZIABI from "../utils/KAZI.json";
import { useEffect } from "react";
import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers5/react'
import { ethers } from 'ethers'

const kaziTokenABI = KAZIABI;

const kaziTokenAddress = import.meta.env.VITE_KAZI_TOKEN_ADDRESS;

function Hero() {

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

    const activeButton =(e)=>{
        document.querySelector('.btn1.active')?.classList.remove('active');
        e.target.classList.add('active')
    }

    return (
        <>

            <div className="flex flex-col pt-2.5 gap-[45px] mt-3">
                <div className="flex gap-[22px] w-full xl:flex-row flex-col-reverse justify-between">
                    <div className="px-5 py-3 xl:w-[709px] w-full max-w-full rounded-[16px] bg-[linear-gradient(272deg,_rgba(69,77,82,0.40)_3.39%,_rgba(101,127,141,0.32)_100%)] flex xl:gap-[49px] justify-between md:items-center md:flex-row flex-col gap-[9px]">
                        <div className="flex gap-[9px] ">
                            <img src={yellowFlash} alt="Yellow Flash" />
                            <div className="xs:w-[314px] w-full max-w-full h-[95px] flex-col justify-start items-start gap-0.5 inline-flex">
                                <div className="h-[45px] text-white text-3xl font-bold font-['Roboto'] uppercase leading-[25px]">KAZI DROP</div>
                                <div className="text-white text-base font-normal font-['Roboto'] leading-normal">Activ player will be randomly rewarded every 6 hours</div>
                            </div>
                        </div>
                        <div className="h-14 px-[3px] pt-1 pb-2 bg-[#242d32] rounded-[5px] justify-between md:justify-start items-start gap-[29px] inline-flex">
                            <div className="flex-col justify-start items-center inline-flex">
                                <div className="px-2.5 flex-col justify-center items-center gap-2.5 flex">
                                    <div className="text-white text-2xl font-medium font-['Roboto'] capitalize leading-9">03</div>
                                </div>
                                <div className="h-3 px-2.5 justify-center items-center gap-2.5 inline-flex">
                                    <div className="text-center text-white text-[10px] font-medium font-['Inter'] leading-normal">Hours</div>
                                </div>
                            </div>
                            <div className="flex-col justify-start items-center inline-flex">
                                <div className="px-2.5 flex-col justify-center items-center gap-2.5 flex">
                                    <div className="text-white text-2xl font-medium font-['Roboto'] capitalize leading-9">32</div>
                                </div>
                                <div className="h-3 px-2.5 justify-center items-center gap-2.5 inline-flex">
                                    <div className="text-center text-white text-[10px] font-medium font-['Inter'] leading-normal">Minutes</div>
                                </div>
                            </div>
                            <div className="flex-col justify-start items-center inline-flex">
                                <div className="px-2.5 flex-col justify-center items-center gap-2.5 flex">
                                    <div className="text-white text-2xl font-medium font-['Roboto'] capitalize leading-9">45</div>
                                </div>
                                <div className="h-3 px-2.5 justify-center items-center gap-2.5 inline-flex">
                                    <div className="text-center text-white text-[10px] font-medium font-['Inter'] leading-normal">Seconds</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-12 px-2 xl:w-[302px] w-full py-1.5 bg-[#303638]/40 rounded-[5px] items-center gap-3.5 inline-flex">
                        <div onClick={activeButton} className="btn1 active">
                            Lottery
                        </div>
                        <div onClick={activeButton} className="btn1">
                            How to play
                        </div>
                        {/* <div className="h-9 w-full px-2 py-1.5 rounded justify-center items-start gap-1 flex">
                            <div className="px-1 justify-start items-start gap-2.5 flex">
                                <div className="text-center text-[#767f84] text-sm font-medium font-['Inter'] leading-normal">How to play</div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="flex gap-[79px] flex-col w-full">
                    <div className="w-[812px] max-w-full min-h-[162px] flex-col justify-start items-start gap-3 inline-flex">
                        <div className=""><span className="text-white text-6xl font-extrabold font-['Roboto'] uppercase leading-[54px]">Get up to </span><span className="text-[#d9cb00] text-6xl font-extrabold font-['Roboto'] uppercase leading-[54px]">1000 KAZI</span><span className="text-white text-6xl font-extrabold font-['Roboto'] uppercase leading-[54px]"> BONUS</span></div>
                        <div className=" text-[#ebeced] text-[22px] font-normal font-['Roboto'] uppercase leading-10">Flip first coin AND GET BONUS</div>
                        {
                            !userBalance ?
                                <div onClick={handleConnectWallet} className="btn2 flex gap-2.5 xs:w-[176px] w-full">
                                    <img src={flash} />
                                    <div className="">
                                        Connect Wallet
                                    </div>
                                </div> :
                                <Link to="/game" className="btn2 flex gap-2.5 xs:w-[176px] w-full">
                                        Start
                                </Link>
                        }
                    </div>
                    <div className="grid 3xl:grid-cols-2 gap-5">
                        <div className="bg-[#2e3a41] w-full rounded-[15px] max-w-full md:h-[305.26px] py-[21px] px-[13px] md:px-8 md:py-6">
                            <img src={cryptocurrency} className="md:hidden w-[169px] h-[154px]" />
                            <div className="w-full justify-between items-center gap-[23px] inline-flex">
                                <div className="xs:w-[314px] w-full max-w-full flex-col justify-start items-start gap-[19px] md:gap-[79px] inline-flex">
                                    <div className="min-h-[129px] flex-col justify-start items-start gap-[19px] flex">
                                        <div className="flex flex-wrap gap-2">
                                            <span className="text-white text-[44px] font-extrabold font-['Roboto'] uppercase leading-[43px]">Flip coin</span>
                                            <span className="text-[#d9cb00] text-[44px] font-extrabold font-['Roboto'] uppercase leading-[43px]">KAZI</span></div>
                                        <div className="xs:w-[314px] max-w-full text-white text-base font-normal font-['Roboto'] leading-normal">Add any amount of kazi - flip to double.</div>
                                        <div className="text-[#e6f7fd] text-xl font-normal font-['Roboto'] uppercase leading-normal">1 flip win doubles = 200 Kazi</div>
                                    </div>
                                    <Link to={"/game"} className="xs:w-[178px] w-full max-w-full btn-yel">
                                        Flip coin
                                    </Link>
                                </div>
                                <div className="relative w-full md:flex hidden justify-end">
                                    <div className="lg:w-[334px] -translate-y-[50%] lg:h-[305px] w-[290px] h-[264px] absolute">
                                        <img src={cryptocurrency} className=" lg:w-[334px] lg:h-[305px] w-[290px] h-[264px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:h-[300px] h-full rounded-[15px] bg-gradient-to-br from-[#ead326] to-[#ff8717] py-[21px] px-[13px] md:px-8 md:py-6 flex gap-[34px]">
                            <div className="md:h-[252px] h-full gap-[9px] w-full flex-col justify-between items-start inline-flex">
                                <div className="md:h-[22px] px-[9px] py-[3px] bg-[#3f3c3c] rounded justify-center items-center gap-1.5 inline-flex">
                                    <div className="text-white text-[10px] font-semibold font-['Manrope']">COMING SOON</div>
                                </div>
                                <img src={wolf} className="md:hidden w-[186px] h-full xs:h-[176px]" alt="" />
                                <div className="md:h-[129px] h-full flex-col justify-start items-start gap-[11px] flex">
                                    <div className="text-[#1f1f1f] text-xl font-medium font-['Roboto'] uppercase leading-normal">FIRST TRY FREE</div>
                                    <div className="text-black/80 text-[55px] font-normal font-gothic uppercase leading-[59px]">Wolf race</div>
                                    <div className="xs:w-[314px] w-full max-w-full text-black text-base font-normal font-['Roboto'] leading-normal">Add any amount of kazi - flip to double.</div>
                                </div>
                            </div>
                            <div className="relative w-full  md:flex justify-center items-center hidden">
                                <div className="-bottom-[43px] lg:h-[354px] w-[336px] lg:w-[374px] h-[318px] absolute">
                                    <img src={wolf} className="lg:h-[354px] w-[336px] lg:w-[374px] h-[318px]" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Hero;