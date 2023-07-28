"use client";
// import Header from '@/components/Header'
// import Nav from '@/components/Nav'
// import Link from 'next/link'
import '@/designs/form.css'
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import useSWR from "swr";
const WithdrawCD = ({rowdata, mutateW,setDup}) => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const {  mutate} = useSWR(`/api/deposit/controldeposit`, fetcher);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  const [ds, setDs] = useState(rowdata?.WStatus);
console.log(ds);
  const router = useRouter();
  const session = useSession();
  


  // if (session.status === "authenticated") {
    
  //   redirect("/")
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const WStatus = ds
    const id = rowdata?.id;
    const WUTRid =e.target[0].value;
    const WTranscationDateTime =e.target[1].value;

    try {
      const res = await fetch("/api/withdraw/controlwithdraw", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          WTranscationDateTime,WStatus,WUTRid,id
        }),
      });
      const data = await res.json()
      console.log(res);
      console.log(data);
      if (data.success === true) {

        // setloading(false);
        mutateW()
        mutate()
        setMsg(data.message);
        setDup(false)
      }
      if (data.success === false) {
        // setloading(false);
        console.log(data);
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
      // setloading(false);
      console.log(err.message);
    }
  };
  return (
    <>
      {/* <Header />
      <Nav /> */}
      <div id='register-fom' style={{ backgroundColor: "rgba(1, 44, 104, 0.39)" }}>
        <form  onSubmit={handleSubmit}>
          <h1> Withdrawl Update </h1>

          <label htmlFor="transcation"> Transcation UTR ID <b style={{color:"red"}}>*</b> </label> <br />
          <input type="text" name="transcation" id="transcation" placeholder='UTR - 310682908954' /> <br />

          <label htmlFor="DATA_Time"> Transcation Date/Time <b style={{color:"red"}}>*</b> </label> <br />
          <input type="datetime-local" name="Deposit" id="DATA_Time" placeholder='5000' /> <br />
         
          <label htmlFor="Payment"> Payment Status <b style={{color:"red"}}>*</b> </label> <br />
          <select id="Payment" value={ds} onChange={(e)=>setDs(e.target.value)}  >
          
          <option value="Successful">Successful</option>
          <option value="Pending" >Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>
         

          <center><input type="submit" value="Deposit" /></center>
        </form>
        <div  style={{color:"red"}}  >{error && `${error}`} </div>
        <div  style={{color:"green"}}  >{msg && `${msg}`} </div>

      </div>
    </>
  )
}

export default WithdrawCD