// src/components/CodingProfileCard.jsx
import React from 'react';

export default function CodingProfileCard({ p }) {
  return (
    <a
      href={p.link}
      target='_blank'
      rel='noreferrer'
      className='group block p-2 rounded-lg bg-white/60 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:shadow-md shadow-md shadow-cyan-500 transition-all'
    >
      <div className='flex items-center gap-3 flex-col'>
        <div className='rounded-lg overflow-hidden border-2 border-gray-200 dark:border-white/20'>
          <img
            src={p.image}
            alt={p.name}
            className='w-full h-full object-cover'
          />
        </div>
        <div>
          <div className='font-semibold text-sm text-gray-900 dark:text-white'>
            {p.name}
          </div>
          <div className='text-[12px] text-gray-600 dark:text-gray-300'>
            {p.description}
          </div>
        </div>
      </div>
    </a>
  );
}
