import React from 'react';
import { motion } from 'framer-motion';

const educationData = [
  {
    degree: 'B.Tech (Electronics and Communication Engineering)',
    period: '2021-2024',
    percentage: '86.5%',
    institution: 'MMMUT Gorakhpur',
    color: '#e84949',
  },
  {
    degree: 'Diploma (Electronics and Communication Engineering)',
    period: '2018-2021',
    percentage: '88.28%',
    institution: 'Government Polytechnic JAUNPUR',
    color: '#e84949',
  },
];

const experienceData = [
  {
    role: 'Research Engineer',
    company: 'IDEMIA',
    period: 'Aug 2024 - Present',
    description:
      'Working on cutting-edge research and innovation projects, leveraging AI/ML to design intelligent, feature-rich solutions.',
    color: '#e84949',
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
        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3
            className='text-2xl font-bold text-gray-900 dark:text-white mb-8'
            style={{ color: '#e84949' }}
          >
            My Education
          </h3>
          <div className='space-y-6'>
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className='p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-lg backdrop-blur'
              >
                <h4 className='font-bold text-lg text-gray-900 dark:text-white mb-2'>
                  {edu.degree}
                </h4>
                <p className='text-gray-600 dark:text-gray-300 mb-2'>
                  {edu.period} | {edu.percentage}
                </p>
                <p className='font-semibold' style={{ color: edu.color }}>
                  {edu.institution}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3
            className='text-2xl font-bold text-gray-900 dark:text-white mb-8'
            style={{ color: '#e84949' }}
          >
            My Experience
          </h3>
          <div className='space-y-6'>
            {experienceData.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className='p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-lg backdrop-blur'
              >
                <h4 className='font-bold text-lg text-gray-900 dark:text-white mb-2'>
                  {exp.role}
                </h4>
                <p className='font-semibold mb-2' style={{ color: exp.color }}>
                  {exp.company}
                </p>
                <p className='text-gray-600 dark:text-gray-300 mb-3'>
                  {exp.period}
                </p>
                <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
