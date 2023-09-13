import React from 'react'
import '@/designs/dashboard.css'
import Image from 'next/image';
import dragonTiger from '@/images/dashboard-dragon-tiger-img.png'
import Link from 'next/link';
// import Nav from '@/components/Nav';
// import Header from '@/components/Header';
import Music from '@/components/Music';
import toast, { Toaster } from 'react-hot-toast';
import io from "socket.io-client";  
 

let socket;
const Dashboard = () => {
  return (
    <>
    {/* <Header /> */}
    <Music />
      <div id='dashboard'>
        {/* <Nav /> */}
        <center><h1 className='text-white'>Games Dashboard</h1></center>
        <section id='games-section'>
          <center> <h3>Dragon Tiger</h3></center>
          <Image src={dragonTiger} alt='dragon-img' />
          <Link href="dashboard/dragon-tiger" className='btn btn-info'  > Play Now </Link>
        </section>

      </div>
      <Toaster />
    </>
  )
}

export default Dashboard