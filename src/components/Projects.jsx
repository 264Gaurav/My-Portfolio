import React from 'react';
import { motion } from 'framer-motion';

// Import project images
import spaGif from '../assets/projects/spa.gif.gif';
import grubhubImg from '../assets/projects/Project5.PNG';
import alarmGif from '../assets/projects/alarm.gif';
import todoImg from '../assets/projects/todo.png';
import passwordImg from '../assets/projects/password_generator.jpg';
import topCoursesImg from '../assets/projects/top_courses.png';

const sampleProjects = [
  {
    title: 'Smart Parking App',
    desc: 'An application that includes both web tech.(MERN Stack) and IoT tech. It shows the real time parking status and using the application seeker can book parking slots for their vehicle and the Owners can earn money by creating parking slots and spaces dynamically.',
    repo: 'https://spa-tacc.onrender.com/',
    image: spaGif,
    tech: ['React', 'Node.js', 'MongoDB', 'IoT'],
  },
  {
    title: 'GRUBHUB-Food Ordering app',
    desc: 'A web app that contains the list of different different food items and user can order the food as per the choise and also can choose quantity of food. Cart funtionality is also there using which user can add their food in the cart. This app is build using React.js , Node.js , MongoDB , Redux , jwt and bcrypt also used for secure authentication and login.',
    repo: 'https://grubhub.onrender.com/',
    image: grubhubImg,
    tech: ['React', 'Node.js', 'MongoDB', 'Redux', 'JWT'],
  },
  {
    title: 'Alarm Clock',
    desc: 'Time Management a big Thing. Now we can set the Alarm Time at which we have to get attentive and to execute our task.',
    repo: 'https://264gaurav.github.io/alarm-clock/',
    image: alarmGif,
    tech: ['JavaScript', 'HTML', 'CSS'],
  },
  {
    title: 'GIF Generator',
    desc: 'Get your favourite GIFS here',
    repo: 'https://gif-generator-frontend.onrender.com/',
    image: 'https://tinyjpg.com/images/social/website.jpg',
    tech: ['React', 'API', 'JavaScript'],
  },
  {
    title: 'Login Authentication',
    desc: 'To Login and Register the user',
    repo: 'https://login-register-rq9x.onrender.com/',
    image:
      'https://png.pngtree.com/thumb_back/fh260/background/20210205/pngtree-flat-business-login-box-login-page-image_544861.jpg',
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT'],
  },
  {
    title: 'Todo APP',
    desc: 'MARK your TODO LIST',
    repo: 'https://264gaurav.github.io/Todo_app/',
    image: todoImg,
    tech: ['JavaScript', 'HTML', 'CSS'],
  },
  {
    title: 'Password Generator',
    desc: 'Get the password suggestions as you want by selecting number of words,letter,character,symbols, etc.',
    repo: 'https://264gaurav.github.io/password-generator/',
    image: passwordImg,
    tech: ['JavaScript', 'HTML', 'CSS'],
  },
  {
    title: 'Top Courses',
    desc: 'A lot of courses present in the Gallery , you can pick your favourite one.',
    repo: 'https://top-courses.onrender.com/',
    image: topCoursesImg,
    tech: ['React', 'Node.js', 'MongoDB'],
  },
];

export default function Projects() {
  return (
    <section id='projects' className='mt-20'>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center'
      >
        My Projects
      </motion.h2>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {sampleProjects.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.repo}
            target='_blank'
            rel='noreferrer'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
            className='group block'
          >
            <div className='p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:scale-105 backdrop-blur h-full relative overflow-hidden'>
              {/* Gradient overlay */}
              <div className='absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

              <div className='mb-4 rounded-xl overflow-hidden relative'>
                <img
                  src={p.image}
                  alt={p.title}
                  className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500'
                />
                {/* Tech stack overlay */}
                <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <div className='flex flex-wrap gap-1'>
                    {p.tech.map((tech, index) => (
                      <span
                        key={index}
                        className='text-xs px-2 py-1 bg-white/20 text-white rounded-full backdrop-blur'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <h4 className='font-bold text-lg text-gray-900 dark:text-white mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors'>
                {p.title}
              </h4>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed text-sm'>
                {p.desc}
              </p>

              {/* Hover effect indicator */}
              <div className='absolute top-4 right-4 w-8 h-8 bg-white/20 dark:bg-white/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110'>
                <svg
                  className='w-4 h-4 text-white'
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
