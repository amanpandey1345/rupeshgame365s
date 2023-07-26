import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(request) {
        console.log(request.nextUrl.pathname)
        // console.log(request.nextauth.token)

        if (request.nextUrl.pathname.startsWith("/controlroom")
            && request.nextauth.token?.role !== "admin") {
            return NextResponse.redirect(
                new URL("/", request.url)
            )
        }

        // if (request.nextUrl.pathname.startsWith("/client")
        //     && request.nextauth.token?.role !== "admin"
        //     && request.nextauth.token?.role !== "manager") {
        //     return NextResponse.rewrite(
        //         new URL("/", request.url)
        //     )
        // }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)
export const config = { matcher: [ "/dashboard","/","/addcash","/myprofile","/policy","/service-center","/transactions","/withdraw","/dashboard/dragon-tiger","/controlroom/:path*"] } 