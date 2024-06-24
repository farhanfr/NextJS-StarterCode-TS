import React from 'react'
import OtpTimer from 'otp-timer'

interface CustomTimerProps{
  minutes:number,
  seconds:number,
  resend():void
}

const CustomTimer = (props:CustomTimerProps) => {
  return (
    <>
       <OtpTimer minutes={props.minutes}
            seconds={props.seconds}
            text="Resend OTP in =>"
            ButtonText="Resend OTP"
            background= {"#ffffff"}
            textColor={"#000000"}
            buttonColor = {"#000000"}
            resend={props.resend} />
    </>
  )
}

export default CustomTimer