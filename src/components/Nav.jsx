'use client'
 
import { usePathname } from 'next/navigation'
import React from 'react'
import '@/designs/dashboard.css'
import { BsCashCoin } from "react-icons/bs";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import Link from 'next/link';
import {useSession} from "next-auth/react";
import useSWR from "swr";


const Nav = () => {
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const { data, mutate, error, isLoading } = useSWR(`/api/auth/me`, fetcher);
    const pathname = usePathname()
    const session = useSession()
    const fpturl = "/forgetpassword"
    const fpt = pathname.slice(fpturl.length+1)
    const fpturl1 = "/controlroom"
    const fpt1 = pathname.slice(fpturl1.length+1)
console.log(data);
    const paths = ["/signup","/login","/forgetpassword",`/forgetpassword/${fpt}`,"/controlroom",`/controlroom/${fpt1}`]
    return (
        <> 
        {
          !paths.includes(pathname)?  
          <section id='top-section'>
                <div id='balance'> <Link style={{textDecoration: "none", color:"white"}} href="/balance"><MdOutlineAccountBalanceWallet className='icon' />{data?.me ? `₹ ${data?.me.balance}` : "loading..." } </Link> </div>
                <div id='account'> <Link style={{textDecoration: "none", color:"white"}} href="/myprofile"> <MdAccountCircle className='icon' />  {session?.data?.user ? session?.data?.user.name : "loading..." } </Link> </div>
                <div id='withdrawal'> <Link style={{textDecoration: "none", color:"white"}} href="/withdraw"> <BiMoneyWithdraw className='icon' />  Withdraw </Link> </div>
                <div id='deposite'> <Link style={{textDecoration: "none", color:"white"}} href="/addcash"> <BsCashCoin className='icon' />  Add Cash </Link> </div>
            </section>:null
            }
        </>
    )
}

export default Nav