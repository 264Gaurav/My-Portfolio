import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { askGemini } from '../utils/gemini';
import profileImg from '../assets/Gaurav_DP.jpeg';

// TypeWriter Component for Chatbot
const ChatTypeWriter = ({ text, className, speed = 80 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <div className={className}>
      {displayText}
      {currentIndex < text.length && <span className='animate-pulse'>|</span>}
    </div>
  );
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    {
      from: 'bot',
      text: 'Hi! Ask anything about Gaurav Singh.',
      isTyping: false,
    },
  ]);
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(false);
  const [showScrollArrow, setShowScrollArrow] = useState(false);
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const recognitionRef = useRef(null);
  const lastSpokenRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [msgs, open]);

  // Check if user is scrolled away from bottom
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = chatContainer;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setShowScrollArrow(!isAtBottom);
    };

    chatContainer.addEventListener('scroll', handleScroll);
    return () => chatContainer.removeEventListener('scroll', handleScroll);
  }, []);

  // TTS: Speak latest bot message if speaker is on
  // useEffect(() => {
  //   if (!speakerOn) return;
  //   const last = msgs[msgs.length - 1];
  //   if (last && last.from === 'bot' && !last.isTyping) {
  //     window.speechSynthesis.cancel();
  //     const utter = new window.SpeechSynthesisUtterance(last.text);
  //     utter.rate = 1.05;
  //     utter.pitch = 1.1;
  //     window.speechSynthesis.speak(utter);
  //   }
  // }, [msgs, speakerOn]);

  // TTS: Speak latest bot message immediately (including while typing) when speaker is on
  useEffect(() => {
    // if speech not supported, just return
    if (
      typeof window === 'undefined' ||
      !('speechSynthesis' in window) ||
      !('SpeechSynthesisUtterance' in window)
    )
      return;

    // If speaker turned off, cancel any ongoing speech and forget last spoken
    if (!speakerOn) {
      window.speechSynthesis.cancel();
      lastSpokenRef.current = null;
      return;
    }

    const last = msgs[msgs.length - 1];
    if (!last || last.from !== 'bot') return;

    const textToSpeak = (last.text || '').trim();
    // don't speak placeholders like "Thinking..."
    if (!textToSpeak || textToSpeak === 'Thinking...') return;

    // avoid repeating the same utterance
    if (lastSpokenRef.current === textToSpeak) return;

    // cancel any existing utterance and speak the new one
    window.speechSynthesis.cancel();
    const utter = new window.SpeechSynthesisUtterance(textToSpeak);
    utter.rate = 1.05;
    utter.pitch = 1.1;

    // remember what we spoke when finished
    utter.onend = () => {
      lastSpokenRef.current = textToSpeak;
    };

    window.speechSynthesis.speak(utter);

    // cleanup: if effect reruns/unmounts, stop speaking
    return () => {
      window.speechSynthesis.cancel();
    };
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

  // Scroll to bottom
  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  async function send(msg) {
    if (!msg) return;
    setMsgs(m => [...m, { from: 'user', text: msg, isTyping: false }]);
    setText('');

    setMsgs(m => [...m, { from: 'bot', text: 'Thinking...', isTyping: false }]);
    try {
      const reply = await askGemini(msg);
      setMsgs(m => [
        ...m.slice(0, -1),
        { from: 'bot', text: reply, isTyping: true },
      ]);
    } catch (e) {
      setMsgs(m => [
        ...m.slice(0, -1),
        {
          from: 'bot',
          text: 'Sorry, Gemini AI is not available right now.',
          isTyping: true,
        },
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
            className='mb-2 w-80 md:w-100 bg-white/90 dark:bg-black/40 rounded-2xl p-1 md:p-2 shadow-2xl border border-gray-200 dark:border-white/20 backdrop-blur'
          >
            <div className='flex items-center justify-between mb-1 md:mb-2'>
              <div className='flex items-center gap-3'>
                {/* Profile Image */}
                <div className='w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm'>
                  <img
                    src={profileImg}
                    alt='Gaurav Singh'
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='text-sm font-semibold text-gray-900 dark:text-white'>
                  Know more about Me
                </div>
              </div>
              <div className='flex items-center gap-2'>
                {/* Speaker toggle */}
                <button
                  onClick={() => setSpeakerOn(s => !s)}
                  className={`text-lg w-10 h-10 p-1 rounded-full transition-colors duration-200 ${
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
                  className='text-xs px-3 py-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white font-bold hover:bg-gray-200 dark:hover:bg-white/20 transition-colors'
                >
                  Close
                </button>
              </div>
            </div>

            {/* Chat Container with Scroll Indicator */}
            <div className='relative'>
              <div
                ref={chatContainerRef}
                className='h-60 md:h-100 overflow-y-auto space-y-3 mb-1 md:mb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600'
              >
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
                          ? 'inline-block bg-gray-100 dark:bg-white/10 px-2 py-1 rounded-xl text-gray-800 dark:text-white/90 max-w-[80%] leading-relaxed'
                          : 'inline-block bg-sky-100 dark:bg-sky-600/20 px-2 py-1 rounded-xl text-gray-800 dark:text-sky-100 max-w-[80%] leading-relaxed'
                      }
                    >
                      {m.from === 'bot' && m.isTyping ? (
                        <ChatTypeWriter
                          text={m.text}
                          className='text-gray-800 dark:text-white/90'
                          speed={60}
                        />
                      ) : (
                        <span>{m.text}</span>
                      )}
                    </div>
                  </div>
                ))}
                {/* Auto-scroll anchor */}
                <div ref={chatEndRef} />
              </div>

              {/* Scroll Indicator Arrow */}
              <AnimatePresence>
                {showScrollArrow && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onClick={scrollToBottom}
                    className='absolute bottom-2 font-bold left-1/2 transform -translate-x-1/2 w-8 h-8 bg-sky-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-sky-600 transition-colors duration-200 z-10'
                    title='Scroll to bottom'
                  >
                    ↓
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <div className='flex gap-1 mb-1 text-sm md:text-auto items-end'>
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyPress={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    send(text);
                  }
                }}
                rows={1}
                className='flex-1 bg-gray-50 dark:bg-white/5 rounded-xl px-3 py-2 text-gray-900 dark:text-white outline-none border border-gray-200 dark:border-white/10 placeholder-gray-500 dark:placeholder-white/50 focus:border-sky-500 dark:focus:border-sky-400 transition-colors resize-none overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600'
                placeholder='Ask about skills, projects...'
                style={{
                  minHeight: '40px',
                  maxHeight: '120px',
                  height: 'auto',
                }}
                onInput={e => {
                  e.target.style.height = 'auto';
                  e.target.style.height =
                    Math.min(e.target.scrollHeight, 120) + 'px';
                }}
              />
              {/* Mic button */}
              <button
                onClick={handleMic}
                className={`px-3 py-2 rounded-xl h-10 flex items-center justify-center ${
                  listening
                    ? 'bg-sky-500 text-white animate-pulse'
                    : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/80'
                } transition-all duration-300 font-medium`}
                title={listening ? 'Listening...' : 'Speak'}
              >
                {listening ? '🎤...' : '🎤'}
              </button>
              {/* <button
                onClick={() => {
                  send(text);
                  setText('');
                }}
                className='px-4 py-2 rounded-xl h-10 flex items-center justify-center bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:from-sky-600 hover:to-indigo-700 transition-all duration-300 font-medium'
              >
                Send
              </button> */}
              <button
                onClick={() => {
                  const trimmedText = text.trim();
                  send(trimmedText);
                  setText('');
                  const textarea = document.querySelector('textarea');
                  if (textarea) {
                    textarea.style.height = '40px'; // reset to default min height
                  }
                }}
                className='px-4 py-2 rounded-xl h-10 flex items-center justify-center bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:from-sky-600 hover:to-indigo-700 transition-all duration-300 font-medium'
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
