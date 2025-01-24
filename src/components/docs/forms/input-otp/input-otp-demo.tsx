"use client"

import { InputOTP } from "ui"

export default function InputOtpDemo() {
  return (
    <div>
      <InputOTP maxLength={6}>
        <InputOTP.Group>
          {[...Array(6)].map((_, index) => (
            <InputOTP.Slot key={index} index={index} />
          ))}
        </InputOTP.Group>
      </InputOTP>
    </div>
  )
}
