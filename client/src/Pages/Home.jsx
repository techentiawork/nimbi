import { Route, Routes } from "react-router-dom";
import { Footer, Navbar } from "../components";
import Hero from "../components/Hero";
import ConnectWallet from "../components/ConnectWallet";
import FlipCoin from "../components/FlipCoin";
import CardFlipCoin from "../components/CardFlipCoin";

function Home({ setOpenWallet }) {
    return (
        <div className="h-full min-h-screen flex flex-col">
            <Navbar />
            <div className="lg:w-[80%] 3xl:w-[1504px] w-full px-4 max-w-full mx-auto ">
                <Routes>
                    {/* <Route path="/" element={<ConnectWallet />} /> */}
                    <Route path="/" element={<Hero/>} />
                    <Route path="/game" element={<FlipCoin />} />
                    <Route path="/game/:game" element={<CardFlipCoin />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default Home;