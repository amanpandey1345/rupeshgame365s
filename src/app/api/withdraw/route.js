import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Withdraw from "@/models/Withdraw";
import dataBase from "@/utils/dataBase";
import { NextResponse } from "next/server";


export const POST = async (request) => {
    const session = await getServerSession(authOptions)
 
    await dataBase();

    const userId=session?.user.id;

    const {WMobile,WAmount,WPaymentMethod} = await request.json();
  

  try {
    let newUser =  new Withdraw({
        WMobile,WAmount,WPaymentMethod,userId
      });
    
    await newUser.save();
    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "desposit has been created",
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

    const session = await getServerSession(authOptions)
    await dataBase();
    const getWithdraw = await Withdraw.findById({userId:session.data.user.id});
    
  
    
  
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