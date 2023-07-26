"use client";
// import Header from '@/components/Header'
// import Nav from '@/components/Nav'
import '@/designs/form.css'
import Link from 'next/link'
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
const Withdraw = () => {

  const [error, setError] = useState(null);

  const router = useRouter();
  const session = useSession();


  // if (session.status === "authenticated") {
    
  //   redirect("/")
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const WPaymentMethod = e.target[0].value;
    const WMobile = e.target[1].value;
    const WAmount = e.target[2].value;

    // console.log(email);

    try {
      const res = await fetch("/api/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          WPaymentMethod,WMobile,WAmount
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
          <h1> Withdrawal Request </h1>

          {/* <label htmlFor="tel"> Account Holder Name <b style={{color:"red"}}>*</b> </label> <br />
          <input type="text" name="holder-name" id="holder-name" placeholder='Vikram Singh' /> <br />

          <label htmlFor="tel"> Account Number <b style={{color:"red"}}>*</b> </label> <br />
          <input type="text" name="account-number" id="account-number" placeholder='8578548956854' /> <br />

          <label htmlFor="text"> IFSC Code <b style={{color:"red"}}>*</b> </label> <br />
          <input type="text" name="ifsc" id="ifsc" placeholder='SBIN0001308' /> <br /> */}
          
          <label htmlFor="Payment"> Withdrawal Methods <b style={{color:"red"}}>*</b> </label> <br />
          <select id="Payment">
          
            <option value="Phone pe" selected>Phone pe</option>
            <option value="Google pay">Google pay</option>
            <option value="paytm">paytm</option>
          </select>
          {/* <input type="text" name="Payment" id="Payment" placeholder='Phone pe / Google pay / paytm' /> <br /> */}
          <label htmlFor="Mobile"> Mobile Number /UPI ID <b style={{color:"red"}}>*</b> </label> <br />
          <input type="tel" name="Payment" id="Mobile" placeholder='7895684585 / 7895684585@ybl' /> <br />

          <label htmlFor="Withdraw"> Withdraw Amounts <b style={{color:"red"}}>*</b> </label> <br />
          <input type="number" name="Withdraw" id="Withdraw" placeholder='1000' /> <br />

          <center><input type="submit" value="Withdraw" /></center>
        </form>
        <div  style={{color:"red"}}  >{error && `${error}`} </div>

      </div>
    </>
  )
}

export default Withdraw