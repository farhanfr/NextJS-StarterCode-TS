"use client"

import { Button } from 'antd'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const DashboardPage = () => {

  const {data:session, status} = useSession()

  return (
    <div>
        <h1>Dashboard Page</h1>
        {
        status === "authenticated" ?
        (
            <Button type='primary' size='large' onClick={()=>signOut()}>Logout</Button>
        )
        :(
            <Button type='primary' size='large' onClick={()=>signIn()}>Login</Button>
        )
    }
    </div>
    
  )
}

export default DashboardPage