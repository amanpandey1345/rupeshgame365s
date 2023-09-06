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
  const [amountT, setAmountT] = useState(0)
  const [betOn, setBetOn] = useState()
  const [amountTA, setAmountTA] = useState(0)
  const [amountD, setAmountD] = useState(0)
  
  const handleamount = (a) => {
    if (betOn ==="tiger"){
      setAmountT(amountT+a)
    }
    if (betOn ==="tie"){
      setAmountTA(amountTA+a)
    }
    if (betOn ==="dragon"){
      setAmountD(amountD+a)
    }
  }
  // const [error,setError] = useStart(null)
  const handleSubmit = async (e) => {
    e.preventDefault();

let data0={
success:null
}
let data1={
success:null
}
let data2={
success:null
}
          
    try {
      if (amountT){
      const res0 = await fetch("/api/bet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BetOn:"tiger",
          BetAmount:amountT
        }),
      })
data0 = await res0.json()
};
      if (amountD){
      const res1 = await fetch("/api/bet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BetOn:"dragon",
          BetAmount:amountD
        }),
      })
data1 = await res1.json()
};
      if (amountTA){
      const res2 = await fetch("/api/bet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BetOn:"tie",
          BetAmount:amountTA
        }),
      })
 data2 = await res2.json()
};

      
      
      
      if (data0?.success === true) {
        toast.success(data0?.message);
      }
      if (data0?.success === false) {
        toast.error(data0?.message);
      }
      if (data1?.success === true) {
        toast.success(data1?.message);
      }
      if (data1?.success === false) {
        toast.error(data1?.message);
      }
      if (data2?.success === true) {
        toast.success(data2?.message);
      }
      if (data2?.success === false) {
        toast.error(data2?.message);
      }

if (data0?.success === true || data1?.success === true || data2?.success === true) {
       
        mutate()
        router.push("/")
       

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

       
        <div id='dragon' onClick={()=>setBetOn("dragon")} >
          <h5>{amountD ?`₹ ${amountD}`:"₹ 000.00"}</h5>
          <Image src={dragon} width={100} height={100} alt='dragon-img' />
          <h4>Dragon</h4>
        </div>
        


        <div id='tie' onClick={()=>setBetOn("tie")} >
          <h5>{amountTA ?`₹ ${amountTA}`:"₹ 000.00"}</h5>
          <Image src={tie} width={100} height={100} alt='tie-img' />
          <h4>Tie</h4>
        </div>



        <div id='tiger' onClick={()=>setBetOn("tiger")} >
          <h5>{amountT ?`₹ ${amountT}`:"₹ 000.00"} </h5>
          <Image src={tiger} width={100} height={100} alt='tiger-img' />
          <h4>Tiger</h4>
        </div>

      </section>

      {
           
                  betOn  &&
 
     
      <section id='bet-coin'>
          <span onClick={()=>handleamount(10)}>10</span>
          <span onClick={()=>handleamount(20)}>20</span>
          <span onClick={()=>handleamount(50)}>50</span>
          <span onClick={()=>handleamount(100)}>100</span>
          <span onClick={()=>handleamount(200)}>200</span>
          <span onClick={()=>handleamount(500)}>500</span>
          <span onClick={()=>handleamount(1000)}>1000</span>
          <span onClick={()=>handleamount(2000)}>2000</span>
      </section>
           }
       
            <section id='bet-btn'>
            <span onClick={(e)=>handleSubmit(e)}>Bet</span>
       
        </section>
                 <Toaster />
    </>
  )
}

export default DragonTiger
