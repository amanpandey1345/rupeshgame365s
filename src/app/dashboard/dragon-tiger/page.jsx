"use client"

import React, { useState } from 'react'
import '@/designs/dragon-tiger.css'
import Results from '@/components/Results'
import Image from 'next/image'
import dragon from '@/images/dragon.png'
import Cardbg from '@/images/Cardbg.png' 
import tiger from '@/images/tiger.png'
import tie from '@/images/tie.png'
import Music from '@/components/Music'
import { redirect, useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import useSWR from "swr";

const DragonTiger = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { mutate} = useSWR(`/api/auth/me`, fetcher);
  const router = useRouter();
  const [amount, setAmount] = useState(0)
  const [betOn, setBetOn] = useState()
  // const [error,setError] = useStart(null)
  const handleSubmit = async (e) => {
    e.preventDefault();


    
    try {
      const res = await fetch("/api/bet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BetOn:betOn,
          BetAmount:amount
        }),
      });
      const data = await res.json()
      console.log(res);
      console.log(data);
      if (data.success === true) {
        // redirect("/")
        toast.success(data.message);
        mutate()
        router.push("/")
        // setloading(false);

      }
      if (data.success === false) {
        // setloading(false);
        console.log(data);
        // setError(data.message);
        toast.error(data.message);
      }
    } catch (err) {
      // setError(err.message);
      toast.error(err.message);
      // setloading(false);
      // console.log(err.message);
    }
  };
  
  return (
    <>
      {/* <Nav /> */}
      <Results />
      <Music />

      <div className="Inters">
        <div className="Tint">
          00:00
        </div>
        <div className="Cint">
          <Image src={Cardbg} width={100} height={100} alt="" className='Dragonint' />
          {/* <div className="Tieint"></div> */}
          <Image src={tie} width={100} height={100} alt="" className='Tieint'  />
          <Image src={Cardbg} width={100} height={100} alt="" className='Tigerint'/>
        </div>
      </div> 
      <section id='dragon-tiger'> 
        {
          betOn === "dragon" || !betOn ?
       
        <div id='dragon' onClick={()=>setBetOn("dragon")} >
          <h5>{amount ?`₹ ${amount}`:"₹ 000.00"}</h5>
          <Image src={dragon} width={100} height={100} alt='dragon-img' />
          <h4>Dragon</h4>
        </div>:null
        }

{
            betOn === "tie" || !betOn?
        <div id='tie' onClick={()=>setBetOn("tie")} >
          <h5>{amount ?`₹ ${amount}`:"₹ 000.00"}</h5>
          <Image src={tie} width={100} height={100} alt='tie-img' />
          <h4>Tie</h4>
        </div>:null
}

{
            betOn === "tiger" || !betOn ?
        <div id='tiger' onClick={()=>setBetOn("tiger")} >
          <h5>{amount ?`₹ ${amount}`:"₹ 000.00"} </h5>
          <Image src={tiger} width={100} height={100} alt='tiger-img' />
          <h4>Tiger</h4>
        </div>:null
}
      </section>
      {
        betOn && 

      <section id='bet-coin'>
          <span onClick={()=>setAmount(amount+10)}>10</span>
          <span onClick={()=>setAmount(amount+20)}>20</span>
          <span onClick={()=>setAmount(amount+50)}>50</span>
          <span onClick={()=>setAmount(amount+100)}>100</span>
          <span onClick={()=>setAmount(amount+200)}>200</span>
          <span onClick={()=>setAmount(amount+500)}>500</span>
          <span onClick={()=>setAmount(amount+1000)}>1000</span>
          <span onClick={()=>setAmount(amount+2000)}>2000</span>
      </section>
      }
      {
        betOn && 
            <section id='bet-btn'>
            <span onClick={(e)=>handleSubmit(e)}>Bet</span>
       
        </section>
            }
                 <Toaster />
    </>
  )
}

export default DragonTiger