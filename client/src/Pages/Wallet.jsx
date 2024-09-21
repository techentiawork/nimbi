import { Link, useNavigate } from 'react-router-dom';
import { binance, blockto, cross, flash, brave, coinbase, math, metamask, opera, safepal, tp, trust, wallet_98, walletConnect } from '../assets'


function Wallet({ setOpenWallet }) {
  const wallet = [
    {
      name: "98 Wallet",
      icon: wallet_98
    },
    {
      name: "binance",
      icon: binance
    },
    {
      name: "TP wALLET",
      icon: tp
    },
    {
      name: "Metamask",
      icon: metamask
    },
    {
      name: "coinbase",
      icon: coinbase
    },
    {
      name: "trust",
      icon: trust
    },
    {
      name: "blockto",
      icon: blockto
    },
    {
      name: "Brave",
      icon: brave
    },
    {
      name: "math",
      icon: math
    },
    {
      name: "opera",
      icon: opera
    },
    {
      name: "safepal",
      icon: safepal
    },
    {
      name: "wallet connect",
      icon: walletConnect
    },
  ]
  const navigate = useNavigate()
  return (
    <>
      <div className="flex justify-center w-full py-5">
        <div className="py-[14px] px-4 w-[334px] max-w-full flex flex-col gap-3 rounded-[4px] bg-[#2E3A41] border-[1px] border-[#5C666C]">
          <div className="min-h-8 justify-between items-center inline-flex">
            <div className="min-h-8 justify-start items-center gap-[11px] flex">
              <div className="w-5 h-5 relative">
                <img src={flash} alt="Flash" />
              </div>
              <div className="text-white text-lg font-medium font-['Roboto'] capitalize leading-loose">connect wallet </div>
            </div>
            <img src={cross} className="w-6 min-h-6 relative" onClick={setOpenWallet != null ? () => setOpenWallet(false)
              : () => navigate("/")} />
          </div>
          <div className="w-full h-[1px] bg-[#5C666C]"></div>
          <div className="gap-[25px_12px] grid grid-cols-3 xxs:grid-cols-4">
            {
              wallet.map((item, key) => <Link to={"/home"} key={key} className="w-[60px] max-w-full min-h-[60px] flex-col justify-between items-center gap-[5px] inline-flex">
                <div className="w-[35px] min-h-[35px] relative">
                  <img src={item.icon} alt="" />
                </div>
                <div className="text-white text-center uppercase text-xs font-normal font-['Roboto'] leading-tight">{item.name}</div>
              </Link>)

            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Wallet;