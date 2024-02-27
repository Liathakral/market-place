'use client'
import './globals.css'
import Link from 'next/link'

export default  function Home() {
  return (

        <div className="p-3">
          <p className=' headline -mx-2  -mb-4   rounded-xl p-3 '>
          
            METAVERSE MARKETPLACE
            </p>
          <div className='flex  text-xs  lg:float-end gap-8 md:float-end  md:-my-7 sm:-my-7 sm:float-start  sm:mx-5 lg:-my-20'>
          
          <Link  href="/createToken">
      
            <p className=" hover:text-black button-link">
              MintTokens
              
            </p>
          </Link>

          <Link  href="/CreateSale">
            <p className="button-link ">
              CreateSale
            </p>
          </Link>
          
          <Link href="/dashboard">
             <p className='  button-link  '>
              
              Dashboard
            </p>
          </Link>
          <Link  href="/MyNFTs">
            <p className=" hover:text-black button-link">
              ResellNFT
            </p>
          </Link>
          
          </div>
          
          <style jsx>{`
          @media (min-width: 768px) and (max-width: 1023px) {
            .images-container {
              margin-top: 80px;
            }
          }
        `}</style>
  
          <div>
           
          <img className=' brightness-90 md:-my-14 rounded-2xl '
          src="https://i.pinimg.com/564x/80/e9/2d/80e92d74f8042167a84d32d843c9b8d6.jpg" // Replace this with the path to your image
          alt="Description of<img 1"
          width={200} // Adjust width and height as needed
          height={150}
          style={{ zIndex:4,position:'absolute' ,bottom:210,right:200}} 
        />
         
        
        <img className='mx-4 rounded-2xl brightness-90  '
          src="https://i.pinimg.com/564x/ce/20/fa/ce20fac103b88322c13253c34d7de801.jpg" // Replace this with the path to your image
          alt="Description of<img 1"
          width={190} // Adjust width and height as needed
          height={150}
          style={{ zIndex: 3,position:'absolute',top:120,right:200}} 
        />
         <img className=' justify-end  brightness-90 rounded-2xl'
          src="https://i.pinimg.com/564x/dc/1b/df/dc1bdfea1dc2ab2631d7e80dad7bf28a.jpg" 
          alt="Description of<img 1"
          width={200} // Adjust width and height as needed
          height={140}
          style={{ zIndex: 4,position:'absolute', top:190,right:40}} 
        />
        
         
        <img className=' justify-end brightness-90 rounded-2xl'
          src="https://i.pinimg.com/564x/77/ae/ec/77aeec9e49944d55533fb3ef491e2603.jpg" // Replace this with the path to your image
          alt="Description of<img 1"
          
          width={170} // Adjust width and height as needed
          height={50}
          style={{ zIndex: 1,position:'absolute',top:190,right:370}} 
        />
         
          </div>
          <div className=' my-16 mx-9'>
          <p className='text-white md:text-2xl font-bold lg:text-5xl'>
      
       <span className=' text-blue-300 font-medium'  style={{wordSpacing:'5px'}}>Discover </span>
           <span style={{wordSpacing:'5px'}}>  the  digital Art</span>
            </p>
            
            <p className= ' text-blue-300 m-15 md:text-2xl font-medium text-left lg:text-5xl' style={{wordSpacing:'5px'}}>
            <span className=' font-bold text-white ' style={{wordSpacing:'5px'}}>NFT </span>
           Market Place
            </p>
           <p className='mx-15 font-thin md:text-md text-zinc-300 text-lrft lg:text-sm'>Create, Sell And Discover </p>
           <p className='mx-15 font-thin md:text-md text-zinc-300 text-left lg:text-sm'>Rare Collections Of NFTs</p>
          </div>
                
        <style jsx>{`
          .button-link {
            color:white;
          
            
            font-weight: light;
            font-family: 'Lucida Sans', Arial, sans-serif;
            margin-right: 5px;
            &:hover {
              color: skyblue;

            
          }
          .Discover9 {
            font-family:'Comic Sans MS', cursive, sans-serif; 
          }
          .images-container {
            flex-direction: column;
            position: relative;
          }

          .mx-4 {
            margin-left: 1rem; /* Adjust margin as needed */
            margin-right: 1rem; /* Adjust margin as needed */
          }
          
          
          
        `}</style>
                </div>

        
          )
        }
