"use client";
import '@/designs/form.css'
import Link from 'next/link'
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
const ChangePassword = ({ params }) => {
    const {token} = params
  const [error, setError] = useState(null);

  const router = useRouter();
  const session = useSession();


  if (session.status === "authenticated") {
    
    redirect("/")
  }
  const handleSubmit = async (e) => {
    e.preventDefault();


    const password = e.target[0].value;
    const cpassword = e.target[1].value;


    try {
      const res = await fetch(`/api/auth/forgetpassword/${token}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          cpassword,
        }),
      });
      const data = await res.json()
      console.log(res);
      console.log(data);
      if (data.success === true) {

        // setloading(false);
        setError(data.message);
        router.push("/login");
      }
      if (data.success === false) {
        // setloading(false);
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
          <h1> Change an Account Password </h1>
          <label htmlFor="password"> Password <b style={{color:"red"}}>*</b></label> <br />
          <input type="password" name="password" id="password" placeholder='enter your password' autoComplete='off' required /> <br />
          <label htmlFor="password"> Confirm Password <b style={{color:"red"}}>*</b></label> <br />
          <input type="password" name="password" id="password" placeholder='enter your confirm password' autoComplete='off' required /> <br />

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

export default ChangePassword