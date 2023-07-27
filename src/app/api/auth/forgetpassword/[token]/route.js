import User from "@/models/User";
import dataBase from "@/utils/dataBase";
import crypto from "crypto";
import { NextResponse } from "next/server";
export const PUT = async (req,{params}) => {

    const {token} = params
    const { password, cpassword} = await req.json();
    await dataBase();
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
    
  if(!user){
    return new NextResponse(
        JSON.stringify({
          success: false,
          message: " Reset Password Token is invalid or has been expired",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
  }
  if (password !== cpassword) {
    return new NextResponse(
        JSON.stringify({
          success: false,
          message: "Password does not password",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
  }
  
    try {
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
      return new NextResponse(
        JSON.stringify({
          success: true,

          message: " Password Change Successfully successfully",
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
