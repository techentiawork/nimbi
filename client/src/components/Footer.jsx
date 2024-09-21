import { discord, insta, telegram, xicon, yt } from '../assets'
function Footer() {
    return (
        <>
            <div className="capitalize w-full text-[14px] flex flex-col gap-4  px-[2rem] lg:px-[4rem] xl:px-[8rem] py-6">
                <div className={`flex items-center gap-[27px] flex-col  justify-between 3xl:w-[90%] mx-auto`}>
                    <div className="flex flex-col items-center gap-[7px]">
                        <p className='text-[#EBECED] '>Our community</p>
                        <ul className="list-none flex gap-[13px] items-center">
                            <li><img src={discord} className='w-5 rounded-[4px] cursor-pointer' alt="" /></li>
                            <li><img src={telegram} className='w-5 rounded-[4px] cursor-pointer' alt="" /></li>
                            <li><img src={insta} className='w-5 rounded-[4px] cursor-pointer' alt="" /></li>
                            <li><img src={xicon} className='w-5 rounded-[4px] cursor-pointer' alt="" /></li>
                            <li><img src={yt} className='w-5 rounded-[4px] cursor-pointer' alt="" /></li>
                        </ul>
                    </div>
                    <p className="text-white text-center text-[11px] font-normal font-roboto">Copyright &copy; 2024 NIMBI.COM | All rights reserved.</p>
                </div>
            </div>
        </>
    );
}

export default Footer;