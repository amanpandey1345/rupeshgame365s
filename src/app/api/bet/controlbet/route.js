import { getServerSession } from "next-auth";

import Deposit from "@/models/Deposit";
import dataBase from "@/utils/dataBase";
import { NextResponse } from "next/server";
import Bet from "@/models/Bet";
import User from "@/models/User";
import BetActive from "@/models/BetActive";



export const PUT = async (request) => {


     
    await dataBase();

    const tigerbets = await Bet.find({BetStatus:"Pending",BetOn:"tiger"})
    const tiebets = await Bet.find({BetStatus:"Pending",BetOn:"tie"})
    const dragonbets = await Bet.find({BetStatus:"Pending",BetOn:"dragon"})
    console.log(dragonbets,tiebets,tigerbets);
    let tgba =0;
    let tiba =0;
    let dgba=0;
    let winb ;
    await tigerbets.map((tb)=>{
      tgba += tb.BetAmount
    }) 
    await tiebets.map((tb)=>{
      tiba += tb.BetAmount
    }) 
    await dragonbets.map((tb)=>{
      dgba += tb.BetAmount
    }) 
    console.log(tgba);
    console.log(tiba);
    console.log(dgba);
    console.log(Math.min(tgba,tiba,dgba) );
    const minAmont = Math.min(tgba,tiba,dgba) 
    if(tgba === minAmont){
      winb="tiger"

      await Bet.updateMany({betName:`${winb}`}, { $set: { BetStatus:"win"}})
      await Bet.updateMany({betName:{$ne:`${winb}`}}, { $set: {BetStatus:"lose"}})
      await tigerbets.map(async(tb)=>{
        await User.findByIdAndUpdate(tb.userId,{$inc:{balance:`${tb.BetAmount*2}`}},{new: true,runValidators: true,useFindAndModify: false})
      }) 
      
    }else if(tiba === minAmont){
      winb="tie"
      await Bet.updateMany({betName:`${winb}`}, { $set: { BetStatus:"win"}})
      await Bet.updateMany({betName:{$ne:`${winb}`}}, { $set: {BetStatus:"lose"}})
      await tiebets.map(async(tb)=>{
        await User.findByIdAndUpdate(tb.userId,{$inc:{balance:`${tb.BetAmount*2}`}},{new: true,runValidators: true,useFindAndModify: false})
      }) 
    }else{
      winb="dragon"
      await Bet.updateMany({betName:`${winb}`}, { $set: { BetStatus:"win"}})
      await Bet.updateMany({betName:{$ne:`${winb}`}}, { $set: {BetStatus:"lose"}})
      await dragonbets.map(async(tb)=>{
        await User.findByIdAndUpdate(tb.userId,{$inc:{balance:`${tb.BetAmount*2}`}},{new: true,runValidators: true,useFindAndModify: false})
      }) 
    }

    const getBetActive = await BetActive.find();
    const gba = await BetActive.findByIdAndUpdate(getBetActive[0]._id,{$set:{Status:true}},{new: true,runValidators: true,useFindAndModify: false})


    // let uf = await User.findById(id);
    // // const {DStatus ,id} = await request.json();
    // let user = await Deposit.findById(id);
    // const newBalance = uf.balance + user.DAmount;
    // if (!user) {
    //   return new NextResponse(
    //     JSON.stringify({
    //       success: false,
    //       message: "Sorry!!, diposit is not Found",
    //     }),
    //     {
    //       status: 400,
    //       headers: { "Content-Type": "application/json" },
    //     }
    //   );
    // }

  try {

    async function betActive () {
      console.log("hello");
      await BetActive.findByIdAndUpdate(getBetActive[0]._id,{$set:{Status:false}},{new: true,runValidators: true,useFindAndModify: false})
    }

    setTimeout(betActive, 1000*60)
    // user = await Deposit.findByIdAndUpdate(id, { DStatus }, {
    //   new: true,
    //   runValidators: true,
    //   useFindAndModify: false,
    // });

    // if(DStatus === "Successful"){

    //   uf = await User.findByIdAndUpdate(id, { balance:newBalance }, {
    //     new: true,
    //     runValidators: true,
    //     useFindAndModify: false,
    //   });
    // }

    return new NextResponse(
      JSON.stringify({
        success: true,
        dragonbets,
        tiebets,
        tigerbets,
        dgba,
        tiba,
        tgba,
        minAmont,
        winb,
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