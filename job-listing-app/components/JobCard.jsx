'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function JobCard({ job, index }) {
  // Generate avatar with first letter of company name
  const getAvatarLetter = (company) => {
    return company ? company.charAt(0).toUpperCase() : 'J';
  };

  // Get badge color based on category
  const getBadgeClass = (category) => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('marketing')) return 'badge-orange';
    if (lowerCategory.includes('design')) return 'badge-yellow';
    if (lowerCategory.includes('it') || lowerCategory.includes('development')) return 'badge-purple';
    return 'badge-green';
  };

  return (
    <Link href={`/job/${index}`}>
      <div className="job-card mt-3">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {job.image ? (
              <img 
                src={job.image} 
                alt={`${job.company} logo`}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  // Fallback to letter avatar if image fails to load
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-white font-bold text-xl shadow-md"
              style={{ display: job.image ? 'none' : 'flex' }}
            >
              {getAvatarLetter(job.company)}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title and Company */}
            <h3 className="text-xl font-bold text-gray-900 mb-1 capitalize">
              {job.title}
            </h3>
            <p className="text-gray-500 text-sm mb-3">
              {job.company} • {job.about.location}
            </p>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
              {job.description}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-green">
                In Person
              </span>
              {job.about.categories && job.about.categories.map((category, idx) => (
                <span key={idx} className={`badge ${getBadgeClass(category)}`}>
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
