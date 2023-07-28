import User from "@/models/User";
import dataBase from "@/utils/dataBase";
import { authOptions } from "../[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (request) => {


  const session = await getServerSession(authOptions)
    await dataBase();

    const me = await User.findById(session?.user.id);

    
  
    
  
    try {
      return new NextResponse(
        JSON.stringify({
          success: true,
          me,
          message: " me  get successfully",
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
