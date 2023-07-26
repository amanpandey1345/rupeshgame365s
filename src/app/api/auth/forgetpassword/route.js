import User from "@/models/User";
import dataBase from "@/utils/dataBase";
import sendEmail from "@/utils/sendEmail";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { email } = await req.json();
    console.log(email);
    await dataBase();
    // check to see if email and password is there
    if (!email) {
      return new NextResponse(JSON.stringify({
        success: false,
        message: "Please enter an email",
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
  
      return new NextResponse(JSON.stringify({
        success: false,
        message: `User is not Found `,
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    const resetToken = user.getResetPasswordToken();
  
    console.log(resetToken);
  
  
   
  
    await user.save({ validateBeforeSave: false });
  
    const resetPasswordUrl = `${process.env.NEXTAUTH_URL}forgetpassword/${resetToken}`;

    const message = `Your password reset token is  :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it `;
  
    try {
      await sendEmail({
        email: user.email,
        subject: `Password Recovery`,
        message,
      });
  
      return new NextResponse(JSON.stringify({
        success: true,
        message: `Check your email ${user.email} `,
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
  
      await user.save({ validateBeforeSave: false });
      return new NextResponse(JSON.stringify({
        success: false,
        message: error.message,
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
  
    } 
  }
  