import Withdraw from "@/models/Withdraw";
import dataBase from "@/utils/dataBase";
import { NextResponse } from "next/server";
import User from "@/models/User";


export const PUT = async (request) => {
 
    await dataBase();


    const {WTranscationDateTime,WStatus,WUTRid,id} = await request.json();
  
    let user = await Withdraw.findById(id);
    let uf = await User.findById(user.userId);
    const newBalance = uf.balance - user.WAmount;
    if (!user) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Sorry!!, Withdrawl is not Found",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  try {
    user = await Withdraw.findByIdAndUpdate(id, {WTranscationDateTime,WStatus,WUTRid }, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if(WStatus === "Successful"){

      uf = await User.findByIdAndUpdate(user.userId, { balance:newBalance }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    }


    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Withdrawl has been updated",
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
    const getWithdraw = await Withdraw.find().populate("userId");
    
  
    
  
    try {
      return new NextResponse(
        JSON.stringify({
          success: true,
          getWithdraw,
          message: "  get withdraw successfully",
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