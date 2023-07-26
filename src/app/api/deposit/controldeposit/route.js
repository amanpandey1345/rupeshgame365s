import { getServerSession } from "next-auth";

import Deposit from "@/models/Deposit";
import dataBase from "@/utils/dataBase";
import { NextResponse } from "next/server";


export const PUT = async (request) => {


     
    await dataBase();


    const {DStatus ,id} = await request.json();
    let user = await Deposit.findById(id);
    if (!user) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Sorry!!, diposit is not Found",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

  try {
    user = await Deposit.findByIdAndUpdate(id, { DStatus }, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "desposit has been Update",
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" }, 
      }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: err.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};


export const GET = async (request) => {


    await dataBase();
    const getDeposit = await Deposit.find().populate("userId");
    
  
    
  
    try {
      return new NextResponse(
        JSON.stringify({
          success: true,
          getDeposit,
          message: "  get deposit successfully",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (err) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: err.message,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  };