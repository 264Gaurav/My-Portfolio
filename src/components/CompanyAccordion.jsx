// src/components/CompanyAccordion.jsx
import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaCircle, FaCode } from 'react-icons/fa';

/**
 * CompanyAccordion (now a CompanyCard — always expanded)
 * props:
 * - company: { company, color, roles: [{ role, period, summary, tech }] }
 *
 * Behaviour:
 * - Company content is always visible (no company-level dropdown)
 * - Tech list for each role is behind a dropdown button (closed by default)
 */
export default function CompanyAccordion({ company }) {
  const [openTech, setOpenTech] = useState({}); // map roleIndex -> boolean
  const uid = useId();

  // ----- Helpers to compute overall period -----
  const MONTHS = {
    jan: 0,
    january: 0,
    feb: 1,
    february: 1,
    mar: 2,
    march: 2,
    apr: 3,
    april: 3,
    may: 4,
    jun: 5,
    june: 5,
    jul: 6,
    july: 6,
    aug: 7,
    august: 7,
    sep: 8,
    sept: 8,
    september: 8,
    oct: 9,
    october: 9,
    nov: 10,
    november: 10,
    dec: 11,
    december: 11,
  };

  function parseMonthYear(str) {
    if (!str || typeof str !== 'string') return null;
    if (/present/i.test(str)) return null;
    const parts = str.split(/–|—|-/).map(p => p.trim());
    const start = parts[0] || '';
    const tokens = start.split(/\s+/);
    if (tokens.length < 2) return null;
    const monthToken = tokens[0].toLowerCase().replace(',', '');
    const yearToken = tokens[1].replace(',', '');
    const month = MONTHS[monthToken];
    const year = parseInt(yearToken, 10);
    if (Number.isFinite(month) && Number.isFinite(year)) {
      return new Date(year, month, 1);
    }
    return null;
  }

  function formatMonthYear(date) {
    if (!(date instanceof Date) || Number.isNaN(date)) return '';
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  }

  function computeOverallPeriod(roles = []) {
    if (!roles || roles.length === 0) return '';
    let earliest = null;
    let hasPresent = false;
    let latestEnd = null;

    roles.forEach(r => {
      const p = (r.period || '').trim();
      if (/present/i.test(p)) hasPresent = true;
      const parts = p.split(/–|—|-/).map(x => x.trim());
      const startStr = parts[0] || '';
      const endStr = parts[1] || '';

      const startDate = parseMonthYear(startStr);
      if (startDate && (!earliest || startDate < earliest))
        earliest = startDate;

      if (endStr && !/present/i.test(endStr)) {
        const endDate = parseMonthYear(endStr);
        if (endDate && (!latestEnd || endDate > latestEnd)) latestEnd = endDate;
      }
    });

    const startText = earliest ? formatMonthYear(earliest) : '';
    if (hasPresent) return startText ? `${startText} – Present` : 'Present';
    const endText = latestEnd ? formatMonthYear(latestEnd) : '';
    return startText && endText
      ? `${startText} – ${endText}`
      : startText || endText || '';
  }

  const overallPeriod = computeOverallPeriod(company.roles);

  // ----- UI handlers -----
  function toggleTech(idx) {
    setOpenTech(prev => ({ ...prev, [idx]: !prev[idx] }));
  }

  return (
    <div className='rounded-2xl bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 transition-all hover:shadow-lg p-4 overflow-hidden'>
      {/* header (non-collapsible) */}
      <div className='flex items-center justify-between mb-3'>
        <div className='flex items-center gap-3'>
          <span
            className='w-3 h-3 rounded-full'
            style={{ backgroundColor: company.color }}
            aria-hidden
          />
          <h4 className='font-bold text-lg text-gray-900 dark:text-white'>
            {company.company}
          </h4>
        </div>

        <div className='text-sm text-gray-500 hidden sm:block'>
          {overallPeriod}
        </div>
      </div>

      {/* roles (always visible) */}
      <div className='space-y-4'>
        {company.roles.map((role, rIdx) => (
          <div key={rIdx} className='pt-2 '>
            <div className='flex items-start ml-4 gap-3'>
              <div className='mt-1'>
                <FaCode className='w-5 h-4 text-sky-500' aria-hidden />
              </div>

              <div className='flex-1'>
                <div className='flex items-baseline justify-between'>
                  <div>
                    <h5 className='font-semibold text-md text-gray-900 dark:text-white'>
                      {role.role}
                    </h5>
                    <div className='text-sm text-gray-600 dark:text-gray-300'>
                      {role.period}
                    </div>
                  </div>

                  {role.tech && role.tech.length > 0 && (
                    <div className='ml-4'>
                      <button
                        onClick={() => toggleTech(rIdx)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleTech(rIdx);
                          }
                        }}
                        aria-expanded={!!openTech[rIdx]}
                        aria-controls={`tech-panel-${uid}-${rIdx}`}
                        className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300 text-sm'
                      >
                        <span className='hidden sm:inline'>Tech</span>
                        {openTech[rIdx] ? (
                          <FaChevronUp className='w-3 h-3' />
                        ) : (
                          <FaChevronDown className='w-3 h-3' />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <p className='mt-2 text-sm md:text-md text-gray-700 dark:text-gray-200 '>
                  {role.summary}
                </p>

                <AnimatePresence initial={false}>
                  {openTech[rIdx] && (
                    <motion.div
                      id={`tech-panel-${uid}-${rIdx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                      className='mt-3'
                    >
                      <div className='flex flex-wrap gap-2'>
                        {role.tech.map((t, i) => (
                          <span
                            key={i}
                            className='text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-600 text-white'
                            title={t}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {rIdx < company.roles.length - 1 && (
              <motion.hr
                layout
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className='my-4 border-t-2 border-gray-400 dark:border-gray-500 shadow-[0_2px_6px_rgba(0,0,0,0.15)] rounded-full'
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
