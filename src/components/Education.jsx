// src/sections/Education.jsx
import React from 'react';
import { motion } from 'framer-motion';
import CompanyAccordion from '../components/CompanyAccordion';

const educationData = [
  {
    degree: 'B.Tech, Electronics & Communication Engineering',
    period: '2021–2024',
    percentage: '86.5%',
    institution:
      'Madan Mohan Malaviya University of Technology (MMMUT), Gorakhpur',
    color: '#e84949',
  },
  {
    degree: 'Diploma, Electronics & Communication Engineering',
    period: '2018–2021',
    percentage: '88.28%',
    institution: 'Government Polytechnic, Jaunpur',
    color: '#e84949',
  },
];

/**
 * experienceData: concise single-line summaries (no bullets)
 */
const groupedExperience = [
  {
    company: 'IDEMIA',
    color: '#e84949',
    roles: [
      {
        role: 'Research Engineer',
        period: 'Mar 2025 – Present',
        summary:
          'Developing iOS and MERN applications; leading GenAI/RAG work with LangChain, LangGraph, and LangSmith; building data pipelines and experiment-tracking workflows for LLM-powered apps using DVC, MLflow, and other MLOps tools; and driving research and product innovation on cutting-edge technologies.',
        tech: [
          'iOS',
          'Swift',
          'SwiftUI',
          'JavaScript',
          'Python',
          'LangChain',
          'LangGraph',
          'LangSmith',
          'DagsHub',
          'GitHub',
          'Ollama',
          'Vector DBs',
          'Knowledge Graph',
          'RAGs',
          'AI Agents',
          'Hugging Face',
          'DVC',
          'MLflow',
          'Docker',
        ],
      },
      {
        role: 'Associate Research Engineer',
        period: 'Aug 2024 – Feb 2025',
        summary:
          'iOS and full-stack application development; AI/ML exploration; research and innovation for new products and solutions.',
        tech: [
          'iOS',
          'Swift',
          'SwiftUI',
          'XCode',
          'React',
          'javaScript',
          'MERN',
          'Node.js',
          'Express',
          'MongoDB',
          'Docker',
          'GitHub',
        ],
      },
    ],
  },
  {
    company: 'SYNC',
    color: '#e84949',
    roles: [
      {
        role: 'Web Developer Intern',
        period: 'Dec 2022 – Jan 2023',
        summary:
          'Developed React + Express web applications, implemented REST APIs, and integrated frontends with MongoDB-backed services.',
        tech: [
          'React',
          'Express',
          'MongoDB',
          'HTML',
          'CSS',
          'JavaScript',
          'Git',
          'GitHub',
        ],
      },
    ],
  },
];

export default function Education() {
  return (
    <section id='education' className='mt-20'>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center'
      >
        Education & Experience
      </motion.h2>

      <div className='grid lg:grid-cols-2 gap-12'>
        {/* Education side */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3
            className='text-2xl font-bold text-gray-900 dark:text-white mb-8'
            style={{ color: '#e84949' }}
          >
            Education
          </h3>

          <div className='space-y-6'>
            {educationData.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.45 }}
                className='p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-lg backdrop-blur'
              >
                <h4 className='font-bold text-lg text-gray-900 dark:text-white mb-1'>
                  {edu.degree}
                </h4>
                <p className='text-gray-600 dark:text-gray-300 mb-2'>
                  {edu.period} • {edu.percentage}
                </p>
                <p className='font-semibold' style={{ color: edu.color }}>
                  {edu.institution}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience side with accordions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3
            className='text-2xl font-bold text-gray-900 dark:text-white mb-8'
            style={{ color: '#e84949' }}
          >
            Experience
          </h3>

          <div className='space-y-4'>
            {groupedExperience.map((company, idx) => (
              <CompanyAccordion
                key={company.company}
                company={company}
                defaultOpen={idx === 0}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// import React from 'react';
// import { motion } from 'framer-motion';

// const educationData = [
//   {
//     degree: 'B.Tech (Electronics and Communication Engineering)',
//     period: '2021-2024',
//     percentage: '86.5%',
//     institution: 'MMMUT Gorakhpur',
//     color: '#e84949',
//   },
//   {
//     degree: 'Diploma (Electronics and Communication Engineering)',
//     period: '2018-2021',
//     percentage: '88.28%',
//     institution: 'Government Polytechnic JAUNPUR',
//     color: '#e84949',
//   },
// ];

// const experienceData = [
//   {
//     role: 'Research Engineer',
//     company: 'IDEMIA',
//     period: 'March 2025 - Present',
//     description:
//       'Working on cutting-edge research and innovation projects, leveraging AI/MLOps ,Gen ai , mlops tools to design intelligent, feature-rich solutions.',
//     color: '#e84949',
//   },
//   {
//     role: 'Associate Research Engineer',
//     company: 'IDEMIA',
//     period: 'Aug 2024 - Feb 2025',
//     description:
//       'ios app and full stack application developement.Worked on Research and innovation projects, leveraging AI/ML and developed feature-rich application.',
//     color: '#e84949',
//   },
//   {
//     role: 'Web Developer Intern',
//     company: 'SYNC',
//     period: 'Dec 2022 - Jan 2023',
//     description:
//       'Developed full-stack web applications using React, Express and MongoDB. Built responsive UI with HTML, JSX, CSS and JavaScript, implemented RESTful APIs, and integrated frontend with the backend server / database.',
//     color: '#e84949',
//   },
// ];

// export default function Education() {
//   return (
//     <section id='education' className='mt-20'>
//       <motion.h2
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className='text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center'
//       >
//         Education & Experience
//       </motion.h2>

//       <div className='grid lg:grid-cols-2 gap-12'>
//         {/* Education Section */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h3
//             className='text-2xl font-bold text-gray-900 dark:text-white mb-8'
//             style={{ color: '#e84949' }}
//           >
//             My Education
//           </h3>
//           <div className='space-y-6'>
//             {educationData.map((edu, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1, duration: 0.5 }}
//                 className='p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-lg backdrop-blur'
//               >
//                 <h4 className='font-bold text-lg text-gray-900 dark:text-white mb-2'>
//                   {edu.degree}
//                 </h4>
//                 <p className='text-gray-600 dark:text-gray-300 mb-2'>
//                   {edu.period} | {edu.percentage}
//                 </p>
//                 <p className='font-semibold' style={{ color: edu.color }}>
//                   {edu.institution}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Experience Section */}
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h3
//             className='text-2xl font-bold text-gray-900 dark:text-white mb-8'
//             style={{ color: '#e84949' }}
//           >
//             My Experience
//           </h3>
//           <div className='space-y-6'>
//             {experienceData.map((exp, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1, duration: 0.5 }}
//                 className='p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-lg backdrop-blur'
//               >
//                 <h4 className='font-bold text-lg text-gray-900 dark:text-white mb-2'>
//                   {exp.role}
//                 </h4>
//                 <p className='font-semibold mb-2' style={{ color: exp.color }}>
//                   {exp.company}
//                 </p>
//                 <p className='text-gray-600 dark:text-gray-300 mb-3'>
//                   {exp.period}
//                 </p>
//                 <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
//                   {exp.description}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
