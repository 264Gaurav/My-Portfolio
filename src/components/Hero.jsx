import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import ThreeLogo from '../three/ThreeLogo';
import profileImg from '../assets/Gaurav_DP.jpeg';

// Typing Animation Component with Loop
const TypeWriter = ({
  sentences,
  className,
  delay = 0,
  speed = 50,
  loopDelay = 2000,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentSentence = sentences[currentSentenceIndex];

    if (!isDeleting) {
      // Typing forward
      if (currentCharIndex < currentSentence.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentSentence.substring(0, currentCharIndex + 1));
          setCurrentCharIndex(prev => prev + 1);
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, wait then start deleting
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, loopDelay);
        return () => clearTimeout(timeout);
      }
    } else {
      // Deleting backward
      if (currentCharIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(currentSentence.substring(0, currentCharIndex - 1));
          setCurrentCharIndex(prev => prev - 1);
        }, speed / 2); // Delete faster than typing
        return () => clearTimeout(timeout);
      } else {
        // Finished deleting, move to next sentence
        setIsDeleting(false);
        setCurrentSentenceIndex(prev => (prev + 1) % sentences.length);
        setCurrentCharIndex(0);
        setDisplayText('');
      }
    }
  }, [
    currentCharIndex,
    currentSentenceIndex,
    isDeleting,
    sentences,
    speed,
    loopDelay,
  ]);

  return (
    <motion.h2
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay }}
      className={className}
    >
      {displayText}
      <span className='animate-pulse'>|</span>
    </motion.h2>
  );
};

export default function Hero() {
  const typingSentences = [
    'Research Engineer @ IDEMIA',
    'iOS & Fullstack Developer',
    'AI/MLOps Enthusiast & Innovator',
  ];

  return (
    <section
      id='home'
      className='grid md:grid-cols-2 gap-8 items-center min-h-[72vh]'
    >
      <div className='order-2 md:order-1'>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className='text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight'
        >
          Gaurav Singh
        </motion.h1>

        <TypeWriter
          sentences={typingSentences}
          className='text-md md:text-2xl font-extrabold leading-normal
             text-gray-900 dark:text-transparent
             dark:bg-gradient-to-r dark:from-sky-100 dark:to-indigo-500
             dark:bg-clip-text'
          delay={0.15}
          speed={80}
          loopDelay={2000}
        />

        {/* Mobile Profile Image - Between h2 and p */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className='md:hidden flex justify-center my-6'
        >
          <div className='w-48 h-48 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl'>
            <img
              src={profileImg}
              alt='Gaurav Singh'
              className='w-full h-full object-cover'
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='mt-6 text-sm md:text-md text-gray-600 dark:text-white max-w-xl leading-relaxed'
        >
          I'm a Research Engineer and Full-Stack + iOS Developer passionate
          about building modern, impactful software solutions. With a strong
          foundation in JavaScript, C++, Swift, and SwiftUI, and hands-on
          experience in the MERN stack, I create high-performance applications
          across platforms. Currently at IDEMIA, I work on cutting-edge research
          and innovation projects, leveraging AI/ML to design intelligent,
          feature-rich solutions. My expertise spans modern software
          architecture, AI integration, and advanced user experiences — from iOS
          apps to scalable full-stack platforms. I thrive at the intersection of
          technology, creativity, and problem-solving, delivering products that
          blend functionality with innovation.
        </motion.p>
        <div className='mt-8 flex gap-4'>
          <motion.a
            href='#projects'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl'
          >
            View projects
          </motion.a>
          <motion.a
            href='https://github.com/264Gaurav'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className='px-6 py-3 rounded-full bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/20 text-gray-700 dark:text-white/80 hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-300 hover:scale-105'
          >
            GitHub
          </motion.a>
        </div>
      </div>

      {/* Desktop 3D Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className='order-1 md:order-2 hidden md:block w-full h-[50vh] rounded-2xl overflow-hidden relative'
      >
        {/* Profile Image Overlay */}
        <div className='absolute inset-0 flex items-center justify-center z-10'>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className='w-60 h-60 md:w-100 md:h-100 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl'
          >
            <img
              src={profileImg}
              alt='Gaurav Singh'
              className='w-full h-full object-cover'
            />
          </motion.div>
        </div>

        {/* 3D Background */}
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <ThreeLogo />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.6}
          />
        </Canvas>
      </motion.div>
    </section>
  );
}
