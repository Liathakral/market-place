
"use client"
import { ethers } from 'ethers';
import Link from 'next/link'
import React,{ useState } from 'react';
import nftMarketPlace from '../artifacts/contracts/MarketPlace.sol/NFTmarketPlace.json';

export default function MarketSale() {
      const [tokenId,setTokenID] = useState();

      const connectToContract = async () => {
        try {
          await window.ethereum.request({method:"eth_requestAccounts"})
          if (typeof window !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract_instance = new ethers.Contract(
              '0x2418954577079120B3D1353DFe8a47B5253BE82f',
              nftMarketPlace.abi,
              signer
            );

            const data = await contract_instance.FetchMarketItems();
            const items = await Promise.all(data.map(async i => {
            const item = {
                tokenID: i.tokenid.toString(),
                price: i.Price.toString(),
              };
            return item;
            }));
            
            const selectedToken = items.find(item => item.tokenID === tokenId);
            
            if (selectedToken) {
              try {
                // ... (your existing connection code)
        
            const sell = await contract_instance.CreateMarketSale(tokenId, {
              value: selectedToken.price, // Convert price to ethers
              gasLimit: 400000,
            });
            await sell.wait();
            console.log(sell);
          } catch (error) {
            console.error('Error connecting to contract:', error);
          }
          
          };
          }
      
          }catch(error){
            console.log(error)
          }
          };

return(
  <div className='   p-9 bg-gradient-to-br    from-[PURPLE] via-[#534d4d] to-[#5e5656] min-h-[200vh]'>
        <p className='text  text-xl  bg-gradient-to-r  from-[#d0cece] via-[purple] to-green-300 text-transparent bg-clip-text  font-semibold ' >
PURCHASE NFT
</p>
<div className='  lg:-mt-5 sm:mt-2 md:-mt-4 flex    text-xs  lg:float-end gap-8 md:float-end   sm:float-start  ' >
<Link  href="/">
    <nav className="text2 text-md  text-white  mx-2  ">
     home
      
    </nav>
  </Link>

  <Link  href="/createToken">
    <nav className=" text2 text-md text-white">
      MintTokens
    </nav>
  </Link>
 
  <Link href="/dashboard">
     <nav className=' text2  text-md text-white button-link  '>
      
      Dashboard
    </nav>
  </Link>
  <Link  href="/MyNFTs">
    <nav className=" text-md text2  text-white gap-x-1.5  ">
      MyNFTs
    </nav>
  </Link>
 

  </div>
  <style jsx>{`
   .box {
    border: 1px solid #e5abe5;
    transiton :border 0.5s ease-in-out;
   

  }
  .box:hover{
    border :1px solid black;
    transition border linear 0.3s ease-in-out;
  }
  
  
  .text {
    text-shadow:1px 2px 2px #dca679;
  }
  .text2 {
    text-shadow:2px 2px 2px #dca679;
    transition : transform 0.5s  ease-in-out;
  }
  .text2:hover{
    transform:translate(0%,20%);
  }
  
      .floating-box{
          display:flex ;
          justify-content:center;
          align-items:center;
           width: 600px;
           height: 400px;
           
           position: absolute;
           top: 50%;
           left: 50%;
           transform: translate(-50%, -50%);
           border-radius: 12px;
           border:1px solid gray;
           transition:  border 5s infinite  ease-in-out;
         }
         
        .box1:{
      
          background:gray ;
         }
         .box1:hover {
    
          background:white; /* Change border color on hover */
        }
        
         @keyframes floatAnimation {
          from {
            transform: translate(-50%, -50%) translateY(0);
          }
          to {
            transform: translate(-50%, -50%) translateY(20px);
          }
        }
`}</style>
<div className='floating-box p-9  bg-gradient-to-bl from-zinc-500  py-8     flex flex-col ' >

 
     
      <input className='box rounded-2xl text-center text-sm  h-14   mt-6  w-44' type="number" placeholder='tokenid' value={tokenId} onChange={(e)=>setTokenID(e.target.value)}  />

      
    
      <button  className=' m-4  box1 text-sm  text-gray-400 rounded-xl  border-l-2 w-44 bg-opacity-50  font-THIN h-14 border border-1 border-gray-300 border-e-2' onClick={connectToContract} > Buy NFT</button>
      </div>
      

</div>
 
)

      }