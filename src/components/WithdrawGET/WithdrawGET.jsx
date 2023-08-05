import '@/designs/transactions.css'
import useSWR from "swr";

const WithdrawGET = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(`/api/withdraw`, fetcher);

  return (
    <>

{
  data?.getWithdraw.reverse().map((e,i)=>(
<>
    <div id='box'>

    <h6> UTR ID : <span>{e.WUTRid}</span> </h6>
    <h6>Deposit Amount : <span>{e.WAmount}</span> </h6>
    <h6> Mobile Number : <span>{e.WMobile}</span> </h6>
    <h6> Payment Method : <span>{e.WPaymentMethod}</span> </h6>
    <h6> Status : <span>{e.WStatus}</span> </h6>
    <h6> Transaction Date/Time : <span>{e.WTranscationDateTime}</span> </h6>
    <h6> Data and Time : <span>{new Date(e.createdAt).toLocaleDateString()} {String(new Date(e.createdAt).toLocaleTimeString()).substr(0, 11)} </span> </h6>
  </div>
  </>
      )
  )
}



    </>
  )
}

export default WithdrawGET