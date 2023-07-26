import User from "@/models/User";
import dataBase from "@/utils/dataBase";
import crypto from "crypto";

import NextAuth from "next-auth/next";
import { NextResponse } from "next/server";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials:{
          email:{
            type:"text"
          },
          password:{
            type:"password"
          }
        },
  
        async authorize(credentials) {
          await dataBase();
          // check to see if email and password is there
          if (!credentials.email || !credentials.password) {
            throw new Error("Please enter an email and loginToken");
          }
  
          //Check if the user exists.
  
          // console.log(credentials.loginToken);
          try {
            const user = await User.findOne({
              email: credentials.email,
            }).select("+password");
            // console.log(user);
  
            if (!user) {
              throw new Error("User not found!");
            } else {
              const isPasswordMatched = await user.comparePassword(credentials.password);
              if (!isPasswordMatched) {
                throw new Error("Wrong Credentials!");
              } else {
  
                await user.save();
                // console.log(user);
                return user;
              }
            }
          } catch (err) {
            throw new Error(err);
          }
          
        },
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
      maxAge: 3 * 24 * 60 * 60,
    },
    jwt: {
      maxAge: 3 * 24 * 60 * 60,
    },
    callbacks: {
      jwt({ token, user }) {
        if(user) token.role = user.role
        if(user) token.id = user._id
        return token
      },
      session({ session, token }) {
        session.user.role = token.role
        session.user.id = token.id
        return session
      }
    },
    pages: {
      error: "/login",
      signIn:"/login"
    },
    debug: process.env.NODE_ENV === "development",
  };
  
  const handler = NextAuth(authOptions);
  export { handler as GET, handler as POST };
