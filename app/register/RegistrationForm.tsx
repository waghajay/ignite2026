'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import { Event } from '@/types/event'
import './registration.css'

// Define types
interface Participant {
  name: string;
  email: string;
  phone: string;
}

interface RegistrationData {
  _id: string;
  entry_number: string;
}

interface PaymentResult {
  success: boolean;
  message?: string;
  data: {
    payment_session_id: string;
  };
}

// Load Cashfree SDK script
const loadCashfreeScript = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src="https://sdk.cashfree.com/js/v3/cashfree.js"]')) {
      resolve((window as any).Cashfree)
      return
    }
    const script = document.createElement('script')
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js'
    script.async = true
    script.onload = () => resolve((window as any).Cashfree)
    script.onerror = reject
    document.body.appendChild(script)
  })
}

export default function RegistrationForm() {
  const searchParams = useSearchParams()
  const eventId = searchParams.get('event')
  
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [processingPayment, setProcessingPayment] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    event: eventId || '',
    team_name: '',
    team_size: 1,
    participants: [] as Participant[],
    college_university: '',
    leader_name: '',
    leader_email: '',
    leader_phone: '',
    additional_info: ''
  })

  useEffect(() => {
    if (eventId) {
      fetchEventDetails()
      setFormData(prev => ({
        ...prev,
        event: eventId
      }))
    } else {
      setLoading(false)
    }
  }, [eventId])

  const fetchEventDetails = async () => {
    try {
      setLoading(true)
      const response = await fetch(`https://ignitecore-three.vercel.app/api/v1/events/${eventId}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch event details')
      }
      
      const result = await response.json()
      
      if (result.success) {
        setEvent(result.data)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
      console.error('Error fetching event details:', errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleParticipantChange = (index: number, field: keyof Participant, value: string) => {
    const updatedParticipants = [...formData.participants]
    updatedParticipants[index] = {
      ...updatedParticipants[index],
      [field]: value
    }
    setFormData(prev => ({
      ...prev,
      participants: updatedParticipants
    }))
  }

  const addParticipant = () => {
    setFormData(prev => ({
      ...prev,
      participants: [...prev.participants, { name: '', email: '', phone: '' }]
    }))
  }

  const removeParticipant = (index: number) => {
    const updatedParticipants = formData.participants.filter((_, i) => i !== index)
    setFormData(prev => ({
      ...prev,
      participants: updatedParticipants
    }))
  }

  // Update participants array when team size changes
  useEffect(() => {
    const teamSize = Number(formData.team_size) || 1
    const requiredParticipants = teamSize - 1
    const currentSize = formData.participants.length
    
    if (requiredParticipants > currentSize) {
      const newParticipants = [...formData.participants]
      for (let i = currentSize; i < requiredParticipants; i++) {
        newParticipants.push({ name: '', email: '', phone: '' })
      }
      setFormData(prev => ({
        ...prev,
        participants: newParticipants
      }))
    } else if (requiredParticipants < currentSize) {
      setFormData(prev => ({
        ...prev,
        participants: prev.participants.slice(0, requiredParticipants)
      }))
    }
  }, [formData.team_size])

  const validateForm = () => {
    if (!formData.leader_name || !formData.leader_email || !formData.leader_phone) {
      throw new Error('Leader details are required')
    }

    const teamSize = Number(formData.team_size) || 1
    if (teamSize > 1) {
      const invalidParticipants = formData.participants.some(
        p => !p.name || !p.email || !p.phone
      )
      if (invalidParticipants) {
        throw new Error('All team member details are required')
      }
    }
  }

  const handlePayment = async (entryId: string) => {
    try {
      setProcessingPayment(true)
      
      // Create payment order
      const paymentResponse = await fetch('https://ignitecore-three.vercel.app/api/v1/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ entryId })
      })

      const paymentResult: PaymentResult = await paymentResponse.json()
      
      if (!paymentResponse.ok || !paymentResult.success) {
        throw new Error(paymentResult.message || 'Failed to create payment order')
      }

      const { payment_session_id } = paymentResult.data
      
      // Load Cashfree SDK and initialize payment
      const Cashfree = await loadCashfreeScript()

      const cashfree = Cashfree({
        mode: "production"
      })

      cashfree.checkout({
        paymentSessionId: payment_session_id,
        redirectTarget: "_self"
      })

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed'
      setSubmitError(errorMessage)
      console.error('Payment error:', err)
      setProcessingPayment(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)
    
    try {
      validateForm()

      const teamSize = Number(formData.team_size) || 1
      const participants = teamSize > 1 ? formData.participants : []

      const registrationData = {
        event: eventId,
        team_name: formData.team_name || undefined,
        team_size: teamSize,
        participants: participants,
        college_university: formData.college_university,
        leader_name: formData.leader_name,
        leader_email: formData.leader_email,
        leader_phone: formData.leader_phone,
        additional_info: formData.additional_info || undefined
      }

      console.log('Sending payload:', registrationData)

      const response = await fetch('https://ignitecore-three.vercel.app/api/v1/entries/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
      })

      const result = await response.json()
      
      if (response.ok && result.success) {
        setRegistrationData(result.data)
        
        // If event has registration fee, initiate payment
        if (event?.amount && event.amount > 0) {
          await handlePayment(result.data._id)
        } else {
          setRegistrationSuccess(true)
        }
      } else {
        throw new Error(result.message || 'Registration failed')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed'
      setSubmitError(errorMessage)
      console.error('Error submitting registration:', err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="registration-page">
          <div className="loading-state">
            <p>Loading registration form...</p>
          </div>
        </div>
      </>
    )
  }

  if (!eventId) {
    return (
      <>
        <Header />
        <div className="registration-page">
          <div className="error-state">
            <h1>No Event Selected</h1>
            <p>Please select an event to register.</p>
            <Link href="/" className="back-button">
              ← Back to Events
            </Link>
          </div>
        </div>
      </>
    )
  }

  if (registrationSuccess) {
    return (
      <>
        <Header />
        <div className="registration-page">
          <div className="success-state">
            <div className="success-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#F3BD51" strokeWidth="2"/>
                <path d="M8 12L11 15L16 9" stroke="#F3BD51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="success-title">Registration Successful!</h1>
            <p className="success-message">
              Thank you for registering for <strong>{event?.title || 'the event'}</strong>. 
              Your registration is confirmed. We will contact you soon with further details.
            </p>
            <div className="success-details">
              <p><strong>Entry Number:</strong> {registrationData?.entry_number}</p>
            </div>
            <Link href={`/event-details/${eventId}`} className="success-button">
              Back to Event Details
            </Link>
          </div>
        </div>
      </>
    )
  }

  if (processingPayment) {
    return (
      <>
        <Header />
        <div className="registration-page">
          <div className="loading-state">
            <p>Redirecting to payment gateway...</p>
            <div className="spinner"></div>
          </div>
        </div>
      </>
    )
  }

  const teamSize = Number(formData.team_size) || 1
  const additionalMembersNeeded = teamSize - 1

  return (
    <>
      <Header />
      <div className="registration-page">
        <div className="back-link">
          <Link href={`/event-details/${eventId}`} className="back-button">
            ← Back to Event Details
          </Link>
        </div>

        <div className="registration-container">
          <div className="registration-header">
            <h1 className="registration-title">
              Event <span className="highlight">Registration</span>
            </h1>
            <p className="registration-subtitle">
              {event ? (
                <>Secure your spot for <strong>{event.title}</strong>. Fill out the form below to register.</>
              ) : (
                'Secure your spot. Fill out the form below to register.'
              )}
            </p>
          </div>

          {event && event.amount && event.amount > 0 && (
            <div className="payment-notice">
              <p>Registration Fee: <strong>₹{event.amount}</strong></p>
              <p className="payment-note">You will be redirected to payment gateway after registration.</p>
            </div>
          )}

          {submitError && (
            <div className="error-message">
              <p>Error: {submitError}</p>
              {submitError.includes('payment') && registrationData && (
                <button 
                  onClick={() => handlePayment(registrationData._id)} 
                  className="retry-payment-btn"
                >
                  Retry Payment
                </button>
              )}
            </div>
          )}

          <form className="registration-form" onSubmit={handleSubmit}>
            {event && (
              <div className="form-group full-width event-info">
                <div className="event-display">
                  <span className="event-badge">{event.mode || 'Offline'}</span>
                  <span className="event-name">{event.title}</span>
                  {event.amount && event.amount > 0 && (
                    <span className="event-price">₹{event.amount}</span>
                  )}
                </div>
              </div>
            )}

            {/* Team Leader Details */}
            <div className="form-group full-width">
              <label className="form-label">
                Team Leader Name<span className="required">*</span>
              </label>
              <input
                type="text"
                name="leader_name"
                className="form-input"
                value={formData.leader_name}
                onChange={handleChange}
                required
                disabled={submitting}
                placeholder="Enter team leader's full name"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="leader_email" className="form-label">
                  Leader Email<span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="leader_email"
                  name="leader_email"
                  className="form-input"
                  value={formData.leader_email}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  placeholder="leader@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="leader_phone" className="form-label">
                  Leader Phone<span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="leader_phone"
                  name="leader_phone"
                  className="form-input"
                  value={formData.leader_phone}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  placeholder="9876543210"
                />
              </div>
            </div>

            {/* Team Name (Optional) */}
            <div className="form-group full-width">
              <label htmlFor="team_name" className="form-label">
                Team Name (Optional)
              </label>
              <input
                type="text"
                id="team_name"
                name="team_name"
                className="form-input"
                value={formData.team_name}
                onChange={handleChange}
                disabled={submitting}
                placeholder="Enter your team name"
              />
            </div>

            {/* Team Size */}
            <div className="form-group full-width">
              <label htmlFor="team_size" className="form-label">
                Team Size<span className="required">*</span>
              </label>
              <input
                type="number"
                id="team_size"
                name="team_size"
                className="form-input"
                value={formData.team_size}
                onChange={handleChange}
                required
                min="1"
                max="10"
                disabled={submitting}
              />
              <small className="field-hint">Includes team leader</small>
            </div>

            {/* College/University */}
            <div className="form-group full-width">
              <label htmlFor="college_university" className="form-label">
                College/University<span className="required">*</span>
              </label>
              <input
                type="text"
                id="college_university"
                name="college_university"
                className="form-input"
                value={formData.college_university}
                onChange={handleChange}
                required
                disabled={submitting}
                placeholder="Enter your college/university name"
              />
            </div>

            {/* Additional Team Members Section */}
            {additionalMembersNeeded > 0 && (
              <div className="form-group full-width team-members-section">
                <div className="team-members-header">
                  <label className="form-label">
                    Additional Team Members ({additionalMembersNeeded} required)
                  </label>
                  {formData.participants.length < additionalMembersNeeded && (
                    <button 
                      type="button" 
                      onClick={addParticipant}
                      className="add-member-btn"
                      disabled={submitting}
                    >
                      + Add Member
                    </button>
                  )}
                </div>
                
                {formData.participants.map((participant, index) => (
                  <div key={index} className="team-member-fields">
                    <div className="member-number">Member {index + 2}</div>
                    <button
                      type="button"
                      onClick={() => removeParticipant(index)}
                      className="remove-member-btn"
                      disabled={submitting || formData.participants.length <= 1}
                    >
                      ×
                    </button>
                    <input
                      type="text"
                      placeholder={`Member ${index + 2} Name`}
                      className="form-input"
                      value={participant.name}
                      onChange={(e) => handleParticipantChange(index, 'name', e.target.value)}
                      required
                      disabled={submitting}
                    />
                    <input
                      type="email"
                      placeholder={`Member ${index + 2} Email`}
                      className="form-input"
                      value={participant.email}
                      onChange={(e) => handleParticipantChange(index, 'email', e.target.value)}
                      required
                      disabled={submitting}
                    />
                    <input
                      type="tel"
                      placeholder={`Member ${index + 2} Phone`}
                      className="form-input"
                      value={participant.phone}
                      onChange={(e) => handleParticipantChange(index, 'phone', e.target.value)}
                      required
                      disabled={submitting}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Additional Information */}
            <div className="form-group full-width">
              <label htmlFor="additional_info" className="form-label">
                Additional Information
              </label>
              <textarea
                id="additional_info"
                name="additional_info"
                className="form-textarea"
                rows={4}
                placeholder="Any special requirements, dietary restrictions, or additional information..."
                value={formData.additional_info}
                onChange={handleChange}
                disabled={submitting}
              />
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : (event?.amount && event.amount > 0) ? 'Register & Proceed to Payment' : 'Register Now'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}