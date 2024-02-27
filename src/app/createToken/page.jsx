"use client"
import axios from 'axios';
import Link from 'next/link';
import {ethers} from  'ethers';
const pinataApiKey = 'd4c26a9dc9a62da46f58';
const pinataSecretApiKey = '109341213b6955697c8e39f261afd5cb10b1358fe65b92d87003e960f877bc95';

import nftMarketPlace from '../artifacts/contracts/MarketPlace.sol/NFTmarketPlace.json'
import { useState} from "react";


const createToken =()=>{
   
        const [imageuri , setimageuri] = useState('');
        const [Name, setname] = useState("");
        const [description , setdescription] = useState("");
        const [price , setprice] = useState();

        const handleImageChange = async(e) => {
        const file=e.target.files[0]
      
        try {
        const formData = new FormData();
        formData.append('file', file);
      
          
      
        const response = await axios.post(
              'https://api.pinata.cloud/pinning/pinFileToIPFS',
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'pinata_api_key': pinataApiKey,
                  'pinata_secret_api_key': pinataSecretApiKey,
                },
              }
            );
          setimageuri(`https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`);
            // return response.data.IpfsHash;
          }catch (error) {
            console.error('Error pinning image to Pinata:', error,error.message,error.resposne);
          }
        };
      

     

async function uploadfile(){
        if (typeof window !== 'undefined') {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            '0x2418954577079120B3D1353DFe8a47B5253BE82f',
            nftMarketPlace.abi,
            signer
          );
          
        
         try{
         const jsonData = {
            name:  Name,
            description: description,
            image: imageuri, // Now it uses the updated imageuri
          };
         
          const jsondata = JSON.stringify(jsonData,null,2)
          const response= await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS",jsondata,
          {
            headers: {
              'Content-Type': 'application/json',
              'pinata_api_key': pinataApiKey,
              'pinata_secret_api_key': pinataSecretApiKey,
            },
          });


           const listingprice = await contract.getListingprice();
           await listingprice.wait;
            
           const value = listingprice.toString();
           const weiAmount = ethers.utils.parseEther(price);
           const NFTprice = weiAmount.toString();

           const data = await contract.createToken(`https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`,NFTprice,{
           value:value
          });

          await data.wait;

          }catch (error) {
              if (error.reason) {
                console.error('Revert Reason:', error.reason);
              } else {
                console.error('Error:', error.message, error.data, error.response);
              }
            }
  }





}
    return(
        <div className='   p-9 bg-gradient-to-br    from-[PURPLE] via-[#534d4d] to-[#5e5656] min-h-[200vh]'>
           
           <p className='text  text-xl  bg-gradient-to-r  from-[#d0cece] via-[purple] to-green-300 text-transparent bg-clip-text  font-semibold ' >
      
        MINT NFTS
        </p>
    
        <div className='  lg:-mt-5 sm:mt-2 md:-mt-4 flex    text-xs  lg:float-end gap-8 md:float-end   sm:float-start  ' >
        <Link  href="/">
          <nav className=" text2 text-md  text-white  mx-2  ">
           home
            
          </nav>
        </Link>

        <Link  href="/CreateSale">
          <nav className=" text2 text-md text-white">
            CreateSale
          </nav>
        </Link>
        
        <Link href="/dashboard">
           <nav className=' text2  text-md text-white button-link  '>
            
            Dashboard
          </nav>
        </Link>
        <Link  href="/MyNFTs">
          <nav className=" text-md  text2  text-white gap-x-1.5  ">
            MyNFTs
          </nav>
        </Link>
       
     
        </div>
        <style jsx>{`
        .text {
          text-shadow:1px 2px 2px #dca679;
        }
        .text2 {
          text-shadow:2px 2px 2px #dca679;
          transition : transform 0.6s  ease-in-out;
        }
        .text2:hover{
          transform:translate(0%,20%);
        }
        
        .color{
            -webkit-text-fill-color:color-mix(in srgb, 10% red,80% white);
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
                 transition: border 5s infinite  ease-in-out;
               }
               .box{
                border:1px solid #fff ;
               }
               .box:hover {
                border:1px solid white; /* Change border color on hover */
              }
              
               .box3 {
               
                background:lightgray;
                -webkit-text-fill-color:black;/* Change border color on hover */
              }
              .box3:hover{
                border:1px solid black;
                background:#59988d;
                transition: background linear 0.9s ease-in-out
               }
              .box1{
                background: ;
                transition: background 5s infinite  ease-in-out;
               }
               .box1:hover {
                background:gray;
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
      <div className='floating-box  p-9  bg-gradient-to-bl from-zinc-500  py-8     flex flex-col ' >    
            <input className=' box text-center bg-[#c5b9b9]   text-sm rounded-2xl h-16   mt-6  w-44' type="text" placeholder='name' value={Name} onChange={(e)=>setname(e.target.value)}  />
            <input className='text-center box bg-[#c5b9b9] text-sm rounded-2xl h-16 m-3  w-44 ' type="text" placeholder='description' value={description} onChange={(e)=>setdescription(e.target.value)}  />
            <input className='  m-2 box h-16 text-sm bg-[#c5b9b9] rounded-3xl text-center'  type='file'   onChange={handleImageChange}  style={{padding:'10px' ,paddingLeft:'80px'}} />
            <input className=' rounded-2xl bg-[#c5b9b9] box h-16 m-2  w-44 text-center ' type='number' value={price} placeholder='price in ether' onChange={(e)=>setprice(e.target.value)} />
            <button  className=' w-52 bg-[#190319] bg-opacity-50 my-1 box3 h-24  text-gray-50 rounded-3xl' onClick={uploadfile} > Generate Token</button>
             </div>
       </div>
      )
    
     } 
export default createToken;