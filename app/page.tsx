"use client"

import {Button, Typography } from 'antd';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const {Text,Paragraph,Title} = Typography

const HomePage = () => {
  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Title level={1}>Starter code NEXT.JS - TS</Title>
      <Button type='primary' size='large' onClick={()=>signIn()}>Goto Landing Page</Button>
    </main>
  )
}
export default HomePage
