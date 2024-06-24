"use client";
import { SessionProvider } from "next-auth/react"
import React, { ReactNode } from "react";

interface PropsProvider {
    children:ReactNode
}

const ProviderNextAuth = (props:PropsProvider) => {
    return (
        <SessionProvider>
            {props.children}
        </SessionProvider>
    )
}

export default ProviderNextAuth