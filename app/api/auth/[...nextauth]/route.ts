
import { loginAuth, otpAuth } from "@/app/services/AuthService";
import { API_KEY, BASE_URL } from "@/app/utils/constants";
import nextAuth, { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { pages } from "next/dist/build/templates/app-page";

const authOption: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: 'credentials',
            name: 'Credentials',
            credentials: {
                phonenumber: {
                    label: 'phonenumber', type: 'number'
                },
                otp: {
                    label: 'password', type: 'password'
                }
            },
            authorize: async (credentials) => {
                const { phonenumber, otp } = credentials as {
                    phonenumber: string,
                    otp: string
                }

                const data: any = {
                    phonenumber: phonenumber,
                    otp: otp
                }
                console.log(data)

                const result = await fetch(BASE_URL + '/verify-otp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'api-key': API_KEY
                    },
                    body: JSON.stringify({ phonenumber: phonenumber, otp: otp })
                })
                const resultData = await result.json()
                if (result.ok) {
                    console.log("=>", resultData)
                    const tokenData: any = {
                        accessToken: resultData.data.accessToken,
                        refreshToken: resultData.data.refreshToken,
                    }
                    return tokenData
                } else {
                    console.log(resultData)
                    throw new Error(resultData.message)
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile, user }) {

            if (account?.provider === "credentials") {
                console.log("=> ", user)
                console.log("=> ", token)
                token.user = user
            }
            return token
        },
        async session({ session, token }: any) {
            console.log("=> ", token)
            session.user = token.user
            console.log("=> ", session)
            return session
        }

    },
    pages: {
        signIn: "/auth/login"
    }
}

const handler = NextAuth(authOption)
export { handler as GET, handler as POST }