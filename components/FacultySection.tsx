'use client'

import Image from 'next/image';

export default function FacultySection() {
  const facultyMembers = [
    {
      name: 'Dr. Kavita Bhosle',
      designation: 'Head Of Department, ESTD',
      image: '/images/hod.png',
    },
    {
      name: 'Dr. Dipa Dharmadhikari',
      designation: 'Professor, ESTD',
      image: '/images/dipa.png',
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-1000">
      <div className="max-w-6xl mx-auto">
        <div className="border border-yellow-600 rounded-3xl p-12">
          <h2 
            className="text-4xl text-center mb-12" 
            style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}
          >
            <span className="text-yellow-500">Faculty</span>{' '}
            <span className="text-white">Cordinator</span>
          </h2>

          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
            {facultyMembers.map((member, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 
                    className="text-xl text-white mb-1" 
                    style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}
                  >
                    {member.name}
                  </h3>
                  <p 
                    className="text-gray-400" 
                    style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 400 }}
                  >
                    {member.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
