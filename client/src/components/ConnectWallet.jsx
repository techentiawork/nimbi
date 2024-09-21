import { Link } from "react-router-dom";
import { cryptoDustLottery, flash } from "../assets";

function ConnectWallet() {
    return (
        <>
            <div className="flex h-full max-w-full items-center justify-center flex-col py-5">
                <div className="w-[432px] max-w-[100%] h-[456px] px-[19px] pt-[113px] pb-5 bg-[#2e3a41] rounded border border-[#5c666c] flex-col justify-start items-center gap-[100px] flex">
                    <div className="flex-col justify-start items-center gap-[9px] flex">
                        <div className="w-[270.86px]  max-w-full h-[138px] relative">
                            <img className="w-[inherit]" src={cryptoDustLottery} />
                        </div>
                        <div className="flex-col justify-start items-center gap-[19px] flex">
                            <div className="flex-col justify-start items-center flex">
                                <div className="text-[#a1a7aa] text-sm font-normal font-['Roboto'] capitalize leading-loose">Double your KAZI amount</div>
                            </div>
                        </div>
                    </div>
                    <Link to={"/game"} className="w-full btn px-3.5 py-2.5 bg-[#00ace6] rounded justify-center items-center gap-2.5 inline-flex">
                        <div className="w-5 h-5 relative">
                            <img className="w-5 h-5 left-0 top-0 absolute" src={flash} />
                        </div>
                        <div className="px-1 justify-start items-start gap-2.5 flex">
                            <div className="text-center text-white text-base font-medium font-['Inter'] leading-normal">START</div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default ConnectWallet;