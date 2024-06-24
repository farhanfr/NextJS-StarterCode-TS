import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";


// const urlGeneral = {
//     protectedUrl: ["/dashboard/:path*"],
// }

export default withAuth(
    async function middleware(req) {
        // const token = req.ne
        const token = req.nextauth.token
        const pathName = req.nextUrl.pathname
        console.log('NextURL Pathname ', pathName)
        const isAuthenticated = !!token;
        console.log("isAuthenticated => ", isAuthenticated)
        if (isAuthenticated) {
            const user = token.user
            console.log("URL AUTH=> ", req.nextUrl.pathname)
            if (req.nextUrl.pathname.startsWith('/auth/login')) {
                return NextResponse.redirect(new URL('/dashboard?callbackUrl=' + encodeURIComponent(req.url), req.url))
            }
            if (req.nextUrl.pathname.startsWith('/auth/register')) {
                return NextResponse.redirect(new URL('/dashboard?callbackUrl=' + encodeURIComponent(req.url), req.url))
            }
            if (req.nextUrl.pathname.startsWith('/auth/otp')) {
                return NextResponse.redirect(new URL('/dashboard?callbackUrl=' + encodeURIComponent(req.url), req.url))
            }
        } else {
            if (req.nextUrl.pathname.startsWith('/dashboard')) {
                return NextResponse.redirect(new URL('/auth/login?callbackUrl=' + encodeURIComponent(req.url), req.url))
            }
            return NextResponse.next()
        }
    },
    {
        callbacks: {
            authorized: () => true,
        },
    }
)