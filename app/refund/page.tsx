'use client'

import Link from 'next/link'

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900/20 to-yellow-900/20 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-red-500 hover:text-red-400 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 
            className="text-5xl md:text-6xl mb-4" 
            style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}
          >
            <span className="text-red-500">Refund</span>{' '}
            <span className="text-white">Policy</span>
          </h1>
          <p className="text-gray-400" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Last updated: March 12, 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <section>
            <h2 
              className="text-3xl text-yellow-500 mb-4" 
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}
            >
              1. General Refund Policy
            </h2>
            <p className="text-gray-300 leading-relaxed font-semibold" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              All event registrations and payments made to IGNITE Student Association are non-refundable under any circumstances.
            </p>
          </section>

          <section>
            <h2 
              className="text-3xl text-yellow-500 mb-4" 
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}
            >
              2. No Refund Policy
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              Please note that refunds will not be issued for:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              <li>Event cancellations by participants</li>
              <li>No-show or failure to attend registered events</li>
              <li>Change of mind after registration</li>
              <li>Personal scheduling conflicts</li>
              <li>Any other reason after payment is completed</li>
            </ul>
          </section>

          <section>
            <h2 
              className="text-3xl text-yellow-500 mb-4" 
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}
            >
              3. Event Cancellation by IGNITE
            </h2>
            <p className="text-gray-300 leading-relaxed" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              If an event is cancelled by IGNITE Student Association due to unforeseen circumstances, participants will receive a full refund of their registration fee within 7-10 business days. Alternatively, participants may choose to transfer their registration to a future event.
            </p>
          </section>

          <section>
            <h2 
              className="text-3xl text-yellow-500 mb-4" 
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}
            >
              4. Special Circumstances
            </h2>
            <p className="text-gray-300 leading-relaxed" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              Only the most exceptional and special cases will be considered for refund after thorough scrutiny by the IGNITE management team. Such cases require proper documentation and are subject to approval at the sole discretion of the organization. There is no guarantee of refund approval even in special circumstances.
            </p>
          </section>

          <section>
            <h2 
              className="text-3xl text-yellow-500 mb-4" 
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}
            >
              5. Transfer Policy
            </h2>
            <p className="text-gray-300 leading-relaxed" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              If you cannot attend an event, you may transfer your registration to another person up to 48 hours before the event start time. Transfer requests must be submitted in writing with the new participant's details. This is the only alternative to cancellation.
            </p>
          </section>

          <section>
            <h2 
              className="text-3xl text-yellow-500 mb-4" 
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}
            >
              6. Payment Acknowledgment
            </h2>
            <p className="text-gray-300 leading-relaxed" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              By completing payment for any event or service, you acknowledge and accept this no-refund policy. Please ensure you are certain about your participation before making payment.
            </p>
          </section>

          <section>
            <h2 
              className="text-3xl text-yellow-500 mb-4" 
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}
            >
              7. Contact Information
            </h2>
            <p className="text-gray-300 leading-relaxed" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              For any inquiries regarding this policy or to discuss exceptional circumstances, please contact us at ignitestudentassociation@gmail.com or call +91 7387883221. Our team will respond within 2-3 business days.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <Link 
            href="/" 
            className="inline-block bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg transition-colors"
            style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 500 }}
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
