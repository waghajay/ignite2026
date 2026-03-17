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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  
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

  // Set initial team size based on minTeamSize from event
  useEffect(() => {
    if (event?.minTeamSize) {
      setFormData(prev => ({
        ...prev,
        team_size: event.minTeamSize || 1
      }))
    }
  }, [event])

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
    
    // Special handling for team_size
    if (name === 'team_size') {
      const numValue = value === '' ? 1 : Number(value)
      const minSize = event?.minTeamSize || 1
      const maxSize = event?.maxTeamSize || 10
      
      // Clamp the value between min and max
      if (!isNaN(numValue)) {
        const clampedValue = Math.min(Math.max(numValue, minSize), maxSize)
        setFormData(prev => ({
          ...prev,
          [name]: clampedValue
        }))
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleTeamSizeBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    const minSize = event?.minTeamSize || 1
    const maxSize = event?.maxTeamSize || 10
    
    // Ensure value is within bounds on blur
    if (isNaN(value) || value < minSize) {
      setFormData(prev => ({
        ...prev,
        team_size: minSize
      }))
    } else if (value > maxSize) {
      setFormData(prev => ({
        ...prev,
        team_size: maxSize
      }))
    }
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
    
    // Clear participant field error
    const errorKey = `participant_${index}_${field}`
    if (fieldErrors[errorKey]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[errorKey]
        return newErrors
      })
    }
  }

  const addParticipant = () => {
    const maxTeamSize = event?.maxTeamSize || 10
    const currentTotalMembers = formData.participants.length + 1 // +1 for leader
    
    if (currentTotalMembers < maxTeamSize) {
      setFormData(prev => ({
        ...prev,
        participants: [...prev.participants, { name: '', email: '', phone: '' }]
      }))
    }
  }

  const removeParticipant = (index: number) => {
    const minTeamSize = event?.minTeamSize || 1
    const newTotalMembers = formData.participants.length // removing one, leader is separate
    
    if (newTotalMembers >= minTeamSize - 1) {
      const updatedParticipants = formData.participants.filter((_, i) => i !== index)
      setFormData(prev => ({
        ...prev,
        participants: updatedParticipants
      }))
    }
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
    const errors: Record<string, string> = {}
    
    // Validate leader details
    if (!formData.leader_name.trim()) {
      errors.leader_name = 'Leader name is required'
    }
    
    if (!formData.leader_email.trim()) {
      errors.leader_email = 'Leader email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.leader_email)) {
      errors.leader_email = 'Please enter a valid email address'
    }
    
    if (!formData.leader_phone.trim()) {
      errors.leader_phone = 'Leader phone is required'
    } else if (!/^[0-9]{10}$/.test(formData.leader_phone.replace(/\D/g, ''))) {
      errors.leader_phone = 'Please enter a valid 10-digit phone number'
    }
    
    if (!formData.college_university.trim()) {
      errors.college_university = 'College/University is required'
    }

    const teamSize = Number(formData.team_size) || 1
    
    // Validate against min and max team size from event
    if (event?.minTeamSize && teamSize < event.minTeamSize) {
      errors.team_size = `Minimum team size for this event is ${event.minTeamSize}`
    }
    
    if (event?.maxTeamSize && teamSize > event.maxTeamSize) {
      errors.team_size = `Maximum team size for this event is ${event.maxTeamSize}`
    }

    // Validate team members
    if (teamSize > 1) {
      // Check if we have exactly (teamSize - 1) participants
      if (formData.participants.length !== teamSize - 1) {
        errors.participants = `Please add ${teamSize - 1} team member(s)`
      }
      
      formData.participants.forEach((participant, index) => {
        if (!participant.name.trim()) {
          errors[`participant_${index}_name`] = `Member ${index + 2} name is required`
        }
        if (!participant.email.trim()) {
          errors[`participant_${index}_email`] = `Member ${index + 2} email is required`
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(participant.email)) {
          errors[`participant_${index}_email`] = `Member ${index + 2} email is invalid`
        }
        if (!participant.phone.trim()) {
          errors[`participant_${index}_phone`] = `Member ${index + 2} phone is required`
        } else if (!/^[0-9]{10}$/.test(participant.phone.replace(/\D/g, ''))) {
          errors[`participant_${index}_phone`] = `Member ${index + 2} phone is invalid`
        }
      })
    }

    setFieldErrors(errors)
    
    if (Object.keys(errors).length > 0) {
      throw new Error('Please fix the validation errors')
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
      
      // Include leader in participants array
      const allParticipants = [
        {
          name: formData.leader_name,
          email: formData.leader_email,
          phone: formData.leader_phone
        },
        ...formData.participants
      ]

      const registrationData = {
        event: eventId,
        team_name: formData.team_name || undefined,
        team_size: teamSize,
        participants: allParticipants,
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
  const canAddMoreMembers = event?.maxTeamSize ? teamSize < event.maxTeamSize : teamSize < 10

  // Determine min and max team size from event data
  const minTeamSize = event?.minTeamSize || 1
  const maxTeamSize = event?.maxTeamSize || 10

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

          {/* Team Size Information */}
          {event && (event.minTeamSize || event.maxTeamSize) && (
            <div className="team-size-info">
              <p>
                {event.minTeamSize === event.maxTeamSize ? (
                  <>This event requires exactly <strong>{event.minTeamSize} member{event.minTeamSize && event.minTeamSize > 1 ? 's' : ''}</strong> per team.</>
                ) : (
                  <>Team size must be between <strong>{event.minTeamSize || 1}</strong> and <strong>{event.maxTeamSize || 10}</strong> members.</>
                )}
              </p>
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
                className={`form-input ${fieldErrors.leader_name ? 'error' : ''}`}
                value={formData.leader_name}
                onChange={handleChange}
                required
                disabled={submitting}
                placeholder="Enter team leader's full name"
              />
              {fieldErrors.leader_name && (
                <span className="field-error">{fieldErrors.leader_name}</span>
              )}
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
                  className={`form-input ${fieldErrors.leader_email ? 'error' : ''}`}
                  value={formData.leader_email}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  placeholder="leader@example.com"
                />
                {fieldErrors.leader_email && (
                  <span className="field-error">{fieldErrors.leader_email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="leader_phone" className="form-label">
                  Leader Phone<span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="leader_phone"
                  name="leader_phone"
                  className={`form-input ${fieldErrors.leader_phone ? 'error' : ''}`}
                  value={formData.leader_phone}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  placeholder="9876543210"
                />
                {fieldErrors.leader_phone && (
                  <span className="field-error">{fieldErrors.leader_phone}</span>
                )}
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
              <div className="team-size-input-wrapper">
                <button
                  type="button"
                  onClick={() => {
                    const newValue = Math.max((event?.minTeamSize || 1), Number(formData.team_size) - 1)
                    setFormData(prev => ({ ...prev, team_size: newValue }))
                  }}
                  className="team-size-btn"
                  disabled={submitting || Number(formData.team_size) <= (event?.minTeamSize || 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  id="team_size"
                  name="team_size"
                  className={`form-input team-size-input ${fieldErrors.team_size ? 'error' : ''}`}
                  value={formData.team_size}
                  onChange={handleChange}
                  onBlur={handleTeamSizeBlur}
                  required
                  min={minTeamSize}
                  max={maxTeamSize}
                  disabled={submitting}
                />
                <button
                  type="button"
                  onClick={() => {
                    const newValue = Math.min((event?.maxTeamSize || 10), Number(formData.team_size) + 1)
                    setFormData(prev => ({ ...prev, team_size: newValue }))
                  }}
                  className="team-size-btn"
                  disabled={submitting || Number(formData.team_size) >= (event?.maxTeamSize || 10)}
                >
                  +
                </button>
              </div>
              {fieldErrors.team_size ? (
                <span className="field-error">{fieldErrors.team_size}</span>
              ) : (
                <small className="field-hint">
                  Includes team leader {event?.minTeamSize && event?.maxTeamSize && 
                    `(Min: ${event.minTeamSize}, Max: ${event.maxTeamSize})`
                  }
                </small>
              )}
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
                className={`form-input ${fieldErrors.college_university ? 'error' : ''}`}
                value={formData.college_university}
                onChange={handleChange}
                required
                disabled={submitting}
                placeholder="Enter your college/university name"
              />
              {fieldErrors.college_university && (
                <span className="field-error">{fieldErrors.college_university}</span>
              )}
            </div>

            {/* Additional Team Members Section */}
            {additionalMembersNeeded > 0 && (
              <div className="form-group full-width team-members-section">
                <div className="team-members-header">
                  <label className="form-label">
                    Additional Team Members ({additionalMembersNeeded} required)
                  </label>
                  {formData.participants.length < additionalMembersNeeded && canAddMoreMembers && (
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
                    
                    <div className="participant-field">
                      <input
                        type="text"
                        placeholder={`Member ${index + 2} Name`}
                        className={`form-input ${fieldErrors[`participant_${index}_name`] ? 'error' : ''}`}
                        value={participant.name}
                        onChange={(e) => handleParticipantChange(index, 'name', e.target.value)}
                        required
                        disabled={submitting}
                      />
                      {fieldErrors[`participant_${index}_name`] && (
                        <span className="field-error">{fieldErrors[`participant_${index}_name`]}</span>
                      )}
                    </div>
                    
                    <div className="participant-field">
                      <input
                        type="email"
                        placeholder={`Member ${index + 2} Email`}
                        className={`form-input ${fieldErrors[`participant_${index}_email`] ? 'error' : ''}`}
                        value={participant.email}
                        onChange={(e) => handleParticipantChange(index, 'email', e.target.value)}
                        required
                        disabled={submitting}
                      />
                      {fieldErrors[`participant_${index}_email`] && (
                        <span className="field-error">{fieldErrors[`participant_${index}_email`]}</span>
                      )}
                    </div>
                    
                    <div className="participant-field">
                      <input
                        type="tel"
                        placeholder={`Member ${index + 2} Phone`}
                        className={`form-input ${fieldErrors[`participant_${index}_phone`] ? 'error' : ''}`}
                        value={participant.phone}
                        onChange={(e) => handleParticipantChange(index, 'phone', e.target.value)}
                        required
                        disabled={submitting}
                      />
                      {fieldErrors[`participant_${index}_phone`] && (
                        <span className="field-error">{fieldErrors[`participant_${index}_phone`]}</span>
                      )}
                    </div>
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