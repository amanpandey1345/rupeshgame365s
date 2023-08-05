"use client";
import '@/designs/service-center.css'
import '@/designs/dashboard.css'
import Link from 'next/link'
import { useState } from 'react';

import WithdrawGET from '@/components/WithdrawGET/WithdrawGET';
import AddCashGET from '@/components/AddCashGET/AddCashGET';

const Transactions = () => {
  const [show, setShow] = useState(false)
 


  return (
    <>
    {/* <Header />
    <Nav /> */}
    <div id='transactions'>
    <section id='top-section'>
                <div id='balance' onClick={()=>setShow(false)}>Withdrawl </div>
                <div id='balance' onClick={()=>setShow(true)}> Deposit </div>

            </section>
            <div id='transactions'>
              <h2>{show ? "Deposit":"Withdrawl"}</h2>

{
  show &&

<AddCashGET/>
}
{
  !show &&

  <WithdrawGET/>

}
        </div>
      </div>

    </>
  )
}

export default Transactions