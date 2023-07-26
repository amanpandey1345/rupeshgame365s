import User from "@/models/User";
import dataBase from "@/utils/dataBase";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    const { name, email, mobile, password } = await request.json();
    console.log(name, email, mobile);
    await dataBase();
    const user = await User.findOne({ email });
    if (user) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Sorry!!,  Account is Already Created",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  
    const newUser = new User({
        name,
        email,
        mobile,
        password,
      });
  
    try {
      await newUser.save();
      return new NextResponse(
        JSON.stringify({
          success: true,
          message: "User has been created",
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
  