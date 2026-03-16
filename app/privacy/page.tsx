'use client'

import Link from 'next/link'

export default function PrivacyPolicy() {
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
            <span className="text-red-500">Privacy</span>{' '}
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
              1. Information We Collect
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              <li>Name, email address, and contact information</li>
              <li>Student ID and academic information</li>
              <li>Event registration and participation data</li>
              <li>Payment information for event fees</li>
              <li>Communications and feedback you provide</li>
            </ul>
          </section>

          <section>
            <h2 
              className="text-3xl text-yellow-500 mb-4" 
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}
            >
              2. How We Use Your Information
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              <li>Process event registrations and manage participation</li>
              <li>Send event updates and important announcements</li>
              <li>Improve our services and user experience</li>
              <li>Respond to your inquiries and provide support</li>
              <li>Analyze usage patterns and trends</li>
            </ul>
          </section>

          <section>
            <h2 
              className="text-3xl text-yellow-500 mb-4" 
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}
            >
              3. Information Sharing
            </h2>
            <p className="text-gray-300 leading-relaxed" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-3" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>With service providers who assist in our operations</li>
              <li>To protect the rights and safety of our members</li>
            </ul>
          </section>

          <section>
            <h2 
              className="text-3xl text-yellow-500 mb-4" 
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}
            >
              4. Data Security
            </h2>
            <p className="text-gray-300 leading-relaxed" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 
              className="text-3xl text-yellow-500 mb-4" 
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}
            >
              5. Cookies and Tracking
            </h2>
            <p className="text-gray-300 leading-relaxed" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 
              className="text-3xl text-yellow-500 mb-4" 
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}
            >
              6. Your Rights
            </h2>
            <p className="text-gray-300 leading-relaxed mb-3" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              <li>Access and review your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 
              className="text-3xl text-yellow-500 mb-4" 
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}
            >
              7. Changes to Privacy Policy
            </h2>
            <p className="text-gray-300 leading-relaxed" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 
              className="text-3xl text-yellow-500 mb-4" 
              style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}
            >
              8. Contact Us
            </h2>
            <p className="text-gray-300 leading-relaxed" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 300 }}>
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at ignitestudentassociation@gmail.com or call +91 7666679366.
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
