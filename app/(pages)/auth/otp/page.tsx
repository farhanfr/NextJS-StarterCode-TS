"use client"

import CustomTimer from '@/app/components/CustomTimer'
import CountdownTimer from '@/app/components/CustomTimer'
import { AuthDataProvider, useData } from '@/app/context/AuthContext'
import { IRequestLogin, IRequestOTP } from '@/app/models/AuthData'
import { loginAuth } from '@/app/services/AuthService'
import { AlertError, AlertSuccess } from '@/app/utils/extension'
import { Button, Card, Form, Typography, Input, Spin } from 'antd'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const { Title, Text } = Typography

const OtpPage = () => {
  const router = useRouter()
  // const { phoneNumber } = useData()

  const [valueInput, setValueInput] = useState<IRequestOTP>({
    phonenumber: "",
    otp: ""
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (event: any) => {
    const name = event.target.name
    const value = event.target.value
    setValueInput(val => ({ ...val, [name]: value }))
  }

  const handleSubmit = async () => {
    let getLsOTP = localStorage.getItem('otpData');
    let getOtpData = JSON.parse(getLsOTP ?? "")
    setLoading(true)
    try {
      const res = await signIn('credentials', {
        phonenumber: getOtpData.phonenumber,
        otp: valueInput.otp,
        redirect: false,
      })
      if (!res?.error) {
        router.push('/dashboard')
        // setLoading(false)
      }
      else {
        AlertError(res.error)
        console.log(res)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    let getLsOTP = localStorage.getItem('otpData');
    let getOtpData = JSON.parse(getLsOTP ?? "")
    console.log("=>", getOtpData)
    const otpDataSend: IRequestLogin = {
      phonenumber: getOtpData.phonenumber,
      password: getOtpData.password,
    }
    loginAuth(otpDataSend).then((val) => {
      AlertSuccess("OTP successfully send")
    }).catch((err) => {
      AlertError(err.message)
      // console.log(err)
    })
  }

  return (

    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Card style={{ width: '50%' }}>
        <Title level={4}>Please enter the OTP that has been sent to you</Title>
        {/*   <CountdownTimer startTime={new Date("2024-06-22T00:00:00")} endTime={new Date("2024-06-22T00:00:01")} /> */}
        <Form
          // name="basic"
          layout='vertical'
          onFinish={handleSubmit}
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          // style={{ maxWidth: 600 }}
          // initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off">

          <Form.Item
            label="Otp"
            name="otp"
            rules={[{ required: true, message: 'Please input your OTP!' }]}
          >
            <Input name='otp' onChange={handleChange} />
          </Form.Item>
          <Form.Item>
            {
              loading ?
                <Spin /> :
                <Button type="primary" htmlType="submit">
                  Submit OTP
                </Button>
            }
          </Form.Item>
        </Form>

        <center>
          <CustomTimer minutes={0} seconds={59} resend={() => {
            handleResendOTP()
          }} />
        </center>

      </Card>
    </main>
  )
}

export default OtpPage