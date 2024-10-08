import { useState, useEffect } from "react";
import { arrowBack, cat, circle, coingif, coinh, coint, wincat } from "../assets";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message,Spin } from 'antd'
import { setUserBalance } from "../store/slice";
// import Web3 from 'web3'
import KAZIABI from "../utils/KAZI.json";
import poolABI from "../utils/Pool.json";
import axios from 'axios'
import { createWeb3Modal, defaultConfig, useWeb3ModalProvider } from '@web3modal/ethers5/react'
import { ethers } from 'ethers';
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


const kaziTokenABI = KAZIABI;

const poolAbi = poolABI;

const kaziTokenAddress = import.meta.env.VITE_KAZI_TOKEN_ADDRESS;

const poolContractAddress = import.meta.env.VITE_POOL_CONTRACT_ADDRESS;

function CardFlipCoin() {
    const [coinSide, setCoinSide] = useState("");
    const [result, setresult] = useState("");
    const [isPlaying, setisPlaying] = useState(false);
    const [isRefunding, setisRefunding] = useState(false);
    const [isDepositing, setIsDepositing] = useState(false);
    const [amountInWei, setAmountInWei] = useState()
    const [paymentNotDone, setPaymentNotDone] = useState(false)
    const { walletProvider } = useWeb3ModalProvider()
    const [walletAddressCheck, setWalletAddressCheck] = useState(null);



    const { game } = useParams();
    const walletAddress = useSelector(state => state.walletAddress);
    const dispatch = useDispatch();

    const games = {
        game1: 1000,
        game2: 5000,
        game3: 10000,
    }

    const amount = games[game]

    const userBalance = useSelector((state) => state.userBalance);
    const handleWalletConnect = async () => {
        const provider = new ethers.providers.Web3Provider(walletProvider);
        const signer = provider.getSigner();
        const mepToken = new ethers.Contract(kaziTokenAddress, kaziTokenABI, signer);

        const balance = await mepToken.balanceOf(await signer.getAddress());
        dispatch(setUserBalance(parseInt(ethers.utils.formatUnits(balance, 9))));
    };

    useEffect(() => {
        if (walletProvider) {
            handleWalletConnect();
        }
    }, [walletProvider]);

    const startGame = async () => {
        if (!userBalance) {
            message.error("Kindly Connect wallet first")
        } else if (!coinSide) {
            message.error("Kindly Choose bet ")
        } else if (userBalance < amount) {
            message.error("Insufficient Balance")
        } else if (!isPlaying && userBalance > amount) {
            setIsDepositing(true)
            try {
                const provider = new ethers.providers.Web3Provider(walletProvider);
                const signer = provider.getSigner();
    
                const walletAddress = await signer.getAddress();
                setWalletAddressCheck(walletAddress);
                // const web3 = new Web3(window.ethereum);
                const poolContract = new ethers.Contract(poolContractAddress, poolAbi, signer);
                const kaziToken = new ethers.Contract(kaziTokenAddress, kaziTokenABI, signer);
                // const poolContract = new web3.eth.Contract(poolAbi, poolContractAddress);
                // const kaziToken = new web3.eth.Contract(kaziTokenABI, kaziTokenAddress);

                // const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
                const amountInWei = ethers.utils.parseEther(amount.toString());
                const formattedBetAmount = amountInWei.toString();
                setAmountInWei(amountInWei)
                setPaymentNotDone(true)
                const approveTx = await kaziToken.approve(poolContractAddress, amountInWei);
                await approveTx.wait();
                const depositTx = await poolContract.deposit(amountInWei);
                await depositTx.wait();
                setPaymentNotDone(false)
                const result = await axios.get(`${import.meta.env.VITE_SERVER_URL}/result?amount=${amount}`)
                sessionStorage.setItem('result', result.data)

                dispatch(setUserBalance(userBalance - amount))

                setisPlaying(true)
                console.log("result is",result.data)
                if (result.data === coinSide) {
                    const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/distribute`, {
                        walletAddress: walletAddress,
                        amount: formattedBetAmount,
                    }); 

                    if (!res.data.success) {
                        setisRefunding(false)
                        message.error(res.data.response)
                        if (res.data.refundRes === 'Refunded successfully') {
                            message.success(res.data.refundRes)
                            dispatch(setUserBalance(userBalance + amount * 2))
                        }
                        else
                            message.error(res.data.refundRes)

                    } else {
                        dispatch(setUserBalance(userBalance + amount * 2))
                        message.success(res.data.response)
                    }
                    console.log(res)
                } else {
                    setresult(result.data)
                    message.success("You lost the bet")
                }

                setresult(result.data)

                console.log('done')
            } catch (error) {
                message.error('Transaction Failed')
                console.log(error)
            }
            finally {
                setIsDepositing(false)
            }
        }
    }

    console.log(result)

    const restart = () => {
        setCoinSide("")
        setresult("")
        setisPlaying(false)
        setisRefunding(false)
    }

    return (
        <div className="min-h-[75vh]">
            <Link to={"/"} className="p-2 flex items-center gap-1 w-fit">
                <img src={arrowBack} alt="" />
                <div className="px-1">
                    <div className="text-center text-[#ebeced] text-sm font-medium font-['Inter'] leading-normal">back</div>
                </div>
            </Link>
            {
                !isPlaying ?
                    <div className="justify-center flex py-5 w-full">
                        <Spin tip="Payment Pending..." spinning={paymentNotDone}>
                        <div className="w-[405px] max-w-full min-h-[412px] p-5 bg-black/25 backdrop-blur-md flex-col justify-start items-center gap-12 inline-flex">
        
                            <div className="min-h-[280px] flex-col justify-start items-center gap-[23px] flex">
                                <div className="min-h-[82px] flex-col justify-start items-center gap-[15px] flex">
                                    <div className="text-[44px] font-extrabold font-['Roboto'] uppercase leading-[43px] flex justify-center flex-wrap gap-2">
                                        <span className="text-white">Flip coin</span>
                                        <span className="text-[#d9cb00]">{amount}</span>
                                    </div>
                                    <div className="text-center text-white text-base font-normal font-['Roboto'] leading-normal">Amount:{amount}</div>
                                </div>
                                <div className="min-h-[175px] flex-col justify-start items-center gap-[23px] flex">
                                    <div className="justify-start items-start gap-[23px] inline-flex">
                                        <div className="relative">
                                            <img src={coinh} alt="Coin H" onClick={() => setCoinSide("head")} className="cursor-pointer" />
                                            {
                                                coinSide == "head" && <img className="absolute bottom-0 left-0" src={circle} alt="Circle" />
                                            }
                                        </div>
                                        <div className="relative">
                                            <img src={coint} alt="Coin H" onClick={() => setCoinSide("tail")} className="cursor-pointer" />
                                            {
                                                coinSide == "tail" && <img className="absolute bottom-0 right-0" src={circle} alt="Circle" />
                                            }
                                        </div>
                                    </div>
                                    <div className="text-center text-white text-xl font-normal font-['Roboto'] leading-normal">
                                        {coinSide == "" ? "Select Coin Side" : coinSide + " selected"}
                                    </div>
                                </div>
                            </div>
                            <button disabled={isDepositing} onClick={startGame} className={`btn-yel w-full`}>
                                Start
                            </button>
                            
                        </div>
                        </Spin>
                    </div > :
                    !result ?
                        <div className="flex justify-center w-full py-5"> 
                                <div className="w-[405px] max-w-full min-h-[394px] px-5 pt-[49px] pb-5 bg-black/25 backdrop-blur-md flex-col justify-start items-center gap-2.5 inline-flex">
                                <div className="text-white text-[32px] font-extrabold font-['Roboto'] uppercase leading-[43px]">Game started</div>
                                <div className="game-text-grad">1 flip win doubles = 2000 Kazi</div>
                                <img className="w-48 h-48" src={coingif} />
                            </div>
                        </div>:
                        result === coinSide ?
                            <div className="flex justify-center w-full py-5">

                                <div className="w-[405px] max-w-full min-h-[504px] px-5 pt-[49px] pb-5 bg-black/25 backdrop-blur-md flex-col justify-start items-center gap-12 inline-flex">
                                    <div className="min-h-[75px] flex-col justify-start items-center gap-2 flex">
                                        <div className="text-white text-[32px] font-extrabold font-['Roboto'] uppercase leading-[43px]">YOU Win!</div>
                                        <div className="text-center text-white text-base font-bold font-['Roboto'] text-[40px]">{amount * 2}</div>
                                    </div>
                                    <div className="w-[90.69px] h-40 relative">
                                        <img src={wincat} alt="Cat" />
                                    </div>
                                    <div className="min-h-[104px] flex-col justify-start items-start gap-4 flex w-full">
                                        <button onClick={restart} to={"/flip-coin"} className="btn-yel w-full">
                                            Try again
                                        </button>
                                        <Link to={"/"} className="px-3.5 py-2.5 rounded border border-white justify-center items-start gap-2.5 inline-flex w-full">
                                            <div className="px-1 justify-start items-start gap-2.5 flex w-full">
                                                <div className="text-center text-white w-full text-base font-medium font-['Inter'] leading-normal">Back to rooms</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="flex justify-center w-full py-5">

                                <div className="w-[405px] max-w-full min-h-[504px] px-5 pt-[49px] pb-5 bg-black/25 backdrop-blur-md flex-col justify-start items-center gap-12 inline-flex">
                                    <div className="min-h-[75px] flex-col justify-start items-center gap-2 flex">
                                        <div className="text-white text-[32px] font-extrabold font-['Roboto'] uppercase leading-[43px]">YOU loose!</div>
                                        <div className="text-center text-white text-base font-normal font-['Roboto'] leading-normal">Never give up</div>
                                    </div>
                                    <div className="w-[90.69px] h-40 relative">
                                        <img src={cat} alt="Cat" />
                                    </div>
                                    <div className="min-h-[104px] flex-col justify-start items-start gap-4 flex w-full">
                                        <button onClick={restart} to={"/flip-coin"} className="btn-yel w-full">
                                            Try again
                                        </button>
                                        <Link to={"/"} className="px-3.5 py-2.5 rounded border border-white justify-center items-start gap-2.5 inline-flex w-full">
                                            <div className="px-1 justify-start items-start gap-2.5 flex w-full">
                                                <div className="text-center text-white w-full text-base font-medium font-['Inter'] leading-normal">Back to rooms</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

            }
        </div>
    );
}

export default CardFlipCoin;


{/* <div className="flex justify-center w-full py-5">
<div className="min-h-[544px] px-5 pt-[49px] pb-5 bg-black/25 backdrop-blur-md flex-col justify-start items-center gap-12 inline-flex">
    <div className="text-white text-[32px] font-extrabold font-['Roboto'] uppercase leading-[43px]">yOU wIN!</div>
    <div className="w-[193px] max-w-full text-center text-white text-[44px] font-normal font-['Roboto'] leading-normal">10,000 K</div>
    <img className="max-w-full w-[97.75px] min-h-40 relative" src={wincat} />
    <div className="min-h-[104px] flex-col justify-start items-start gap-4 flex">
        <button onClick={restart} className="btn-yel w-full">
            Play again
        </button>
        <Link to={"/"} className="px-3.5 py-2.5 rounded border border-white justify-center items-start gap-2.5 inline-flex">
            <div className="px-1 justify-start items-start gap-2.5 flex">
                <div className="text-center text-white text-base font-medium font-['Inter'] leading-normal">Back to rooms</div>
            </div>
        </Link>
    </div>
</div>
</div >  */}
