import { Link } from "react-router-dom";
import { arrowBack } from "../assets";
import Card from './Card'
function FlipCoin() {
    return (
        <>
            <div className="w-full py-[14px] pt-[63px]">
                <Link to={"/home"} className="p-2 flex items-center gap-1 w-fit">
                    <img src={arrowBack} alt="" />
                    <div className="px-1">
                        <div className="text-center text-[#ebeced] text-sm font-medium font-['Inter'] leading-normal">back</div>
                    </div>
                </Link>
                <div className="flex flex-col gap-[56px] ">
                    <div className="min-h-[82px]  flex-col justify-start items-center gap-[15px] inline-flex">
                        <div className="text-[44px] font-extrabold font-['Roboto'] flex justify-center flex-wrap uppercase leading-[43px] gap-3">
                            <span className="text-[#d9cb00]">Kazi</span>
                            <span className="text-white"> Flip coin</span>
                            <span className="text-white">game</span></div>
                        <div className="text-center text-white text-xl font-normal font-['Roboto'] leading-normal">Join the rooms below</div>
                    </div>
                    <div className="grid 3xl:grid-cols-3 md:grid-cols-2 gap-[21px]">
                        <Card link="game1" coinPrice={1000} />
                        <Card link="game2" coinPrice={5000} />
                        <Card link="game3" coinPrice={10000} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default FlipCoin;