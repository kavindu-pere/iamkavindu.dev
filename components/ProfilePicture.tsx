'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProfilePictureProps {
  src?: string;
  alt: string;
  className?: string;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ 
  src = '/profilepicture.png', 
  alt,
  className = "w-48 h-48 md:w-64 md:h-64" 
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`${className} rounded-full bg-slate-200 border-4 border-slate-800 overflow-hidden flex items-center justify-center`}>
      {src && !imageError ? (
        <Image 
          src={src} 
          alt={alt} 
          width={256} 
          height={256} 
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
          priority // Add priority to load image early
        />
      ) : (
        <svg 
          className="w-24 h-24 text-slate-400" 
          fill="currentColor"
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
        </svg>
      )}
    </div>
  );
};

export default ProfilePicture;