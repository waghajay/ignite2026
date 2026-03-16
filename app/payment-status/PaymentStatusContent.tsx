'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import './payment-status.css'

interface EntryDetails {
  _id: string;
  entry_number: string;
  event: {
    _id: string;
    title: string;
    amount: number;
    mode: string;
    eventdate: string;
    eventvenue: string;
  };
  leader_name: string;
  leader_email: string;
  leader_phone: string;
  team_name?: string;
  team_size: number;
  payment_status: 'pending' | 'paid' | 'failed';
  payment_id?: string;
  order_id?: string;
  amount_paid?: number;
  qr_ticket?: string;
  checkin_status: boolean;
}

export default function PaymentStatusContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  
  const [loading, setLoading] = useState(true)
  const [entry, setEntry] = useState<EntryDetails | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'paid' | 'failed'>('pending')

  useEffect(() => {
    if (orderId) {
      verifyPayment()
    } else {
      setError('No order ID provided')
      setLoading(false)
    }
  }, [orderId])

  const verifyPayment = async () => {
    try {
      setLoading(true)
      
      // First, try to fetch entry by order_id
      // You'll need to create this API endpoint or modify existing one
      const response = await fetch(`https://ignitecore-three.vercel.app/api/v1/entries/order/${orderId}`)
      
      if (!response.ok) {
        throw new Error('Failed to verify payment')
      }
      
      const result = await response.json()
      
      if (result.success) {
        setEntry(result.data)
        setPaymentStatus(result.data.payment_status)
      } else {
        throw new Error(result.message || 'Payment verification failed')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
      setError(errorMessage)
      console.error('Error verifying payment:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="payment-status-page">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Verifying your payment...</p>
          </div>
        </div>
      </>
    )
  }

  if (error || !entry) {
    return (
      <>
        <Header />
        <div className="payment-status-page">
          <div className="error-state">
            <div className="error-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#ff4444" strokeWidth="2"/>
                <path d="M12 8v5M12 16h.01" stroke="#ff4444" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h1>Unable to Verify Payment</h1>
            <p>{error || 'We could not verify your payment status.'}</p>
            <div className="action-buttons">
              <Link href={`/event-details/${entry?.event?._id || ''}`} className="primary-button">
                Back to Event
              </Link>
              <Link href="/contact" className="secondary-button">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }

  // Payment Success State
  if (paymentStatus === 'paid') {
    return (
      <>
        <Header />
        <div className="payment-status-page">
          <div className="success-state">
            <div className="success-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#F3BD51" strokeWidth="2"/>
                <path d="M8 12L11 15L16 9" stroke="#F3BD51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <h1 className="success-title">Payment Successful! 🎉</h1>
            <p className="success-message">
              Thank you for registering for <strong>{entry.event.title}</strong>. Your payment has been confirmed.
            </p>

            <div className="ticket-card">
              <h2>Your Ticket</h2>
              <div className="ticket-details">
                <div className="ticket-row">
                  <span className="ticket-label">Entry Number:</span>
                  <span className="ticket-value">{entry.entry_number}</span>
                </div>
                <div className="ticket-row">
                  <span className="ticket-label">Event:</span>
                  <span className="ticket-value">{entry.event.title}</span>
                </div>
                <div className="ticket-row">
                  <span className="ticket-label">Name:</span>
                  <span className="ticket-value">{entry.leader_name}</span>
                </div>
                {entry.team_name && (
                  <div className="ticket-row">
                    <span className="ticket-label">Team:</span>
                    <span className="ticket-value">{entry.team_name}</span>
                  </div>
                )}
                <div className="ticket-row">
                  <span className="ticket-label">Team Size:</span>
                  <span className="ticket-value">{entry.team_size}</span>
                </div>
                <div className="ticket-row">
                  <span className="ticket-label">Date:</span>
                  <span className="ticket-value">{new Date(entry.event.eventdate).toLocaleDateString()}</span>
                </div>
                <div className="ticket-row">
                  <span className="ticket-label">Venue:</span>
                  <span className="ticket-value">{entry.event.eventvenue || 'TBD'}</span>
                </div>
                <div className="ticket-row">
                  <span className="ticket-label">Mode:</span>
                  <span className="ticket-value">{entry.event.mode}</span>
                </div>
                {entry.amount_paid && (
                  <div className="ticket-row">
                    <span className="ticket-label">Amount Paid:</span>
                    <span className="ticket-value">₹{entry.amount_paid}</span>
                  </div>
                )}
              </div>

              {entry.qr_ticket && (
                <div className="qr-section">
                  <h3>Your QR Code</h3>
                  <img src={entry.qr_ticket} alt="Entry QR Code" className="qr-image" />
                  <p className="qr-note">Show this QR code at the event for check-in</p>
                </div>
              )}
            </div>
            <div className="action-buttons">
              <Link href={`/event-details/${entry.event._id}`} className="primary-button">
                Back to Event
              </Link>
              <Link href="/dashboard" className="secondary-button">
                View My Registrations
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }

  // Payment Failed State
  if (paymentStatus === 'failed') {
    return (
      <>
        <Header />
        <div className="payment-status-page">
          <div className="failed-state">
            <div className="failed-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#ff4444" strokeWidth="2"/>
                <path d="M15 9L9 15M9 9L15 15" stroke="#ff4444" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            
            <h1 className="failed-title">Payment Failed</h1>
            <p className="failed-message">
              Your payment could not be processed. Please try again or contact support if the issue persists.
            </p>

            <div className="failed-details">
              <p><strong>Entry Number:</strong> {entry.entry_number}</p>
              <p><strong>Event:</strong> {entry.event.title}</p>
            </div>

            <div className="action-buttons">
              <Link href={`/register?event=${entry.event._id}`} className="primary-button">
                Try Again
              </Link>
              <Link href="/contact" className="secondary-button">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }

  // Payment Pending State
  return (
    <>
      <Header />
      <div className="payment-status-page">
        <div className="pending-state">
          <div className="pending-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#F3BD51" strokeWidth="2"/>
              <path d="M12 6v6l4 2" stroke="#F3BD51" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          
          <h1 className="pending-title">Payment Pending</h1>
          <p className="pending-message">
            Your payment is being processed. This may take a few moments.
          </p>

          <div className="pending-details">
            <p><strong>Entry Number:</strong> {entry.entry_number}</p>
            <p><strong>Event:</strong> {entry.event.title}</p>
          </div>

          <div className="action-buttons">
            <button onClick={verifyPayment} className="primary-button">
              Check Status Again
            </button>
            <Link href={`/event-details/${entry.event._id}`} className="secondary-button">
              Back to Event
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}