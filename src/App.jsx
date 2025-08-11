import React from 'react';
import { useTheme } from './context/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import SkillCloud from './components/SkillCloud';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

export default function App() {
  const { theme } = useTheme();

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 transition-colors duration-500 overflow-x-hidden'>
      <Header />
      <main className='pt-24 px-4 md:px-12 lg:px-20'>
        <Hero />
        <SkillCloud />
        <Projects />
        <Education />
        <Contact />
        <Footer />
      </main>
      <Chatbot />
    </div>
  );
}
