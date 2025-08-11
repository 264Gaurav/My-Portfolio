import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Here you can add form submission logic
    const mailtoLink = `mailto:gauravsingh264209@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.open(mailtoLink);
  };

  return (
    <section id='contact' className='mt-20'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center mb-12'
      >
        <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
          Contact Me
        </h2>
      </motion.div>

      <div className='grid lg:grid-cols-2 gap-12'>
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
            Get in Touch
          </h3>
          <p className='text-gray-600 dark:text-gray-300 mb-8 leading-relaxed'>
            Thank you for visiting my personal portfolio. Feel free to connect
            with me on social media. Please note that all major projects will be
            listed here soon. You can also learn more about me through the
            chatbot below. Contact me at{' '}
            <a href='mailto:gauravsingh264209@gmail.com' className='underline'>
              gauravsingh264209@gmail.com
            </a>
            .
          </p>

          <div className='space-y-6'>
            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center'>
                <i className='fas fa-user text-gray-600 dark:text-gray-400'></i>
              </div>
              <div>
                <h4 className='font-semibold text-gray-900 dark:text-white'>
                  Name
                </h4>
                <p className='text-gray-600 dark:text-gray-300'>Gaurav Singh</p>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center'>
                <i className='fas fa-location-dot text-gray-600 dark:text-gray-400'></i>
              </div>
              <div>
                <h4 className='font-semibold text-gray-900 dark:text-white'>
                  Address
                </h4>
                <p className='text-gray-600 dark:text-gray-300'>
                  Uttar Pradesh,India
                </p>
              </div>
            </div>

            <div className='flex items-center gap-4'>
              <div className='w-12 h-12 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center'>
                <i className='fas fa-envelope text-gray-600 dark:text-gray-400'></i>
              </div>
              <div>
                <h4 className='font-semibold text-gray-900 dark:text-white'>
                  Email
                </h4>
                <p className='text-gray-600 dark:text-gray-300'>
                  gauravsingh264209@gmail.com
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
            Message Me
          </h3>
          <form
            onSubmit={handleSubmit}
            className='space-y-4 box-border overflow-x-hidden'
          >
            <input
              type='text'
              name='name'
              placeholder='Name'
              value={formData.name}
              onChange={handleChange}
              className='box-border w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 focus:border-sky-500 dark:focus:border-sky-400 transition-colors outline-none'
              required
            />
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              className='box-border w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 focus:border-sky-500 dark:focus:border-sky-400 transition-colors outline-none'
              required
            />
            <input
              type='text'
              name='subject'
              placeholder='Subject'
              value={formData.subject}
              onChange={handleChange}
              className='box-border w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 focus:border-sky-500 dark:focus:border-sky-400 transition-colors outline-none'
              required
            />
            <textarea
              name='message'
              placeholder='Message..'
              value={formData.message}
              onChange={handleChange}
              rows='4'
              className='box-border w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/50 focus:border-sky-500 dark:focus:border-sky-400 transition-colors outline-none resize-none'
              required
            />
            <motion.button
              type='submit'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl'
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
