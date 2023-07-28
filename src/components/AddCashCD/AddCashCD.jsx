"use client";
// import Header from '@/components/Header'
// import Nav from '@/components/Nav'
// import Link from 'next/link'
import '@/designs/form.css'
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import useSWR from "swr";
const AddCashCD = ({rowdata, mutate,setDup}) => {

  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  const [ds, setDs] = useState(rowdata?.DStatus);
console.log(ds);
  const router = useRouter();
  const session = useSession();
  


  // if (session.status === "authenticated") {
    
  //   redirect("/")
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const DStatus = ds
    const id = rowdata?.id



    try {
      const res = await fetch("/api/deposit/controldeposit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          DStatus,id
        }),
      });
      const data = await res.json()
      console.log(res);
      console.log(data);
      if (data.success === true) {

        // setloading(false);
        
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
          <h1> Deposit Update </h1>
         
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

export default AddCashCD