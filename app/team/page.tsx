'use client'

import Image from 'next/image'
import Header from '@/components/Header'
import './team.css'

export default function TeamPage() {
  return (
    <div className="team-page">
      {/* 3D Background Elements */}
      <div className="team-background">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-orb orb-3"></div>
      </div>

      {/* Navigation - Shared Header */}
      <Header />

      {/* Main Content */}
      <div className="team-content">
        {/* Title */}
        <h1 className="team-title">
          <span className="team-title-yellow">The People</span>{' '}
          <span className="team-title-white">Behind IGNITE</span>
        </h1>

        {/* Description Paragraphs */}
        <div className="team-description">
          <p>
            At IGNITE Student Association, our strength lies in our passionate, dedicated, and visionary 
            team members. Together, we collaborate to organize impactful events, foster innovation, and 
            create meaningful student experiences.
          </p>

          <p>
            Our team consists of faculty mentors, core leaders, and dynamic student coordinators who 
            work tirelessly behind the scenes.
          </p>
        </div>

        {/* Team Image Section */}
        <div className="team-image-container">
          <div className="team-image-wrapper">
            <Image
              src="/images/team1.png"
              alt="IGNITE Team"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            
            {/* Overlay Text */}
            <div className="team-image-overlay">
              <h2 className="team-image-title">
                <span className="team-image-title-white">Our </span>
                <span className="team-image-title-yellow">Family</span>
              </h2>
              <p className="team-image-subtitle">
                The people who make IGNITE what it is
              </p>
            </div>

            {/* Gradient overlay for better text visibility */}
            <div className="team-gradient-overlay"></div>
          </div>
        </div>

        {/* Faculty Mentors Section */}
        <div className="team-section">
          <h2 className="section-title">
            <span className="title-white">Faculty </span>
            <span className="title-yellow">Mentors</span>
          </h2>
          <div className="faculty-card">
            <div className="faculty-image-placeholder">
              <Image src="/images/dipa.png" alt="Core Member" width={150} height={150} className="member-image" />
              <div className="member-info">
                <h3 className="faculty-name">Dr. Dipa Dharmadhikari</h3>
                <p className="faculty-designation">Professor, ESTD</p>
              </div>

            </div>
            <h3 className="faculty-name">Dr. Dipa Dharmadhikari</h3>
            <p className="faculty-designation">Professor, ESTD</p>
          </div>
        </div>

        {/* The Core Section */}
        <div className="team-section">
          <h2 className="section-title">
            <span className="title-white">The </span>
            <span className="title-yellow">Core</span>
          </h2>
          <div className="core-grid">
            <div className="team-member">
              <Image src="/images/president.png" alt="Core Member" width={150} height={150} className="member-image" />
              <div className="member-info">
                <h4 className="member-name">Harsh Bhamare</h4>
                <p className="member-designation">President</p>
              </div>
            </div>
            <div className="team-member">
              <Image src="/images/rasika.png" alt="Core Member" width={150} height={150} className="member-image" />
              <div className="member-info">
                <h4 className="member-name">Rasika Mahulkar</h4>
                <p className="member-designation">Vice President</p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Team & Design Team */}
        <div className="teams-row">
          <div className="team-group">
            <h3 className="team-group-title">Technical Team</h3>
            <div className="team-grid">
              <div className="team-member">
                <Image src="/images/president.png" alt="Technical Team" width={150} height={150} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Ajay Wagh</h4>
                  <p className="member-designation">Lead</p>
                </div>
              </div>
              <div className="team-member">
                <Image src="/images/ajinkyaG.jpeg" alt="Technical Team" width={150} height={150} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Ajinkya Ghuge</h4>
                  <p className="member-designation">Co-Lead</p>
                </div>
              </div>
              <div className="team-member">
                <Image src="/images/president.png" alt="Technical Team" width={150} height={150} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Vijay Nagargoje</h4>
                  <p className="member-designation">Co-Lead</p>
                </div>
              </div>
            </div>
          </div>

          <div className="team-group">
            <h3 className="team-group-title">Design Team</h3>
            <div className="team-grid">
              <div className="team-member">
                <Image src="/images/pratikKakde.png" alt="Design Team" width={150} height={150} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Pratik Kakde</h4>
                  <p className="member-designation">Lead</p>
                </div>
              </div>
              <div className="team-member">
                <Image src="/images/pratiksha_k.png" alt="Design Team" width={150} height={150} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Pratiksha Kate</h4>
                  <p className="member-designation">Co-Lead</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event, Finance & Support Teams */}
        <div className="teams-row">
          <div className="team-group">
            <h3 className="team-group-title">Event Team</h3>
            <div className="team-grid">
              <div className="team-member">
                <Image src="/images/vivek.jpeg" alt="Event Team" width={150} height={150} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Vivek Parande</h4>
                  <p className="member-designation">Lead</p>
                </div>
              </div>
              <div className="team-member">
                <Image src="/images/sandesh.png" alt="Event Team" width={150} height={150} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Sandesh Ghule</h4>
                  <p className="member-designation">Co-Lead</p>
                </div>
              </div>
            </div>
          </div>

          <div className="team-group">
            <h3 className="team-group-title">Finance Team</h3>
            <div className="team-grid">
              <div className="team-member">
                <Image src="/images/ayush.png" alt="Finance Team" width={150} height={150} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Ayush Mahtole</h4>
                  <p className="member-designation">Finance Manager</p>
                </div>
              </div>
            </div>
          </div>

          <div className="team-group">
            <h3 className="team-group-title">Support Team</h3>
            <div className="team-grid">
              <div className="team-member">
                <Image src="/images/jayR.png" alt="Support Team" width={150} height={150} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Jay Rindhe</h4>
                  <p className="member-designation">Lead</p>
                </div>
              </div>
              <div className="team-member">
                <Image src="/images/sai.png" alt="Support Team" width={150} height={150} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Sai Bembalge</h4>
                  <p className="member-designation">Co-Lead</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Media & Web Dev Teams */}
        <div className="teams-row">
          <div className="team-group">
            <h3 className="team-group-title">Media Team</h3>
            <div className="team-grid">
              <div className="team-member">
                <Image src="/images/pranjali.jpeg" alt="Media Team" width={150} height={150} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Pranjali Gadekar</h4>
                  <p className="member-designation">Lead</p>
                </div>
              </div>
              <div className="team-member">
                <Image src="/images/komal.png" alt="Media Team" width={150} height={150} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Komal Kharat</h4>
                  <p className="member-designation">Co-Lead</p>
                </div>
              </div>
            </div>
          </div>

          <div className="team-group">
            <h3 className="team-group-title">Web Dev Team</h3>
            <div className="team-grid">
              <div className="team-member">
                <Image src="/images/rohit.png" alt="Web Dev Team" width={150} height={150} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Rohit Mahadhane</h4>
                  <p className="member-designation">Lead</p>
                </div>
              </div>
              <div className="team-member">
                <Image src="/images/saurav.jpeg" alt="Web Dev Team" width={150} height={150} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Saurav Ambhore</h4>
                  <p className="member-designation">Co-Lead</p>
                </div>
              </div>
              <div className="team-member">
                <Image src="/images/sneha.png" alt="Web Dev Team" width={150} height={150} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Sneha Shahane</h4>
                  <p className="member-designation">Co-Lead</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marketing, Social Media & Content Teams */}
        <div className="teams-row">
          <div className="team-group">
            <h3 className="team-group-title">Marketing Team</h3>
            <div className="team-grid">
              <div className="team-member">
                <Image src="/images/shivam.png" alt="Marketing Team" width={150} height={150} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Shivam Ghante</h4>
                  <p className="member-designation">Lead</p>
                </div>
              </div>
            </div>
          </div>

          <div className="team-group">
            <h3 className="team-group-title">Social media Team</h3>
            <div className="team-grid">
              <div className="team-member">
                <Image src="/images/radhika.png" alt="Social Media Team" width={150} height={150} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Radhika Varade</h4>
                  <p className="member-designation">Lead</p>
                </div>
              </div>
            </div>
          </div>

          <div className="team-group">
            <h3 className="team-group-title">Content Team</h3>
            <div className="team-grid">
              <div className="team-member">
                <Image src="/images/onkar.png" alt="Content Team" width={150} height={150} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Onkar Tanpure</h4>
                  <p className="member-designation">Lead</p>
                </div>
              </div>
              <div className="team-member">
                <Image src="/images/ishan.png" alt="Content Team" width={150} height={150} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Ishan Chipate</h4>
                  <p className="member-designation">Co-Lead</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Executives Section */}
        <div className="executives-section">
          <div className="executives-container">
            <div className="executives-title-vertical">
              The Executives
            </div>
            
            <div className="executives-grid">
              {/* Row 1 - 5 members */}
              <div className="team-member">
                <Image src="/images/shraddha.png" alt="Executive" width={200} height={200} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Shraddha Magar</h4>
                  <p className="member-designation">Executive</p>
                </div>
              </div>
              <div className="team-member">
                <Image src="/images/ketan.png" alt="Executive" width={200} height={200} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Ketan Kale</h4>
                  <p className="member-designation">Executive</p>
                </div>
              </div>
              <div className="team-member">
                <Image src="/images/sakshi.png" alt="Executive" width={200} height={200} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Sakshi Himapalnerkar</h4>
                  <p className="member-designation">Executive</p>
                </div>
              </div>
              <div className="team-member">
                <Image src="/images/daksh.png" alt="Executive" width={200} height={200} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Darshan Chavan</h4>
                  <p className="member-designation">Executive</p>
                </div>
              </div>
              <div className="team-member">
                <Image src="/images/krish.png" alt="Executive" width={200} height={200} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Krish Pachode</h4>
                  <p className="member-designation">Executive</p>
                </div>
              </div>

              {/* Row 2 - 5 members */}
              <div className="team-member">
                <Image src="/images/divya.png" alt="Executive" width={200} height={200} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Divya Waghmode</h4>
                  <p className="member-designation">Executive</p>
                </div>
              </div>
              <div className="team-member">
                <Image src="/images/pratikT.jpeg" alt="Executive" width={200} height={200} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Pratik Tayde</h4>
                  <p className="member-designation">Executive</p>
                </div>
              </div>
              <div className="team-member">
                <Image src="/images/tulsi.png" alt="Executive" width={200} height={200} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Tulsi Gundewar</h4>
                  <p className="member-designation">Executive</p>
                </div>
              </div>
              <div className="team-member">
                <Image src="/images/harshal.png" alt="Executive" width={200} height={200} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Harshal Gondekar</h4>
                  <p className="member-designation">Executive</p>
                </div>
              </div>
              <div className="team-member">
                <Image src="/images/payal.png" alt="Executive" width={200} height={200} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Payal Ghuge</h4>
                  <p className="member-designation">Executive</p>
                </div>
              </div>

              {/* Row 3 - 3 members */}
              <div className="team-member">
                <Image src="/images/shrinivas.png" alt="Executive" width={200} height={200} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Shrinivas Pampatwar</h4>
                  <p className="member-designation">Executive</p>
                </div>
              </div>
              <div className="team-member">
                <Image src="/images/aarya.png" alt="Executive" width={200} height={200} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Aarya Mitkar</h4>
                  <p className="member-designation">Executive</p>
                </div>
              </div>
              <div className="team-member">
                <Image src="/images/aniket.jpeg" alt="Executive" width={200} height={200} className="member-image" />
                <div className="member-info">
                  <h4 className="member-name">Aniket Ghundre</h4>
                  <p className="member-designation">Executive</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
