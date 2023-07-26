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


const RoomNav = () => {
    const pathname = usePathname()
    const session = useSession()
    const fpturl = "/controlroom"
    const fpt = pathname.slice(fpturl.length+1)


    const paths = ["/controlroom",`/controlroom/${fpt}`]
    return (
        <> 
        {
          paths.includes(pathname)?  
          <section id='top-section'>
                <div id='balance'> <Link style={{textDecoration: "none", color:"white"}} href="/controlroom/balancecontrol"><MdOutlineAccountBalanceWallet className='icon' /> ₹ 50.00 </Link> </div>
                <div id='account'> <Link style={{textDecoration: "none", color:"white"}} href="/controlroom/myprofile"> <MdAccountCircle className='icon' />  {session?.data?.user ? session?.data?.user.name : "loading..." } </Link> </div>
                <div id='withdrawal'> <Link style={{textDecoration: "none", color:"white"}} href="/controlroom/withdrawcontrol"> <BiMoneyWithdraw className='icon' />  Withdraw Control</Link> </div>
                <div id='deposite'> <Link style={{textDecoration: "none", color:"white"}} href="/controlroom/addcashcontrol"> <BsCashCoin className='icon' />  Add Cash Control </Link> </div>
            </section>:null
            }
        </>
    )
}

export default RoomNav