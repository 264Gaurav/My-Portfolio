// src/sections/SkillCloud.jsx
import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

import SmallCard from '../components/skillCloud/SmallCard';
import FilterChips from '../components/skillCloud/FilterChips';
import HeaderControls from '../components/skillCloud/HeaderControls';
import CodingProfileCard from '../components/skillCloud/CodingProfileCard';

import useDebouncedValue from '../hooks/useDebouncedValue';
import matchQuery from '../utils/matchQuery';

import {
  SKILL_CATEGORIES,
  TOOL_CATEGORIES,
  skills,
  tools,
  codingProfiles,
} from '../components/skillCloud/skillsData';

export default function SkillCloud() {
  const [view, setView] = useState('skills'); // 'skills' or 'tools'
  const [search, setSearch] = useState('');
  // arrays for multi-select; default to ['all']
  const [skillFilter, setSkillFilter] = useState(['all']);
  const [toolFilter, setToolFilter] = useState(['all']);

  const debouncedSearch = useDebouncedValue(search, 180);

  const items = view === 'skills' ? skills : tools;
  const activeFilter = view === 'skills' ? skillFilter : toolFilter;
  const FILTERS = view === 'skills' ? SKILL_CATEGORIES : TOOL_CATEGORIES;

  const filtered = useMemo(() => {
    const sel = Array.isArray(activeFilter) ? activeFilter : [activeFilter];
    return items.filter(it => {
      const matchesQuery = matchQuery(it, debouncedSearch);

      // if 'all' selected, accept all items; otherwise intersection check
      const matchesFilter =
        sel.includes('all') || (it.categories || []).some(c => sel.includes(c));

      return matchesQuery && matchesFilter;
    });
  }, [items, debouncedSearch, activeFilter]);

  const clearAll = () => {
    setSearch('');
    setSkillFilter(['all']);
    setToolFilter(['all']);
  };

  // remove a single filter (used by active pill 'x')
  function removeFilter(f) {
    if (view === 'skills') {
      const next = (skillFilter || []).filter(x => x !== f && x !== 'all');
      setSkillFilter(next.length ? next : ['all']);
    } else {
      const next = (toolFilter || []).filter(x => x !== f && x !== 'all');
      setToolFilter(next.length ? next : ['all']);
    }
  }

  // helper to render active pills (excluding 'all')
  const activePills = (
    Array.isArray(activeFilter) ? activeFilter : [activeFilter]
  ).filter(a => a !== 'all');

  return (
    <section
      id='skills'
      className='mt-8 md:rounded-xl py-8 rounded-xl mb-4 shadow-md shadow-cyan-600 bg-white/60 dark:bg-white/3'
    >
      <div className='max-w-6xl mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className='flex items-center justify-between gap-4 mb-4 flex-wrap'
        >
          <div className='flex gap-2'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
              Skills / Tools
            </h2>
            <div className='text-sm text-blue-400 mt-1'>
              {filtered.length} result{filtered.length === 1 ? '' : 's'}
              {activePills.length > 0 && (
                <span className='ml-2 text-red-500'>• filtering by</span>
              )}
            </div>
          </div>

          <div className='flex w-full items-center gap-2'>
            <HeaderControls
              view={view}
              setView={setView}
              search={search}
              setSearch={setSearch}
              onClear={clearAll}
            />
          </div>
        </motion.div>

        {/* Active filter pills (removable) */}
        <div className='mb-3'>
          <div className='flex justify-between max-h-20 overflow-scroll gap-2 flex-wrap items-center bg-gradient-to-r from-sky-800 to-indigo-800 p-2 rounded-md'>
            {activePills.length === 0 ? (
              <div className='text-sm text-white px-2 py-1 rounded-md'>
                Showing all
              </div>
            ) : (
              activePills.map(p => (
                <button
                  key={p}
                  onClick={() => removeFilter(p)}
                  className='flex items-center gap-2 text-sm px-2 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-200'
                  aria-label={`Remove filter ${p}`}
                >
                  <span className='capitalize'>{p}</span>
                  <FaTimes className='w-3 h-3' aria-hidden />
                </button>
              ))
            )}

            {/* quick clear all button */}
            <button
              onClick={clearAll}
              className='ml-2 px-2 py-1 text-xs rounded-full bg-red-50 text-red-600'
            >
              Clear all
            </button>
          </div>
        </div>

        {/* Filters row */}
        <div className='mb-4'>
          <FilterChips
            filters={FILTERS}
            active={activeFilter}
            onChange={fArr =>
              view === 'skills' ? setSkillFilter(fArr) : setToolFilter(fArr)
            }
          />
        </div>

        {/* Grid */}
        <div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3'>
          <AnimatePresence>
            {filtered.map(item => (
              <SmallCard key={item.name} item={item} />
            ))}

            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='col-span-full text-center text-gray-500 p-6'
              >
                No results — try clearing filters or searching for a related
                term.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Coding profiles */}
        <div className='mt-8'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-xl font-bold'>Coding Profiles</h3>
            <div className='text-sm text-gray-500'>
              Showing {codingProfiles.length}
            </div>
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {codingProfiles.map(p => (
              <CodingProfileCard key={p.name} p={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// import React, { useMemo, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// import SmallCard from '../components/skillCloud/SmallCard';
// import FilterChips from '../components/skillCloud/FilterChips';
// import HeaderControls from '../components/skillCloud/HeaderControls';
// import CodingProfileCard from '../components/skillCloud/CodingProfileCard';

// import useDebouncedValue from '../hooks/useDebouncedValue';
// import matchQuery from '../utils/matchQuery';

// import {
//   SKILL_CATEGORIES,
//   TOOL_CATEGORIES,
//   skills,
//   tools,
//   codingProfiles,
// } from '../components/skillCloud/skillsData';

// export default function SkillCloud() {
//   const [view, setView] = useState('skills'); // 'skills' or 'tools'
//   const [search, setSearch] = useState('');
//   const [skillFilter, setSkillFilter] = useState('all');
//   const [toolFilter, setToolFilter] = useState('all');

//   const debouncedSearch = useDebouncedValue(search, 180);

//   const items = view === 'skills' ? skills : tools;
//   const activeFilter = view === 'skills' ? skillFilter : toolFilter;
//   const FILTERS = view === 'skills' ? SKILL_CATEGORIES : TOOL_CATEGORIES;

//   const filtered = useMemo(() => {
//     return items.filter(it => {
//       const matchesQuery = matchQuery(it, debouncedSearch);
//       // categories are already normalized to lowercase in data
//       const matchesFilter =
//         activeFilter === 'all' || (it.categories || []).includes(activeFilter);
//       return matchesQuery && matchesFilter;
//     });
//   }, [items, debouncedSearch, activeFilter]);

//   const clearAll = () => {
//     setSearch('');
//     setSkillFilter('all');
//     setToolFilter('all');
//   };

//   return (
//     <section
//       id='skills'
//       className='mt-8 md:rounded-xl py-8 rounded-xl mb-4 shadow-md  shadow-cyan-600'
//     >
//       <div className='max-w-6xl mx-auto px-4'>
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.35 }}
//           className='flex items-center justify-between gap-4 mb-4'
//         >
//           <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
//             Skills/Tools
//           </h2>

//           <div className='flex items-center gap-2'>
//             <HeaderControls
//               view={view}
//               setView={setView}
//               search={search}
//               setSearch={setSearch}
//               onClear={clearAll}
//             />
//           </div>
//         </motion.div>

//         {/* Filters row */}
//         <div className='mb-4'>
//           <FilterChips
//             filters={FILTERS}
//             active={activeFilter}
//             onChange={f =>
//               view === 'skills' ? setSkillFilter(f) : setToolFilter(f)
//             }
//           />
//         </div>

//         {/* Grid */}
//         <div className='grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3'>
//           <AnimatePresence>
//             {filtered.map(item => (
//               <SmallCard key={item.name} item={item} />
//             ))}

//             {filtered.length === 0 && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className='col-span-full text-center text-gray-500 p-6'
//               >
//                 No results — try clearing filters or searching for a related
//                 term.
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Coding profiles */}
//         <div className='mt-8'>
//           <div className='flex items-center justify-between mb-4'>
//             <h3 className='text-xl font-bold'>Coding Profiles</h3>
//             <div className='text-sm text-gray-500'>
//               Showing {codingProfiles.length}
//             </div>
//           </div>
//           <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
//             {codingProfiles.map(p => (
//               <CodingProfileCard key={p.name} p={p} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
