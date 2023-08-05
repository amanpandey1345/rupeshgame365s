import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Deposit from "@/models/Deposit";
import dataBase from "@/utils/dataBase";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    const session = await getServerSession(authOptions)

     
    await dataBase();

    
    const userId=session?.user.id;
    const {DMobile,DAmount,DPaymentMethod,DUTRid,DTranscationDateTime} = await request.json();
  

  try {
    let newUser =  new Deposit({
        DMobile,DAmount,DPaymentMethod,DUTRid,userId,DTranscationDateTime
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
    const userId=session?.user.id;
    await dataBase();
    const getDeposit = await Deposit.find({userId}).populate("userId");
    
  
    
  
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