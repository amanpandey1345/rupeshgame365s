"use client";
import '@/designs/service-center.css'
import useSWR from "swr";
const page = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(`/api/auth/me`, fetcher);
 
  return ( 
    <>
     <div id='my-profile'>
        <center><h3 className='text-red-700'> My Balance</h3> <br />
        <h3>₹ {data?.me?.balance}</h3>
        </center>
        {/* /api/auth/me GET  */}
      </div>
    </>
  )
}

export default page