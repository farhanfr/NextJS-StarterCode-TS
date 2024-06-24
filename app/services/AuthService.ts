import { PROVIDER_POST } from "../api/ProviderApi"
import { IRequestLogin, IRequestOTP, IRequestRegister } from "../models/AuthData"


export const loginAuth = async (data:IRequestLogin) => {
    const formData = new FormData()
    formData.append('phonenumber',data.phonenumber)
    formData.append('password',data.password)

    const response = await PROVIDER_POST(`login`,formData)
    return response
}

export const registerAuth = async (data:IRequestRegister) => {
    const formData = new FormData()
    formData.append('name',data.name)
    formData.append('phonenumber',data.phonenumber)
    formData.append('password',data.password)

    const response = await PROVIDER_POST(`register`,formData)
    return response
}

export const otpAuth = async (data:IRequestOTP) => {
    const formData = new FormData()
    formData.append('phonenumber',data.phonenumber)
    formData.append('otp',data.otp)

    const response = await PROVIDER_POST(`verify-otp`,formData)
    return response
}
