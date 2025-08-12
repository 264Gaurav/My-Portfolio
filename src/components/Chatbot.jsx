import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { askGemini } from '../utils/gemini';
import profileImg from '../assets/Gaurav_DP.jpeg';
import ChatTypeWriter from './ChatTypeWritter';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

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
  }, [msgs]);

  // Check if user is scrolled away from bottom
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = chatContainer;
      setShowScrollArrow(scrollTop + clientHeight < scrollHeight - 20);
    };
    chatContainer.addEventListener('scroll', handleScroll);
    return () => chatContainer.removeEventListener('scroll', handleScroll);
  }, []);

  // TTS for latest bot message
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (!speakerOn) {
      window.speechSynthesis.cancel();
      lastSpokenRef.current = null;
      return;
    }

    const last = msgs[msgs.length - 1];
    if (!last || last.from !== 'bot') return;

    const textToSpeak = (last.text || '').trim();
    if (!textToSpeak || textToSpeak === 'Thinking...') return;
    if (lastSpokenRef.current === textToSpeak) return;

    window.speechSynthesis.cancel();
    const utter = new window.SpeechSynthesisUtterance(textToSpeak);
    utter.rate = 1.05;
    utter.pitch = 1.1;
    utter.onend = () => {
      lastSpokenRef.current = textToSpeak;
    };
    window.speechSynthesis.speak(utter);

    return () => window.speechSynthesis.cancel();
  }, [msgs, speakerOn]);

  // Mic input
  const handleMic = () => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onresult = e => {
      setText(t => (t ? t + ' ' : '') + e.results[0][0].transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    } catch {
      setMsgs(m => [
        ...m.slice(0, -1),
        {
          from: 'bot',
          text: 'Sorry, AI is not available right now.',
          isTyping: false,
        },
      ]);
    }
  }

  const handleTypingFinished = index => {
    setMsgs(prev =>
      prev.map((m, i) => (i === index ? { ...m, isTyping: false } : m))
    );
  };

  return (
    <div className='fixed right-4 bottom-4 z-50'>
      {/* Chat Window (always mounted) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={open ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        style={{ display: open ? 'block' : 'none' }}
        className='mb-2 w-80 md:w-100 bg-white/90 dark:bg-black/40 rounded-2xl p-2 shadow-2xl border border-gray-200 dark:border-white/20 backdrop-blur'
      >
        {/* Header */}
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center gap-3'>
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
            <button
              onClick={() => setSpeakerOn(s => !s)}
              className={`text-lg w-10 h-10 p-1 rounded-full transition-colors duration-200 ${
                speakerOn
                  ? 'bg-sky-500 text-white'
                  : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/80'
              }`}
            >
              {speakerOn ? '🔊' : '🔇'}
            </button>
            <button
              onClick={() => setOpen(false)}
              className='px-2 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-white/20'
            >
              Close
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className='relative'>
          <div
            ref={chatContainerRef}
            className='h-80 md:h-100 overflow-y-auto space-y-3 mb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600'
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
                      ? 'inline-block bg-gray-100 dark:bg-white/10 px-2 py-1 rounded-xl max-w-[80%] leading-relaxed'
                      : 'inline-block bg-sky-100 dark:bg-sky-600/20 px-2 py-1 rounded-xl max-w-[80%] leading-relaxed'
                  }
                >
                  {m.from === 'bot' && m.isTyping ? (
                    <ChatTypeWriter
                      text={m.text}
                      speed={60}
                      pauseBetweenLines={300}
                      renderMarkdown={true}
                      onFinish={() => handleTypingFinished(i)}
                    />
                  ) : m.from === 'bot' ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    >
                      {m.text}
                    </ReactMarkdown>
                  ) : (
                    <span>{m.text}</span>
                  )}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Scroll to bottom arrow */}
          {showScrollArrow && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={scrollToBottom}
              className='absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-sky-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-sky-600'
            >
              ↓
            </motion.button>
          )}
        </div>

        {/* Input Row */}
        <div className='flex gap-1 items-end'>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send(text.trim());
              }
            }}
            rows={1}
            placeholder='Ask about Gaurav...'
            className='flex-1 bg-gray-50 dark:bg-white/5 rounded-xl px-3 py-2 outline-none border border-gray-200 dark:border-white/10 focus:border-sky-500 dark:focus:border-sky-400 resize-none overflow-y-auto scrollbar-thin'
          />
          <button
            onClick={handleMic}
            className={`h-10 w-10 p-1 rounded-full flex items-center justify-center ${
              listening
                ? 'bg-sky-500 text-white animate-pulse'
                : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/80'
            }`}
          >
            🎤
          </button>
          <button
            onClick={() => send(text.trim())}
            className='px-4 py-2 rounded-xl h-10 bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:from-sky-600 hover:to-indigo-700'
          >
            Send
          </button>
        </div>
      </motion.div>

      {/* Chatbot toggle button */}
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='w-14 h-14 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 shadow-lg flex items-center justify-center text-white text-lg'
        >
          💬
        </motion.button>
      )}
    </div>
  );
};

export default Chatbot;
