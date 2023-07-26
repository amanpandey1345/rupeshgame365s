"use client";
import '@/designs/form.css'
import Link from 'next/link'
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
const ForgetPassword = () => {
  const [error, setError] = useState(null);

  const router = useRouter();
  const session = useSession();


  if (session.status === "authenticated") {
    
    redirect("/")
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;

    console.log(email);

    try {
      const res = await fetch("/api/auth/forgetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
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

      <div id='register-fom'>
      {session?.data ? <>
      <center>
        Loading...
      </center>
      </>:<>
        <form  onSubmit={handleSubmit}>
          <h1> Forget an Account Password</h1>
          <label htmlFor="email"> Email <b style={{color:"red"}}>*</b></label> <br />
          <input type="email" name="email" id="email" placeholder='enter your email' autoComplete='off' required /> <br />
           <center><input type="submit" value="submit" /></center>
        </form>
        <div  style={{color:"red"}}  >

        {error && `${error}`} 
        </div>

        <p>Already have an account / <Link href="/login"> Login </Link> </p> 
        </>}
      </div>
    </>  
  )
}

export default ForgetPassword