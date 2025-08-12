// src/components/HeaderControls.jsx
import React from 'react';

export default function HeaderControls({
  view,
  setView,
  search,
  setSearch,
  onClear,
}) {
  return (
    <div className='w-full items-center gap-3 flex-wrap'>
      {/* View toggle: always visible; more compact on small screens */}
      <div className='w-full flex gap-2 items-center justify-between'>
        <div className='flex gap-2 '>
          <button
            onClick={() => setView('skills')}
            aria-pressed={view === 'skills'}
            className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-sky-300 transition ${
              view === 'skills'
                ? 'bg-sky-600 text-white shadow'
                : 'bg-gray-100 dark:bg-white/5 text-gray-700'
            }`}
          >
            Skills
          </button>

          <button
            onClick={() => setView('tools')}
            aria-pressed={view === 'tools'}
            className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-sky-300 transition ${
              view === 'tools'
                ? 'bg-sky-600 text-white shadow'
                : 'bg-gray-100 dark:bg-white/5 text-gray-700'
            }`}
          >
            Tools
          </button>
        </div>

        <button
          onClick={onClear}
          aria-label='Clear all filters and search'
          className='px-3 py-1 rounded-full text-xs sm:text-sm bg-red-50 text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200'
        >
          Clear all
        </button>
      </div>

      {/* Search: full width on small screens, fixed on sm+ */}
      {/* <div className='relative flex w-full min-w-40 flex-wrap'>
        <input
          aria-label='Search skills and tools'
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={`Search — try "react", "ml", "docker"`}
          className='w-full min-w-20 rounded-lg border border-gray-200 dark:border-white/10 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300 bg-white/60 dark:bg-white/5 text-sm'
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            aria-label='Clear search'
            className='absolute right-1 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded-md bg-red-50 text-red-600'
          >
            Clear
          </button>
        )}
      </div> */}
    </div>
  );
}
