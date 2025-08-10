import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='mt-20 pb-12 text-center'
    >
      <div className='text-sm text-gray-600 dark:text-gray-400'>
        Gaurav Singh © {new Date().getFullYear()}
      </div>
    </motion.footer>
  );
};

export default Footer;
