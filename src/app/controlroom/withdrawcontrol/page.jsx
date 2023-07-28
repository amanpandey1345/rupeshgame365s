"use client";
import '@/designs/table.css'
import { DataGrid, GridToolbar ,gridClasses} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { alpha, styled } from '@mui/material/styles';
import { useState } from "react";
import useSWR from "swr";
// import Loadings from "./loading";
import Link from "next/link";
import WithdrawCD from '@/components/WithdrawCD/WithdrawCD';
// import AddCashCD from '@/components/AddCashCD/AddCashCD';
const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({

  [`& .${gridClasses.row}`]: {
    backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
    // backgroundColor: theme.palette.grey[300],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    

    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
 
}));

const page = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(`/api/withdraw/controlwithdraw`, fetcher);
  const [dup, setDup] = useState(false)
  const [rowdata, setRowdata] = useState();
console.log(data);
  const columns = [
    { field: "sn", headerName: "SNo.", width: 50 },
    { field: "id", headerName: "ID", width: 200 },

    {
      field: "name",
      headerName: "First name",
      width: 150,

    },
    {
      field: "email",
      headerName: "Email",
      width: 220,

    },
    {
      field: "WPaymentMethod",
      headerName: "Payment Method",
      width: 150,

    },
    {
      field: "WMobile",
      headerName: "Deposit Mobile",
      type: "number",
      width: 180,

    },

    {
      field: "WUTRid",
      headerName: "UTR Id",
      width: 210,

    },

    {
      field: "WStatus",
      headerName: "Status",
      width: 100,

    },
    {
      field: "WTranscationDate",
      headerName: "Transcation Date",
      width: 290,
      editable: true,
    },
    {
      field: "WTranscationTime",
      headerName: "Transcation Time",
      width: 290,
      editable: true,
    },

    {
      field: "Date",
      headerName: "Request Date",
      width: 140,
      editable: true,
    },
    {
      field: "Time",
      headerName: "Request Time",
      width: 140,
      editable: true,
    },

    {
      field: "edit",
      headerName: "Edit",

      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 120,
      renderCell: (params) => [
        <Button variant="standard" onClick={() => hupdateId(params.row)} disabled={params.row.WStatus === "Successful" || params.row.WStatus === "Cancelled"} >
          <EditIcon style={params.row.WStatus === "Successful" || params.row.WStatus === "Cancelled"?{color:"gray"}:{color:"skyblue"}} />
        </Button>,
      ],
    },
    
  ];
  const hupdateId =(rd)=>{
    setRowdata(rd)
    setDup(true)
  }
  const mutateW=()=>{
    mutate()
  }
  console.log(data);
  const rows = [
    
  ];

  data?.getWithdraw?.forEach((getWithdraw, index) => {
    rows.push({
      id: getWithdraw._id,
      sn: index + 1,
      name: getWithdraw.userId.name,
      email: getWithdraw.userId.email,
      WPaymentMethod: getWithdraw.WPaymentMethod,
      WMobile: `${getWithdraw.WMobile}`,
      WUTRid: getWithdraw.WUTRid,
      WStatus:getWithdraw.WStatus,
      WTranscationDate: new Date(getWithdraw.WTranscationDate).toLocaleDateString(),
      WTranscationTime: String(new Date(getWithdraw.WTranscationTime).toLocaleTimeString()).substr(0, 11),
      Date: new Date(getWithdraw.createdAt).toLocaleDateString(),
        Time: String(new Date(getWithdraw.createdAt).toLocaleTimeString()).substr(0, 11),
    });
  });
  return ( 
    <>
     <div id='my-profile'>
    {
      dup && <WithdrawCD  rowdata={rowdata} mutateW={mutateW} setDup={setDup} />
    }
    {
      !dup &&<> <StripedDataGrid
      // className={"backdrop-blur-sm bg-white/40"}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      style={{
        position: "inherit",
        zIndex: "1",
        width: "95%",
        minHeight:"60vh",
        
        backgroundColor: "transparent",
        color:"white",
        border:"none",

        
      }}
      
      rows={rows}
      columns={columns}
      pageSize={50}
      rowsPerPageOptions={[50]}
      loading={isLoading}
      sx={{color:"red"}}
    
      // checkboxSelection
      // onRowClick={handleRowClick}
      components={{ Toolbar: GridToolbar  }}
      componentsProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
          color:"white"
        }
      }}
    /></>
    }

      </div>
    </>
  )
}

export default page