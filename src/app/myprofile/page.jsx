"use client"
import '@/designs/myprofile.css'
import useSWR from "swr";

const MyProfile = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(`/api/auth/me`, fetcher);
  console.log(data);
  return (
    <>
      <div id='my-profile'>
        <center> <h1 className='text-white'> My Profile </h1>  </center> <br />
              <h2> Your Username </h2>
              <h3>{data?.me?.name}</h3> <hr />
              <h2> Your Email </h2>
              <h3>{data?.me?.email}</h3> <hr />
              <h2> Your Mobile Number</h2>
              <h3>+91{data?.me?.mobile}</h3> <hr />
              <h2>Your Account Balance</h2>
              <h3>₹ {data?.me?.balance}</h3> <hr />
      </div>

      {/* /api/auth/me GET  */}
    </>
  )
}

export default MyProfile