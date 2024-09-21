import { coingif } from "../assets";

function GameStarted() {
    return (
        <div className="flex justify-center w-full py-5">
            <div className="w-[405px] max-w-full min-h-[394px] px-5 pt-[49px] pb-5 bg-black/25 backdrop-blur-md flex-col justify-start items-center gap-2.5 inline-flex">
                <div className="text-white text-[32px] font-extrabold font-['Roboto'] uppercase leading-[43px]">Game started</div>
                <div className="game-text-grad">1 flip win doubles = 2000 Kazi</div>
                <img className="w-48 h-48" src={coingif} />
            </div>
        </div>
    );
}

export default GameStarted;