"use client";

import '@/designs/service-center.css'
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";


import { useState } from "react";
// import useSWR from "swr";
// import Loadings from "./loading";
import Link from "next/link";
const page = () => {
  const columns = [
    { field: "sn", headerName: "SNo.", width: 50 },
    { field: "id", headerName: "ID", width: 200 },

    {
      field: "name",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 220,
      editable: true,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      type: "number",
      width: 180,
      editable: true,
    },
    {
        field: "fathername",
        headerName: "Father Name",
        width: 90,
        editable: true,
      },
    {
      field: "course",
      headerName: "Course",
      width: 150,
      editable: true,
    },

    {
      field: "status",
      headerName: "Status",
      width: 90,
      editable: true,
    },
    {
      field: "utr",
      headerName: "UTR ID",
      width: 190,
      editable: true,
    },

    {
      field: "fee",
      headerName: "Fee",
      width: 90,
      editable: true,
    },
    {
      field: "EMITenure",
      headerName: "EMITenure",
      width: 90,
      editable: true,
    },
    {
      field: "EMI",
      headerName: "EMI",
      width: 90,
      editable: true,
    },
    {
      field: "Durations",
      headerName: "Durations",
      width: 90,
      editable: true,
    },
    {
      field: "Adamount",
      headerName: "Admission Amount",
      width: 120,
      editable: true,
    },
    {
      field: "AdDate",
      headerName: "Admission Date",
      width: 90,
      editable: true,
    },

    // {
    //   field: "edit",
    //   headerName: "Edit",

    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 90,
    //   renderCell: (params) => [
    //     <Button variant="standard" onClick={() => hupdateId(params.row)}>
    //       <EditIcon color="primary" />
    //     </Button>,
    //   ],
    // },
    {
      field: "delete",
      headerName: "Delete",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      styled: Button,
      width: 90,
      renderCell: (params) => [
        <Button variant="standard" onClick={() => Sdelete(params.row.id)}>
              {
          delload && delid === params.row.id ? (<div className="w-6 h-6 border border-red-700 border-solid rounded-full shadow-md animate-spin border-t-transparent"></div>):
          (<DeleteIcon  color="error" />)
        }
        </Button>,
      ],
    },
    {
      field: "profile",
      headerName: "Profile",

      description: "This column has a value getter and is not sortable.",
      sortable: false,
      styled: Button,
      width: 90,
      renderCell: (params) => [
        <Link href={`/admission/${params.row.id}`}>
        <Button variant="standard">
      
          <RemoveRedEyeIcon color="info" ></RemoveRedEyeIcon>
        </Button>,
        </Link>
      ],
    },
  ];
  const rows = [];
  return (
    <>
     <div id='my-profile'>
        <center><h3 className='text-red-700'> My Balance</h3> <br />
        </center>
        <>
        <DataGrid
          // className={"backdrop-blur-sm bg-white/40"}
          style={{
            position: "inherit",
            zIndex: "1",
            width: "95%",
            backgroundColor: "transparent",
            color:"white",
            border:"none",
            
          }}
          rows={rows}
          columns={columns}
          pageSize={50}
          rowsPerPageOptions={[50]}
          loading={true}
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
        />
        </>
      </div>
    </>
  )
}

export default page