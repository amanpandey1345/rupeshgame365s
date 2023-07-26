'use client'
 
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import {useSession ,signOut} from "next-auth/react";
const Header = () => {
    const [show, setShow] = useState(false)
    const pathname = usePathname()
    const session = useSession()
    const fpturl = "/forgetpassword"
    const fpt = pathname.slice(fpturl.length+1)
    const paths = ["/login","/dashboard/dragon-tiger","/signup","/forgetpassword",`/forgetpassword/${fpt}`]
console.log(session);
console.log(session?.data?.user?.role);
    return (
        <>
        {
            !paths.includes(pathname)?  
            
            <header >
            <nav id='navbar-computer'>

                <ul>
               {session &&  session?.data?.user?.role === "admin" &&  <li> <Link href='/controlroom'> Control Room </Link> </li>}
                    <li> <Link href='/dashboard'> Dashboard  </Link> </li>
                    <li> <Link href='/transactions'> Transactions  </Link> </li>
                    <li> <Link href='/service-center'> Service Center </Link> </li>
                    <li> <Link href='/policy'> Policy </Link> </li>
                    <li> <Link href='#' onClick={signOut}> Logout  </Link> </li>
                </ul>
            </nav>

            <nav id='navbar-mobile'>

                <div id='icon-back'>
                    <span id="icon" onClick={() => setShow(!show)} > <AiOutlineMenu /> </span>
                </div>

                {
                    show &&
                    <div id='mobile-menu' onClick={() => setShow(!show)}>
                            <ul>
                            {session &&  session?.data?.user?.role === "admin" &&  <li> <Link href='/controlroom'> Control Room </Link> </li>}
                                <li > <Link  href='/dashboard'> Dashboard  </Link> </li>
                                <li > <Link  href='/transactions'> Transactions  </Link> </li>
                                <li > <Link  href='/service-center'> Service Center </Link> </li>
                                <li > <Link  href='/policy'> Policy </Link> </li>
                                <li > <Link  href='#' onClick={signOut}> Logout  </Link> </li>
                            </ul>
                        </div> 
                }
            </nav>

        </header>



:null}
     </>
    )
}

export default Header