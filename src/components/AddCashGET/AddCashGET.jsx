import '@/designs/transactions.css'
import useSWR from "swr";

const AddCashGET = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(`/api/deposit`, fetcher);

  return (
    <>

{
  data?.getDeposit.reverse().map((e,i)=>(
<>
    <div id='box'>

    <h6> UTR ID : <span>{e.DUTRid}</span> </h6>
    <h6>Deposit Amount : <span>{e.DAmount}</span> </h6>
    <h6> Mobile Number : <span>{e.DMobile}</span> </h6>
    <h6> Payment Method : <span>{e.DPaymentMethod}</span> </h6>
    <h6> Status : <span>{e.DStatus}</span> </h6>
    <h6> Transaction Date/Time : <span>{e.DPaymentMethodTranscationDateTime}</span> </h6>
    <h6> Data and Time : <span>{new Date(e.createdAt).toLocaleDateString()} {String(new Date(e.createdAt).toLocaleTimeString()).substr(0, 11)} </span> </h6>
  </div>
  </>
      )
  )
}



    </>
  )
}

export default AddCashGET