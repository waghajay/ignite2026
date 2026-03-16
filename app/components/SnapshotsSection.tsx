'use client'

import Image from 'next/image';

export default function SnapshotsSection() {
  const snapshots = [
    '/images/snapshot1.jpeg',
    '/images/snapshot2.jpeg',
    '/images/snapshot3.jpeg',
    '/images/snapshot1.jpeg',
    '/images/snapshot2.jpeg',
    '/images/snapshot3.jpeg',
  ];

  return (
    <section className="py-16 px-4 bg-gray-1000 overflow-hidden">
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .scroll-container {
          display: flex;
          animation: scroll 30s linear infinite;
          width: fit-content;
        }

        .scroll-container:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto mb-12">
        <h2 
          className="text-5xl text-center text-yellow-500" 
          style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}
        >
          Snapshots
        </h2>
      </div>

      <div className="relative">
        <div className="scroll-container">
          {[...snapshots, ...snapshots].map((snapshot, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-4"
              style={{ width: '400px', height: '300px' }}
            >
              <div className="w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 p-1">
                <div className="w-full h-full rounded-3xl overflow-hidden">
                  <Image
                    src={snapshot}
                    alt={`Snapshot ${(index % snapshots.length) + 1}`}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
