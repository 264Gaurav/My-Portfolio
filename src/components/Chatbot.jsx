import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QA_KB from '../utils/qa';

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { from: 'bot', text: 'Hi! Ask about skills, projects, or contact.' },
  ]);
  const [text, setText] = useState('');

  function send(msg) {
    if (!msg) return;
    setMsgs(m => [...m, { from: 'user', text: msg }]);
    const lower = msg.toLowerCase();
    const found = QA_KB.find(k => lower.includes(k.q));
    const reply = found
      ? found.a
      : "I don't know that yet. You can connect a real LLM in settings.";
    setTimeout(() => setMsgs(m => [...m, { from: 'bot', text: reply }]), 500);
  }

  return (
    <div className='fixed right-6 bottom-6 z-50'>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className='mb-4 w-80 bg-white/90 dark:bg-black/40 rounded-2xl p-4 shadow-2xl border border-gray-200 dark:border-white/20 backdrop-blur'
          >
            <div className='flex items-center justify-between mb-4'>
              <div className='text-sm font-semibold text-gray-900 dark:text-white'>
                About — Chat
              </div>
              <button
                onClick={() => setOpen(false)}
                className='text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/80 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors'
              >
                Close
              </button>
            </div>
            <div className='h-44 overflow-y-auto space-y-3 mb-4'>
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.from === 'bot'
                      ? 'text-left text-sm text-gray-900 dark:text-white/90'
                      : 'text-right text-sm text-gray-700 dark:text-sky-100'
                  }
                >
                  <div
                    className={
                      m.from === 'bot'
                        ? 'inline-block bg-gray-100 dark:bg-white/10 p-3 rounded-2xl text-gray-800 dark:text-white/90 max-w-[80%]'
                        : 'inline-block bg-sky-100 dark:bg-sky-600/20 p-3 rounded-2xl text-gray-800 dark:text-sky-100 max-w-[80%]'
                    }
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className='flex gap-3'>
              <input
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && send(text)}
                className='flex-1 bg-gray-50 dark:bg-white/5 rounded-xl px-3 py-2 text-gray-900 dark:text-white outline-none border border-gray-200 dark:border-white/10 placeholder-gray-500 dark:placeholder-white/50 focus:border-sky-500 dark:focus:border-sky-400 transition-colors'
                placeholder='Ask about skills, projects...'
              />
              <button
                onClick={() => {
                  send(text);
                  setText('');
                }}
                className='px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:from-sky-600 hover:to-indigo-700 transition-all duration-300 font-medium'
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(o => !o)}
        aria-label='Open chat'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className='w-14 h-14 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 shadow-lg flex items-center justify-center text-white text-lg border-2 border-white/10 hover:shadow-xl transition-all duration-300'
      >
        {open ? '✕' : '💬'}
      </motion.button>
    </div>
  );
};

export default Chatbot;
