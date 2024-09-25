import { discord, insta, telegram, xicon, yt } from '../assets'
import reddit from "../assets/reddit.png"
function Footer() {
    return (
        <>
            <div className="capitalize w-full text-[14px] flex flex-col gap-4  px-[2rem] lg:px-[4rem] xl:px-[8rem] py-6">
                <div className={`flex items-center gap-[27px] flex-col  justify-between 3xl:w-[90%] mx-auto`}>
                    <div className="flex flex-col items-center gap-[7px]">
                        <p className='text-[#EBECED] '>Our community</p>
                        <ul className="list-none flex gap-[13px] items-center">
                            <li><img src={discord} className='w-5 rounded-[4px] cursor-pointer' alt="https://discord.gg/nimbi" /></li>
                            <li><img src={telegram} className='w-5 rounded-[4px] cursor-pointer' alt="https://web.telegram.org/k/#@NimbiWolfpackVIP" /></li>
                            <li><img src={telegram} className='w-5 rounded-[4px] cursor-pointer' alt="https://web.telegram.org/k/#@nimbitoken" /></li>
                            <li><img src={reddit} className='w-5 rounded-[4px] cursor-pointer' alt="https://www.reddit.com/user/nimbitoken/?rdt=35960" /></li>
                            <li><img src={yt} className='w-5 rounded-[4px] cursor-pointer' alt="https://www.youtube.com/@KaziSafari" /></li>
                        </ul>
                    </div>
                    <p className="text-white text-center text-[11px] font-normal font-roboto">Copyright &copy; 2024 NIMBI.COM | All rights reserved.</p>
                </div>
            </div>
        </>
    );
}

export default Footer;
