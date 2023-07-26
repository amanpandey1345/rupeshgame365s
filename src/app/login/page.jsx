"use client";
import Link from "next/link";

import "@/designs/form.css";
import { useRouter, redirect, useSearchParams } from "next/navigation";

import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); 
  const [url, setUrl] = useState("");
  const params = useSearchParams();
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    setUrl(params.get("callbackUrl"));
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);

  // console.log(url);

  if (session.status === "authenticated") {
    url ? redirect(url) : redirect("/");
  }

  // console.log(session);
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", {
      email,
      password,
    }); 
  };
  return (
    <div id="register-fom">
      {session?.data ? <>
      <center>
        Loading...
      </center>
      </>:<>
      <form onSubmit={handleSubmit}>
        <h1> Login </h1>
        <label htmlFor="email"> Email <b style={{color:"red"}}>*</b></label> <br />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="enter your email"
          // autoComplete="off"
        />{" "}
        <br />
        <label htmlFor="password"> Password <b style={{color:"red"}}>*</b></label> <br />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="enter your password"
          // autoComplete="off"
        />{" "}
        <br />
        <center>
          <input type="submit" value="submit" />
        </center>
      </form>
      <div className="text-red-700" style={{ color: "red" }}>
        {error && `${error}`}
      </div>

      <p>
        I don&apos;t have an account / <Link href="/signup"> Sign up </Link>{" "}
      </p>
      <p>
        Forget an account password / <Link href="/forgetpassword"> Forget Password </Link>
      </p>
      </>}
    </div>
  );
};

export default Login;
