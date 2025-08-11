import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { askGemini } from '../utils/gemini';

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { from: 'bot', text: 'Hi! Ask about skills, projects, or contact.' },
  ]);
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(false);
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [msgs, open]);

  // TTS: Speak latest bot message if speaker is on
  useEffect(() => {
    if (!speakerOn) return;
    const last = msgs[msgs.length - 1];
    if (last && last.from === 'bot') {
      window.speechSynthesis.cancel();
      const utter = new window.SpeechSynthesisUtterance(last.text);
      utter.rate = 1.05;
      utter.pitch = 1.1;
      window.speechSynthesis.speak(utter);
    }
  }, [msgs, speakerOn]);

  // Mic input (Speech-to-Text)
  const handleMic = () => {
    if (listening) {
      recognitionRef.current && recognitionRef.current.stop();
      setListening(false);
      return;
    }
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript;
      setText(t => (t ? t + ' ' : '') + transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  async function send(msg) {
    if (!msg) return;
    setMsgs(m => [...m, { from: 'user', text: msg }]);
    setText('');
    setMsgs(m => [...m, { from: 'bot', text: 'Thinking...' }]);
    try {
      const reply = await askGemini(msg);
      setMsgs(m => [...m.slice(0, -1), { from: 'bot', text: reply }]);
    } catch (e) {
      setMsgs(m => [
        ...m.slice(0, -1),
        { from: 'bot', text: 'Sorry, Gemini AI is not available right now.' },
      ]);
    }
  }

  return (
    <div className='fixed right-4 bottom-4 z-50'>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className='mb-4 w-80 md:w-100 bg-white/90 dark:bg-black/40 rounded-2xl p-4 shadow-2xl border border-gray-200 dark:border-white/20 backdrop-blur'
          >
            <div className='flex items-center justify-between mb-4'>
              <div className='text-sm font-semibold text-gray-900 dark:text-white'>
                Know more about Me
              </div>
              <div className='flex items-center gap-2'>
                {/* Speaker toggle */}
                <button
                  onClick={() => setSpeakerOn(s => !s)}
                  className={`text-lg px-2 py-1 rounded-full transition-colors duration-200 ${
                    speakerOn
                      ? 'bg-sky-500 text-white'
                      : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/80'
                  }`}
                  title={speakerOn ? 'Mute speaker' : 'Unmute speaker'}
                >
                  {speakerOn ? '🔊' : '🔇'}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className='text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/80 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors'
                >
                  Close
                </button>
              </div>
            </div>
            <div className='h-44 md:h-100 overflow-y-auto space-y-3 mb-4'>
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
              {/* Auto-scroll anchor */}
              <div ref={chatEndRef} />
            </div>
            <div className='flex gap-3'>
              <input
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && send(text)}
                className='flex-1 bg-gray-50 dark:bg-white/5 rounded-xl px-3 py-2 text-gray-900 dark:text-white outline-none border border-gray-200 dark:border-white/10 placeholder-gray-500 dark:placeholder-white/50 focus:border-sky-500 dark:focus:border-sky-400 transition-colors'
                placeholder='Ask about skills, projects...'
              />
              {/* Mic button */}
              <button
                onClick={handleMic}
                className={`px-3 py-2 rounded-xl ${
                  listening
                    ? 'bg-sky-500 text-white animate-pulse'
                    : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/80'
                } transition-all duration-300 font-medium`}
                title={listening ? 'Listening...' : 'Speak'}
              >
                {listening ? '🎤...' : '🎤'}
              </button>
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

      {!open && (
        <motion.button
          onClick={() => setOpen(o => !o)}
          aria-label='Open chat'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='w-14 h-14 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 shadow-lg flex items-center justify-center text-white text-lg border-2 border-white/10 hover:shadow-xl transition-all duration-300'
        >
          💬
        </motion.button>
      )}
    </div>
  );
};

export default Chatbot;
