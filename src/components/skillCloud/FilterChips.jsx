// src/components/skillCloud/FilterChips.jsx
import React from 'react';
import { FaCheck } from 'react-icons/fa';

/**
 * Multi-select filter chips.
 * props:
 * - filters: array of strings (e.g. ['all','frontend',...])
 * - active: array of selected strings OR single string (backwards compatible)
 * - onChange: function(nextActiveArray)
 */
export default function FilterChips({ filters, active, onChange }) {
  const activeArr = Array.isArray(active) ? active : [active];

  function handleClick(f) {
    // Clicking 'all' resets to ['all']
    if (f === 'all') {
      onChange(['all']);
      return;
    }

    // drop 'all' if present and toggle this filter
    let next = activeArr.filter(a => a !== 'all');
    if (next.includes(f)) next = next.filter(a => a !== f);
    else next = [...next, f];

    // fallback to 'all' if nothing selected
    if (next.length === 0) next = ['all'];
    onChange(next);
  }

  function handleKey(e, f) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(f);
    }
  }

  return (
    <div className='flex gap-2 overflow-x-auto p-2'>
      {filters.map(f => {
        const isActive = activeArr.includes(f);
        return (
          <button
            key={f}
            onClick={() => handleClick(f)}
            onKeyDown={e => handleKey(e, f)}
            className={`flex items-center text-white gap-2 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-sky-300 transition ${
              isActive
                ? 'bg-sky-600 text-white shadow-md ring-1 ring-sky-300'
                : 'bg-gray-100 dark:bg-white/5 text-gray-700 hover:bg-gray-200'
            }`}
            aria-pressed={isActive}
            aria-label={`${f} filter ${isActive ? 'selected' : 'not selected'}`}
            title={f}
          >
            {/* show check for active—for compactness it's small */}
            {/* <span className='flex items-center justify-center w-4 h-4'>
              {isActive ? <FaCheck className='w-3 h-3' aria-hidden /> : null}
            </span> */}
            <span className='capitalize'>{f}</span>
          </button>
        );
      })}
    </div>
  );
}

// import React from 'react';

// export default function FilterChips({ filters, active, onChange }) {
//   return (
//     <div className='flex gap-2 overflow-x-auto p-2'>
//       {filters.map(f => (
//         <button
//           key={f}
//           onClick={() => onChange(f)}
//           className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 text-white focus:outline-none focus:ring-2 focus:ring-sky-300 ${
//             active === f
//               ? 'bg-sky-600 text-white'
//               : 'bg-gray-100 dark:bg-white/5 text-gray-700'
//           }`}
//           aria-pressed={active === f}
//         >
//           {f}
//         </button>
//       ))}
//     </div>
//   );
// }
