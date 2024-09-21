import { Link } from "react-router-dom";
import { coin } from "../assets";

function Card({ coinPrice,link }) {    

    return (
        <>
            <div className="p-4 flex flex-col w-full gap-[44px] md:gap-[79px] bg-[#2E3A41] rounded-[14px]">
                <div className="flex gap-[19px] items-start">
                    <img src={coin} className="" alt="Coin" />
                    <div className="min-h-[95px] flex-col justify-start items-start gap-0.5 inline-flex">
                        <div><span className="text-white text-2xl font-extrabold font-['Roboto'] uppercase leading-[43px]">Flip coin</span><span className="text-[#2e3a41] text-2xl font-extrabold font-['Roboto'] uppercase leading-[43px]"> </span><span className="text-[#d9cb00] text-2xl font-extrabold font-['Roboto'] uppercase leading-[43px]">{coinPrice}</span></div>
                        <div className="max-w-[314px] text-white text-base font-normal font-['Roboto'] leading-normal">Add any amount of kazi - flip to double.</div>
                        <div className="text-[#e6f7fd] text-lg font-normal font-['Roboto'] uppercase leading-normal">1 flip win doubles = {coinPrice * 2} Kazi</div>
                    </div>
                </div>
                <Link to={`/game/${link}`} className="btn-yel">Enter</Link>
            </div>
        </>
    );
}

export default Card;