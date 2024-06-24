"use client"

import { AuthDataProvider, useData } from '@/app/context/AuthContext'
import { IRequestLogin } from '@/app/models/AuthData'
import { loginAuth } from '@/app/services/AuthService'
import { AlertError, AlertSuccess, SaveLocalStorage } from '@/app/utils/extension'
import { Button, Card, Divider, Form, Input, Spin, Typography } from 'antd'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const { Title,Text } = Typography

const LoginPage = () => {
    const router = useRouter()
    // const {phoneNumber: data,setData} = useData()
    
    const [valueInput, setValueInput] = useState<IRequestLogin>({
        phonenumber:"",
        password:""
    })
    const [loading, setLoading] = useState<boolean>(false)

    const handleChange = (event: any) => {
        const name = event.target.name
        const value = event.target.value
        setValueInput(val => ({...val,[name]:value}))
    }

    const handleLogin = async() =>{
        const otpData = {
            "phonenumber":valueInput.phonenumber,
            "password":valueInput.password
            // "login_time": Da
        }
        setLoading(true)
        loginAuth(valueInput).then((val)=>{
            SaveLocalStorage("otpData",JSON.stringify(otpData))
            // setData(valueInput.phonenumber)
            router.push("/auth/otp")
            setLoading(false)
        }).catch((err)=>{
            AlertError(err.message)
            setLoading(false)
            // console.log(err)
        })
    }
    

    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <Card style={{ width: '50%' }}>
                <Title level={3}>Login To Dashboard</Title>
                <Form
                    name="basic"
                    layout='vertical'
                    onFinish={handleLogin}
                    // labelCol={{ span: 8 }}
                    // wrapperCol={{ span: 16 }}
                    // style={{ maxWidth: 600 }}
                    // initialValues={{ remember: true }}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off">
                    <Form.Item
                        label="Phonenumber"
                        name="phonenumber"
                        rules={[{ required: true, message: 'Please input your phonenumber!' }]}
                    >
                        <Input type='number' name='phonenumber' onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password name='password' onChange={handleChange} />
                    </Form.Item>

                    <Form.Item>
                        {
                            loading ?
                                <Spin /> :
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                        }
                    </Form.Item>
                </Form>
                <Divider/>
                <center>
                <Text>Anda belum punya akun? <b onClick={()=>{
                    router.push("/auth/register")
                }}>Klik Disini</b>
                </Text>
                </center>
            </Card>
        </main>
    )
}

export default LoginPage