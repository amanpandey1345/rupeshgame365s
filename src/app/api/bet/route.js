import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Deposit from "@/models/Deposit";
import dataBase from "@/utils/dataBase";
import { NextResponse } from "next/server";
import Bet from "@/models/Bet";
import User from "@/models/User";

export const POST = async (request) => {
    const session = await getServerSession(authOptions)

     
    await dataBase();
    let uf = await User.findById(session?.user.id);

    
    const userId=session?.user.id;
    const {BetAmount,BetOn} = await request.json();
    const newBalance = uf.balance - BetAmount;

  try {
    let newUser =  new Bet({
      BetAmount,BetOn,userId
      });
    
    await newUser.save();


      uf = await User.findByIdAndUpdate(session?.user.id, { balance:newBalance }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Bet has been created",
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
    const getBet = await Bet.findById({userId:session.data.user.id});
    
  
    
  
    try {
      return new NextResponse(
        JSON.stringify({
          success: true,
          getBet,
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