"use client"
import { ethers } from 'ethers';
import { useEffect,useState } from 'react';
import axios from 'axios';

import Link from 'next/link'
import convertWeiToEther from '../weitoether'
import nftMarketPlace from '../artifacts/contracts/MarketPlace.sol/NFTmarketPlace.json'
export default function MyAssets(){
    const [nfts, setNfts] = useState([]);
    const [price,setprice]=useState();
    const [Contract,setContract]= useState(null);

    useEffect(()=>{
      fetchItems()
    },[]);

  const fetchItems = async () => {
    try {
      if (typeof window !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          '0x2418954577079120B3D1353DFe8a47B5253BE82f',
          nftMarketPlace.abi,
          signer
        );
        setContract(contract);
      
        const data = await contract.fetchMyNFTs();
        await data.wait;
        
        const items = await Promise.all(data.map(async i => {
        const tokenuri = await contract.tokenURI(i.tokenid);
        const metaresponse = await axios.get(tokenuri);
        let item = {
        tokenid: i.tokenid.toString(),
        owner: i.owner,
        seller: i.seller,
        Price: convertWeiToEther(i.Price.toString()),
        name: metaresponse.data.name,
        sold: i.sold,
        image : metaresponse.data.image
            
          };
        
          return item;
        }));
      
          setNfts(items);
          
        }}catch(error){
          console.log(error);
          }
        }
      

        async function createsale(tokenid,price){
  
      if (typeof window !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          '0x2418954577079120B3D1353DFe8a47B5253BE82f',
          nftMarketPlace.abi,
          signer
        );
        const listingprice = await Contract.getListingprice();
        await listingprice.wait;
        const value = listingprice.toString();
        const priceInWei = ethers.utils.parseUnits(price, 'ether');
        console.log(priceInWei);
        const sale = await Contract.resellToken(tokenid,priceInWei,{value:value,gasLimit:400000});
        await sale.wait;
      
       }}
      
      
       return (
        <div className='bg-gradient-to-bl  p-11    from-[PURPLE] via-[#534d4d] to-[#5e5656] min-h-[200vh] '>
          <style jsx>{`
          .text2 {
            text-shadow:2px 2px 2px #dca679;
            transition : transform 0.5s  ease-in-out;
          }
          .text2:hover{
            transform:translate(0%,20%);
          }
          .box {
            border: 1px solid #e5abe5;
            transiton :border 0.5s ease-in-out;
           
        
          }
          .box:hover{
            border :1px solid black;
            transition border linear 0.3s ease-in-out;
          }
          .box1 {
            background:#ddacc9;
            transiton :background 0.5s ease-in-out;
           
        
          }
          .box1:hover{
           background :gray;
            transition: background linear 0.3s ease-in-out;
          }
          `}</style>
        <h1 className=' text text-xl  bg-gradient-to-r  from-[#d0cece] via-[purple] to-green-300 text-transparent bg-clip-text  font-semibold ' >OWNED NFTs</h1>
        <div className='  lg:-mt-5 sm:mt-2 md:-mt-4 flex    text-xs  lg:float-end gap-8 md:float-end   sm:float-start  ' >
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
     
        <Link href="/dashboard">
         <nav className='text2  text-md text-white button-link  '>
          Dashboard
        </nav>
       </Link>
        <Link  href="/createToken">
          <nav className="text2 text-md  text-white gap-x-1.5  ">
            MintTokens
          </nav>
        </Link>
     
   
        </div>
        <div className='my-9   m-4 gap-7  grid sm:grid-cols-3  lg:grid-cols-5    '>
     
        {
          nfts.map((nft,i) => (
            <div key={i} >
              <img className='w-44 h-44 border overflow-hidden rounded-xl' src={nft.image}></img>
              <p className=' text-sm m-2 m text-gray-300 w-36 text-center'>
                <h1>{nft.tokenid}</h1>
              <h1 className='bg-black bg-opacity-30 rounded-md'>{nft.name} </h1>
              <h2 className='bg-black bg-opacity-30 rounded-md'>price: {nft.Price}eth</h2>
              </p>
              
             <input 
             className='rounded-xl text-sm w-44 h-8 my-1  bg-transparent box  text-center'
             type='number'
             value={[i].price} 
             placeholder='price in ether'
             onChange={(e)=>setprice(e.target.value)}
             />
              <button className=' box1 text-sm  h-8 w-44  text-center rounded-xl border ' onClick={() => createsale(nft.tokenid,price)}>
              Resell Token
            </button>
            
            </div>
          ))}
        
     </div>
    </div>
      
    )
          
   }
