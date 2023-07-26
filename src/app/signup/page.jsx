"use client";
import '@/designs/form.css'
import Link from 'next/link'
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
const Signup = () => {
  const [error, setError] = useState(null);

  const router = useRouter();
  const session = useSession();


  if (session.status === "authenticated") {
    
    redirect("/")
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const mobile = e.target[2].value;
    const password = e.target[3].value;
    console.log(name,email,mobile,password);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          mobile,
          password,
        }),
      });
      const data = await res.json()
      console.log(res);
      if (data.success === true) {

        // setloading(false);
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
          <h1> Create an Account </h1>
          <label htmlFor="usename"> Username <b style={{color:"red"}}>*</b></label> <br />
          <input type="username" name="username" id="username" placeholder='enter your username' autoComplete='off' required /> <br />

          <label htmlFor="email"> Email <b style={{color:"red"}}>*</b></label> <br />
          <input type="email" name="email" id="email" placeholder='enter your email' autoComplete='off' required /> <br />
          <label htmlFor="mobile"> Mobile <b style={{color:"red"}}>*</b></label> <br />
          <input type="tel" name="mobile" id="mobile" placeholder='enter your Mobile No' autoComplete='off' required /> <br />

          <label htmlFor="password"> Password <b style={{color:"red"}}>*</b></label> <br />
          <input type="password" name="password" id="password" placeholder='enter your password' autoComplete='off' required /> <br />

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

export default Signup