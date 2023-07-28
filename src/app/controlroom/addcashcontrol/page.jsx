"use client";
import '@/designs/table.css'
import { DataGrid, GridToolbar ,gridClasses} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { alpha, styled } from '@mui/material/styles';
import { useState } from "react";
import useSWR from "swr";

import Link from "next/link";
import AddCashCD from '@/components/AddCashCD/AddCashCD';
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
  const { data, mutate, error, isLoading } = useSWR(`/api/deposit/controldeposit`, fetcher);


  // const {  } = useSWR(`/api/auth/me`, fetcher);
  const [dup, setDup] = useState(false)
  const [rowdata, setRowdata] = useState();

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
      field: "DPaymentMethod",
      headerName: "Payment Method",
      width: 150,

    },
    {
      field: "DMobile",
      headerName: "Deposit Mobile",
      type: "number",
      width: 180,

    },

    {
      field: "DUTRid",
      headerName: "UTR Id",
      width: 210,

    },
    {
      field: "DAmount",
      headerName: "Diposit Amount",
      width: 210,

    },

    {
      field: "DStatus",
      headerName: "Status",
      width: 100,

    },
    {
      field: "DTranscationDate",
      headerName: "Transcation Date",
      width: 290,
      editable: true,
    },
    {
      field: "DTranscationTime",
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
        <Button variant="standard" onClick={() => hupdateId(params.row)} disabled={params.row.DStatus === "Successful" || params.row.DStatus === "Cancelled"} >
          <EditIcon style={params.row.DStatus === "Successful" || params.row.DStatus === "Cancelled"?{color:"gray"}:{color:"skyblue"}} />
        </Button>,
      ],
    },
    // {
    //   field: "delete",
    //   headerName: "Delete",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   styled: Button,
    //   width: 90,
    //   renderCell: (params) => [
    //     <Button variant="standard" onClick={() => Sdelete(params.row.id)}>
    //           {
    //       delload && delid === params.row.id ? (<div className="w-6 h-6 border border-red-700 border-solid rounded-full shadow-md animate-spin border-t-transparent"></div>):
    //       (<DeleteIcon  color="error" />)
    //     }
    //     </Button>,
    //   ],
    // },
    // {
    //   field: "profile",
    //   headerName: "Profile",

    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   styled: Button,
    //   width: 90,
    //   renderCell: (params) => [
    //     <Link href={`/getDeposit/${params.row.id}`}>
    //     <Button variant="standard">
      
    //       <RemoveRedEyeIcon color="info" ></RemoveRedEyeIcon>
    //     </Button>,
    //     </Link>
    //   ],
    // },
  ];
  const hupdateId =(rd)=>{
    setRowdata(rd)
    setDup(true)
  }
  console.log(data);
  const rows = [
    
  ];

  data?.getDeposit?.forEach((getDeposit, index) => {
    rows.push({
      id: getDeposit._id,
      sn: index + 1,
      name: getDeposit.userId.name,
      email: getDeposit.userId.email,
      DPaymentMethod: getDeposit.DPaymentMethod,
      DMobile: `${getDeposit.DMobile}`,
      DUTRid: getDeposit.DUTRid,
      DAmount: `₹ ${getDeposit.DAmount}`,
      DStatus:getDeposit.DStatus,


      DTranscationDate: new Date(getDeposit.DTranscationDate).toLocaleDateString(),
      DTranscationTime: String(new Date(getDeposit.DTranscationTime).toLocaleTimeString()).substr(0, 11),
      Date: new Date(getDeposit.createdAt).toLocaleDateString(),
        Time: String(new Date(getDeposit.createdAt).toLocaleTimeString()).substr(0, 11),
    });
  });
  return ( 
    <>
     <div id='my-profile'>
    {
      dup && <AddCashCD  rowdata={rowdata} mutate={mutate} setDup={setDup} />
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