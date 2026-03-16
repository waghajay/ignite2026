'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'

export default function PaymentStatusPage() {
  const params = useSearchParams()
  const orderId = params.get("order_id")

  const [status, setStatus] = useState("Checking payment...")

  useEffect(() => {
    if (!orderId) return

    checkPayment()
  }, [orderId])

  const checkPayment = async () => {
    try {
      const res = await fetch(
        `https://ignitecore-three.vercel.app/api/v1/payments/verify?order_id=${orderId}`
      )

      const data = await res.json()

      if (data.success) {
        setStatus("Payment successful 🎉")
      } else {
        setStatus("Payment failed ❌")
      }
    } catch (err) {
      setStatus("Unable to verify payment")
    }
  }

  return (
    <>
      <Header />
      <div style={{textAlign:"center",marginTop:"100px"}}>
        <h1>{status}</h1>
      </div>
    </>
  )
}