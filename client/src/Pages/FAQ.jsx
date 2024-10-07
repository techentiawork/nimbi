import React from 'react'
import { Accordion, Footer, Navbar } from '../components'

export default function FAQ() {

    
  const handleClick =(id)=>{

    if( document.querySelector(`#${id}`).classList.contains('active'))
        document.querySelector(`#${id}`).classList.remove('active')
    else{
      const activeAccordions = document.querySelectorAll('.accordion.active')
      activeAccordions.forEach(acc=>{
        acc.classList.remove('active')
      }) 
  
      document.querySelector(`#${id}`).classList.add('active')
    }
  }
  
    return (
        <div className="h-full min-h-screen flex flex-col">
            <Navbar />
            <div className="lg:w-[80%] 3xl:w-[1504px] w-full px-4 max-w-full mx-auto ">
                <div className="flex flex-col gap-12 w-full capitalize py-16 bg-[url('./assets/mountain.png')] bg-contain bg-left-bottom bg-no-repeat font-['Inter',sans-serif]">

                    <div className="w-full border-b border-b-[#c4c0c8] py-6 font-['Roboto',sans-serif]">
                        <p className='uppercase text-[40px] font-semibold text-left py-3'>frequently asked questions</p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Accordion handleClick={handleClick} id='presale' ques="What is a pre-sale?" ans="A crypto presale, or token presale, is an event where tokens are sold before they are made available to the general public through an Initial Coin Offering (ICO) or other crowdfunding methods. This stage offers early backers a chance to buy tokens at a lower price, with the expectation that the value will increase once the cryptocurrency launches publicly." />
                        <Accordion handleClick={handleClick} id='erc' ques="What is erc-404" ans={`ERC-404 is a contract template designed to facilitate transactions involving both ERC-721 and ERC-20 tokens.2 It aims to introduce "semi-fungibility" by bundling interchangeable ERC-20 tokens with unique ERC-721 NFTs.1 ERC-404 combines the features of both to create semi-fungible tokens, enabling fractional ownership of NFTs and combining ERC-20 and ERC-721 concepts.`} />
                        <Accordion handleClick={handleClick} id='ecosystem' ques="What is the nimbi ecosystem?" ans="This is the wolfpack nimbi has built for us all to help support him and his mission to keep everything decentralized. join his wolfpack and support his mission." />
                        <Accordion handleClick={handleClick} id='claim' ques="How do I claim my tokens?" ans="Once the presale ends, connect your wallet and press the claim button." />
                        <Accordion handleClick={handleClick} id='decentralisation' ques="Why is decentralization in cryptocurrency so important?" ans="Decentralization is important as it ensures the integrity and security of the blockchain network and aligns with the principles of transparency, trust, and peer-to-peer transactions that cryptocurrencies aim to achieve.2 Blockchain technology is used to increase security and anonymity, as transactions are protected by elaborate mathematical procedures, making them difficult to hack." />
                        <Accordion handleClick={handleClick} id='converter' ques="What is Crypto Dust Converter?" ans="With CDC, you can finally say goodbye to those pesky leftovers in your wallet. Convert your crypto dust into the Nimbi ecosystem and unleash a world of possibilities!" />
                        <Accordion handleClick={handleClick} id='lottery' ques="What is the Crypto Lottery?" ans="Everything is open source and transparent with Crypto Lotto!" />
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}
