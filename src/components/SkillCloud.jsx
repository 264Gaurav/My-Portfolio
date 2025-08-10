import React from 'react';
import { motion } from 'framer-motion';
import {
  FaApple,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaDocker,
  FaPython,
  FaGithub,
  FaGitAlt,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaCode,
  FaBrain,
  FaRobot,
  FaChartLine,
  FaServer,
  FaCloud,
  FaLinkedin,
  FaStackOverflow,
} from 'react-icons/fa';
import {
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiFramer,
  SiDvc,
  SiMlflow,
  SiApacheairflow,
  SiLangchain,
  SiSqlite,
  SiPostgresql,
  SiMysql,
  SiSwift,
  SiCplusplus,
} from 'react-icons/si';

// Import coding profile images
import gfgImg from '../assets/gfg.png';
import codeStudioImg from '../assets/code2.jpeg';
import leetcodeImg from '../assets/code3.png.png';
import hackerrankImg from '../assets/hackerRank.jpg.png';

const skills = [
  { name: 'iOS', icon: FaApple, color: '#000000' },
  { name: 'Swift', icon: SiSwift, color: '#FF6B35' },
  { name: 'SwiftUI', icon: SiSwift, color: '#007AFF' },
  { name: 'React', icon: FaReact, color: '#61DAFB' },
  { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
  { name: 'Express', icon: SiExpress, color: '#000000' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'MERN', icon: FaDatabase, color: '#4DB33D' },
  { name: 'Docker', icon: FaDocker, color: '#2496ED' },
  { name: 'DVC', icon: SiDvc, color: '#945DD6' },
  { name: 'MLflow', icon: SiMlflow, color: '#019733' },
  { name: 'Airflow', icon: SiApacheairflow, color: '#017CEE' },
  { name: 'LangChain', icon: SiLangchain, color: '#FF6B35' },
  { name: 'LangGraph', icon: SiLangchain, color: '#FF6B35' },
  { name: 'LangSmith', icon: SiLangchain, color: '#FF6B35' },
  { name: 'RAG', icon: FaBrain, color: '#FF6B35' },
  { name: 'Python', icon: FaPython, color: '#3776AB' },
  { name: 'GenAI', icon: FaBrain, color: '#FF6B35' },
  { name: 'C++', icon: SiCplusplus, color: '#00599C' },
  { name: 'DSA/problem solving', icon: FaCode, color: '#FF6B35' },
  { name: 'Git', icon: FaGitAlt, color: '#F05032' },
  { name: 'GitHub', icon: FaGithub, color: '#181717' },
  { name: 'Dagshub', icon: FaCloud, color: '#945DD6' },
  { name: 'vectorDB', icon: FaDatabase, color: '#FF6B35' },
  { name: 'SQL', icon: FaDatabase, color: '#336791' },
];

const codingProfiles = [
  {
    name: 'GeeksForGeeks',
    description:
      '2nd academic Rank on GFG. Solved more than 1000+ problems with 3200+ score and secured.',
    link: 'https://auth.geeksforgeeks.org/user/gauravsingh_45/practice',
    image: gfgImg,
    color: '#2F855A',
  },
  {
    name: 'Code Studio',
    description:
      'Specialist, achieved Level-6 with 6000+ score. Solved 300+ Problems.',
    link: 'https://www.codingninjas.com/studio/profile/Gaurav_kashyap',
    image: codeStudioImg,
    color: '#3182CE',
  },
  {
    name: 'Leetcode',
    description:
      'Solved 300+ problems. 50 days, 100 days badge earned. Completed 6 month coding challenge.',
    link: 'https://leetcode.com/gaurav264/',
    image: leetcodeImg,
    color: '#F56565',
  },
  {
    name: 'HackerRank',
    description:
      '5 star in C++ Coder on Hacker Rank and also got certificate in Problem solving and JavaScript.',
    link: 'https://www.hackerrank.com/gauravsingh_45',
    image: hackerrankImg,
    color: '#38A169',
  },
];

export default function SkillCloud() {
  return (
    <section id='skills' className='mt-20'>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center'
      >
        My Skills
      </motion.h3>
      <div className='flex flex-wrap gap-3 mb-16 justify-center'>
        {skills.map((skill, i) => {
          const IconComponent = skill.icon;
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              className='group bg-white dark:bg-white/10 p-2 rounded-full text-sm border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white/80 hover:bg-gray-200 dark:hover:bg-white/20 hover:scale-105 transition-all duration-300 font-medium hover:shadow-lg flex items-center gap-2 cursor-pointer'
              style={{
                '--skill-color': skill.color,
              }}
            >
              <IconComponent
                className='text-2xl group-hover:scale-110 transition-transform duration-300 bg-white rounded-full p-0.5 shadow-sm'
                style={{ color: skill.color }}
              />
              <span>{skill.name}</span>
            </motion.div>
          );
        })}
      </div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center'
      >
        My Coding Profiles
      </motion.h3>
      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {codingProfiles.map((profile, i) => (
          <motion.a
            key={profile.name}
            href={profile.link}
            target='_blank'
            rel='noreferrer'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
            className='group block'
          >
            <div className='p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:scale-105 backdrop-blur text-center relative overflow-hidden'>
              {/* Gradient overlay */}
              <div
                className='absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300'
                style={{
                  background: `linear-gradient(135deg, ${profile.color}20, transparent)`,
                }}
              ></div>

              <div className='mb-4 flex justify-center relative'>
                <div className='w-full h-32 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-white/20 group-hover:border-sky-300 dark:group-hover:border-sky-400 transition-all duration-300 group-hover:scale-105 shadow-lg'>
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                  />
                </div>
                {/* Glow effect */}
                <div
                  className='absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300'
                  style={{ backgroundColor: profile.color }}
                ></div>
              </div>

              <h4 className='font-bold text-lg text-gray-900 dark:text-white mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors'>
                {profile.name}
              </h4>
              <p className='text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4'>
                {profile.description}
              </p>

              <div className='text-sm px-4 py-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/80 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors duration-300 font-medium inline-block group-hover:shadow-md'>
                Check Profile
              </div>

              {/* Hover effect indicator */}
              <div className='absolute top-4 right-4 w-6 h-6 bg-white/20 dark:bg-white/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110'>
                <svg
                  className='w-3 h-3 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                  />
                </svg>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
