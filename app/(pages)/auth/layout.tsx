"use client"

import { AuthDataProvider } from "@/app/context/AuthContext"
import { Metadata } from "next"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AuthDataProvider>
            <main>
                {children}
            </main>
        </AuthDataProvider>
    )
}
