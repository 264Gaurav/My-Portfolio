// src/components/SmallCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaCode } from 'react-icons/fa';

export default function SmallCard({ item }) {
  const Icon = item.icon || FaCode;
  return (
    <motion.div
      layout
      whileHover={{ scale: 1.03 }}
      className='box-border w-20 h-20 md:w-25 group bg-white/70 dark:bg-white/3 rounded-xl p-2 flex flex-col items-center text-center border border-gray-100 dark:border-white/5 shadow-sm'
      title={item.name}
      role='article'
      tabIndex={0}
    >
      <div className='p-1 rounded-md bg-white dark:bg-white/6 shadow-sm mb-1 w-10 h-10 flex items-center justify-center'>
        <Icon className='w-5 h-5' aria-hidden />
      </div>
      <div className='text-xs font-semibold text-gray-900 dark:text-white truncate'>
        {item.name}
      </div>
      {/* <div className='mt-1 flex gap-1 flex-wrap justify-center'>
        {(item.categories || []).slice(0, 2).map(c => (
          <span
            key={c}
            className='text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600'
          >
            {c}
          </span>
        ))}
      </div> */}
    </motion.div>
  );
}
