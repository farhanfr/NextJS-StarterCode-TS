import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";


const adminPath = {
    protectedUrl: ["/dashboard/:path*"],
}

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
        } else {
            if (req.nextUrl.pathname.startsWith('/dashboard')) {
                return NextResponse.redirect(new URL('/auth/login'))
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