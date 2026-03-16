'use client'

import Link from 'next/link'

export default function TermsAndConditions() {
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
            <span className="text-red-500">Terms and</span>{' '}
            <span className="text-white">Conditions</span>
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
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-300 leading-relaxed" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              By accessing and using the IGNITE Student Association website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 
              className="text-3xl text-yellow-500 mb-4" 
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}
            >
              2. Event Registration
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              When registering for events through our platform:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              <li>You must provide accurate and complete information</li>
              <li>Registration is subject to availability and approval</li>
              <li>You are responsible for maintaining the confidentiality of your account</li>
              <li>Event fees, if applicable, must be paid within the specified timeframe</li>
            </ul>
          </section>

          <section>
            <h2 
              className="text-3xl text-yellow-500 mb-4" 
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}
            >
              3. Code of Conduct
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              All participants are expected to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              <li>Treat all members with respect and dignity</li>
              <li>Refrain from any form of harassment or discrimination</li>
              <li>Follow event-specific rules and guidelines</li>
              <li>Respect intellectual property rights</li>
            </ul>
          </section>

          <section>
            <h2 
              className="text-3xl text-yellow-500 mb-4" 
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}
            >
              4. Intellectual Property
            </h2>
            <p className="text-gray-300 leading-relaxed" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              All content on this website, including text, graphics, logos, and images, is the property of IGNITE Student Association and protected by copyright laws. Unauthorized use or reproduction is prohibited.
            </p>
          </section>

          <section>
            <h2 
              className="text-3xl text-yellow-500 mb-4" 
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}
            >
              5. Limitation of Liability
            </h2>
            <p className="text-gray-300 leading-relaxed" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              IGNITE Student Association shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of our services or participation in our events.
            </p>
          </section>

          <section>
            <h2 
              className="text-3xl text-yellow-500 mb-4" 
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}
            >
              6. Changes to Terms
            </h2>
            <p className="text-gray-300 leading-relaxed" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services constitutes acceptance of the modified terms.
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
              For questions about these Terms and Conditions, please contact us at ignitestudentassociation@gmail.com or call +91 7387883221.
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
