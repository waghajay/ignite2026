'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import './registration.css'

const eventNames: { [key: string]: string } = {
  'debugging-fix-win': 'Debugging: Fix and Win',
  'promptx': 'PromptX',
  'clashiq': 'ClashIQ',
  'yuva-manthan': 'Yuva Manthan',
  'red-zone-challenge': 'Red Zone Challenge',
  'inspira': 'Inspira',
  'cinecraft': 'CineCraft',
  'e-sports': 'E Sports'
}

export default function Registration() {
  const params = useParams()
  const eventId = params?.eventId as string
  const [formData, setFormData] = useState({
    event: eventId || '',
    fullName: '',
    email: '',
    phone: '',
    college: '',
    teamSize: '',
    additionalInfo: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    alert('Registration submitted successfully! We will contact you soon.')
  }

  return (
    <>
      <Header />
      <div className="registration-page">
      <div className="back-link">
        <Link href={`/events/${eventId}`} className="back-button">
          ← Back to Event Details
        </Link>
      </div>

      <div className="registration-container">
        <div className="registration-header">
          <h1 className="registration-title">
            Event <span className="highlight">Registration</span>
          </h1>
          <p className="registration-subtitle">
            Secure your spot for {eventNames[eventId] || 'the event'}. Fill out the form below to register.
          </p>
        </div>

        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-group full-width">
            <label htmlFor="event" className="form-label">
              Select Event<span className="required">*</span>
            </label>
            <select
              id="event"
              name="event"
              className="form-input"
              value={formData.event}
              onChange={handleChange}
              required
            >
              <option value="">Select an event</option>
              <option value="debugging-fix-win">Debugging: Fix and Win</option>
              <option value="promptx">PromptX</option>
              <option value="clashiq">ClashIQ</option>
              <option value="yuva-manthan">Yuva Manthan</option>
              <option value="red-zone-challenge">Red Zone Challenge</option>
              <option value="inspira">Inspira</option>
              <option value="cinecraft">CineCraft</option>
              <option value="e-sports">E Sports</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">
                Full Name<span className="required">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="form-input"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address<span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number<span className="required">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-input"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="college" className="form-label">
                College/University<span className="required">*</span>
              </label>
              <input
                type="text"
                id="college"
                name="college"
                className="form-input"
                value={formData.college}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="teamSize" className="form-label">
              Team Size (if applicable)
            </label>
            <input
              type="text"
              id="teamSize"
              name="teamSize"
              className="form-input"
              placeholder="e.g., 4 members for team events"
              value={formData.teamSize}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="additionalInfo" className="form-label">
              Additional Information
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              className="form-textarea"
              rows={5}
              placeholder="Any special requirements, dietary restrictions, or additional information..."
              value={formData.additionalInfo}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-button">
            Register Now
          </button>
        </form>
      </div>
    </div>
    </>
  )
}