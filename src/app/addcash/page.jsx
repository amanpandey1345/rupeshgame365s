"use client";
// import Header from '@/components/Header'
// import Nav from '@/components/Nav'
// import Link from 'next/link'
import '@/designs/form.css'
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const AddCash = () => {
  const [error, setError] = useState(null);

  const router = useRouter();
  const session = useSession();


  // if (session.status === "authenticated") {
    
  //   redirect("/")
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const DUTRid = e.target[0].value;
    const DPaymentMethod = e.target[1].value;
    const DMobile = e.target[2].value;
    const DAmount = e.target[3].value;
    const DTranscationDateTime = e.target[4].value;



    try {
      const res = await fetch("/api/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          DMobile,DAmount,DPaymentMethod,DUTRid, DTranscationDateTime
        }),
      });
      const data = await res.json()
      console.log(res);
      console.log(data);
      if (data.success === true) {

        // setloading(false);
        setError(data.message);
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
          <h1> Deposite Request </h1>
          <label htmlFor="transcation"> Transcation UTR ID <b style={{color:"red"}}>*</b> </label> <br />
          <input type="text" name="transcation" id="transcation" placeholder='UTR - 310682908954' /> <br />

          <label htmlFor="Payment"> Payment Methods <b style={{color:"red"}}>*</b> </label> <br />
          <select id="Payment">
          
          <option value="Phone pe" selected>Phone pe</option>
          <option value="Google pay">Google pay</option>
          <option value="paytm">paytm</option>
        </select>
          {/* <input type="text" name="Payment" id="Payment" placeholder='Phone pe / Google pay / paytm' /> <br /> */}
          <label htmlFor="Mobile"> Mobile No <b style={{color:"red"}}>*</b> </label> <br />
          <input type="tel" name="Deposit" id="Mobile" placeholder='9754862454' /> <br />

          <label htmlFor="Amount"> Deposit Amounts <b style={{color:"red"}}>*</b> </label> <br />
          <input type="number" name="Deposit" id="Amount" placeholder='5000' /> <br />
          <label htmlFor="DATA_Time"> Transcation Date/Time <b style={{color:"red"}}>*</b> </label> <br />
          <input type="datetime-local" name="Deposit" id="DATA_Time" placeholder='5000' /> <br />

          <center><input type="submit" value="Deposit" /></center>
        </form>
        <div  style={{color:"red"}}  >{error && `${error}`} </div>

      </div>
    </>
  )
}

export default AddCash