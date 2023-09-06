
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



  try {  

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
        const getBetActive = await BetActive.find(); 
     const gba = await BetActive.findByIdAndUpdate(getBetActive[0]._id,{$set:{Status:false}},{new: true,runValidators: true,useFindAndModify: false})
    
  
    
  
    try {
      return new NextResponse(
        JSON.stringify({
          success: true,
          gba,
          message: "  get BetActive successfully",
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