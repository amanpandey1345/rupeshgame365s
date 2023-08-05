"use client";
// import Header from '@/components/Header'
// import Nav from '@/components/Nav'
import '@/designs/service-center.css'
import '@/designs/dashboard.css'
import Link from 'next/link'
import { useState } from 'react';
import useSWR from "swr";

const Transactions = () => {
  const [show, setShow] = useState(false)
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(`/api/auth/me`, fetcher);

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
<>
        <div className="cardt">
          UTR id:
          DMobile
          DPaymentMethod
          DAmount
          DStatusDTranscationDateTime
        </div>
        </>

}
{
  !show &&

        <div className="cardt">
          UTR id:
          WMobile
          WPaymentMethod
          WAmount
          WStatusDTranscationDateTime

        </div>

}
        </div>
      </div>
      {/* api/deposit Get  */}
      {/* api/withdraw Get  */}
    </>
  )
}

export default Transactions