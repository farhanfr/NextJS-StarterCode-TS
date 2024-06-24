"use client"

import { IRequestRegister, registerAuth } from '@/app/services/AuthService'
import { AlertError, AlertSuccess } from '@/app/utils/extension'
import { Button, Card, Divider, Form, Input, Spin, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const { Title, Text } = Typography

const RegisterPage = () => {
    const router = useRouter()

    const [valueInput, setValueInput] = useState<IRequestRegister>({
        name: "",
        phonenumber: "",
        password: ""
    })

    const [loading, setLoading] = useState<boolean>(false)

    const handleChange = (event: any) => {
        const name = event.target.name
        const value = event.target.value
        setValueInput(val => ({ ...val, [name]: value }))
    }

    const handleRegister = () => {
        setLoading(true)
        registerAuth(valueInput).then((val) => {
            AlertSuccess(val.message)
            setLoading(false)
        }).catch((err) => {
            AlertError(err.message)
            setLoading(false)
            // console.log(err)
        })
    }

    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>

            <Card style={{ width: '50%' }}>
                <Title level={3}>Register</Title>
                <Form
                    name="basic"
                    onFinish={handleRegister}
                    // labelCol={{ span: 8 }}
                    // wrapperCol={{ span: 16 }}
                    // style={{ maxWidth: 600 }}
                    // initialValues={{ remember: true }}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off">
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input name='name' onChange={handleChange} />
                    </Form.Item>

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
                <Divider />
                <Text>Sudah punya akun? <b onClick={() => {
                    router.push("/auth/login")
                }}>Klik Disini</b>
                </Text>
            </Card>
        </main>
    )
}

export default RegisterPage