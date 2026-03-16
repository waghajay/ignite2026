import { Suspense } from 'react'
import PaymentStatusContent from './PaymentStatusContent'

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={
      <div className="payment-status-page">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Verifying payment status...</p>
        </div>
      </div>
    }>
      <PaymentStatusContent />
    </Suspense>
  )
}