"use client"
import { ethers } from 'ethers';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Link from 'next/link'
import nftMarketPlace from '../artifacts/contracts/MarketPlace.sol/NFTmarketPlace.json'

export default function MyAssets(){
        const [nfts, setNfts] = useState([]);
        const [image,setimage] = useState('');
          useEffect(() => {
            loadNFTs()
          }, [])
        async function loadNFTs() {

 
    
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          '0x2418954577079120B3D1353DFe8a47B5253BE82f',
          nftMarketPlace.abi,
          signer
        );
        function convertWeiToEther(weiAmount, decimals = 18) {
          // Convert Wei to Ether using ethers.utils.formatUnits
          const etherAmount = ethers.utils.formatUnits(weiAmount, decimals);
          return etherAmount;
        }
        
        const data = await contract.FetchMarketItems();
        const items = await Promise.all(data.map(async i =>{
          
       
        const tokenuri = await contract.tokenURI(i.tokenid.toString());
        const meta = await axios.get(tokenuri);
           
        const item = {
            tokenid: i.tokenid.toString(),
            Price :convertWeiToEther(i.Price.toString()),
            owner : i.owner,
            seller:i.seller,
            image: meta.data.image,
            name: meta.data.name,
            metadata:tokenuri 
            }
           
            return item;
      }))
            setNfts(items);
          
          }
          
            return (
              <div className='bg-gradient-to-bl  p-11    from-[PURPLE] via-[#534d4d] to-[#5e5656] min-h-[1000vh] '>
                <style jsx>{`
                .box {
                  background:
                  tranistion :background 0.2s ease-in-out;
                }
                .box:hover{
                  background:darkgray;
                  -webkit-text-fill-color:black;
                  
                }
                .imgg{
                  transition:transform 0.8s ease-in-out;
                }
                .imgg:hover{
                  transform:translate(0%,-2%);
                }
                .text2 {
                  text-shadow:2px 2px 2px #dca679;
                  transition : transform 10s  ease-in-out;
                }
                .text2:hover{
                  transform:translate(0%,20%);
                }
                `}</style>
                <h1 className=' text text-xl  bg-gradient-to-r  from-[#d0cece] via-[purple] to-green-300 text-transparent bg-clip-text  font-semibold ' >NFT GALLERY</h1>
                <div className='  flex lg:-mt-5 sm:mt-2 md:-mt-4    text-xs  lg:float-end gap-8 md:float-end   sm:float-start  ' >
          <Link  href="/">
                <nav className="text2 text-md  text-white  mx-2  ">
                home
                  
                </nav>
              </Link>

              <Link  href="/CreateSale">
                <nav className="text2 text-md text-white">
                  CreateSale
                </nav>
              </Link>
              <Link href="/MyNFTs">
                <nav className="text-md text2 text-white button-link ">
                  ResellNFT
                </nav>
              </Link>
              <Link href="/createToken">
                <nav className=' text2 text-md text-white button-link  '>
                  
                MintTokens
                </nav>
              </Link>
              
          
              </div>
              <div className='my-9   m-4 gap-7  grid sm:grid-cols-3  lg:grid-cols-5 overflow-hidden    '>
            
                {
                  nfts.map((nft, i) => (
                    <div  key={i} >
                      <img className=' imgg border sm:w-44 sm:h-[27vh] rounded-xl  lg:h-44 lg:w-44 md:w-48 md:h-48' src={nft.image}></img>
                      <p className=' imgg my-2 lg:w-44 sm:w-44 md:w-48  sm:text-[2vh] md:text-2xl  md:text-[8px]  text-center bg-gradient-to-l from-[#818f81] via-[#8ca08c] to-[#976f97]   rounded-lg '>
                      
                      <h2 className= '  rounded-lg text-center bg-black bg-opacity-30' >name: {nft.name} id: {nft.tokenid} </h2>
                    
                      <h2>Price: {nft.Price.toString()}ther</h2>
        
                      </p>
                      <h2 className=' text-xs  box border rounded-lg py-1.5  bg-gradient-to-r from-[#624b4b] via-[#695769]  text-gray-300  '  style={{overflow:'auto',scroll,height:'50px'}}>Metadata: {nft.metadata}</h2>
                    </div>
                  ))
                }
              
        </div>
            </div>
              
            )
          
              }
        //border rounded-xl w-44 lg:h-[30vh]  md:h-[25vh] sm:h-[26vh] sm:w-16   min-h-20