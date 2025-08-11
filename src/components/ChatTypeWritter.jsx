import React, { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

const ChatTypeWriter = ({
  text = '',
  className = '',
  speed = 60,
  pauseBetweenLines = 200,
  renderMarkdown = true,
  onFinish,
}) => {
  const lines = text === '' ? [''] : text.split(/\r?\n/);

  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  const timerRef = useRef(null);
  const finishedRef = useRef(false);
  const endRef = useRef(null); // 👈 for auto-scroll

  useEffect(() => {
    clearTimeout(timerRef.current);
    setLineIndex(0);
    setCharIndex(0);
    setDone(false);
    finishedRef.current = false;
    return () => clearTimeout(timerRef.current);
  }, [text]);

  useEffect(() => {
    clearTimeout(timerRef.current);

    if (lineIndex >= lines.length) {
      if (!finishedRef.current) {
        finishedRef.current = true;
        setDone(true);
        if (typeof onFinish === 'function') {
          setTimeout(() => onFinish(), 0);
        }
      }
      return;
    }

    const currentLine = lines[lineIndex] ?? '';

    if (!currentLine.length) {
      timerRef.current = setTimeout(() => {
        setLineIndex(li => li + 1);
        setCharIndex(0);
      }, Math.max(60, pauseBetweenLines));
      return () => clearTimeout(timerRef.current);
    }

    if (charIndex < currentLine.length) {
      timerRef.current = setTimeout(() => {
        setCharIndex(ci => Math.min(ci + 1, currentLine.length));
      }, speed);
      return () => clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setLineIndex(li => li + 1);
      setCharIndex(0);
    }, pauseBetweenLines);

    return () => clearTimeout(timerRef.current);
  }, [lines, lineIndex, charIndex, speed, pauseBetweenLines, onFinish]);

  // 👇 Auto-scroll effect
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [lineIndex, charIndex, done]);

  const containerStyle = {
    display: 'block',
    width: '100%',
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    lineHeight: 1.45,
    fontSize: '0.95rem',
    color: 'inherit',
    textAlign: 'left',
  };

  if (!done) {
    return (
      <div className={`${className}`} style={containerStyle} aria-live='polite'>
        {lines.slice(0, lineIndex).map((ln, idx) => (
          <div key={`done-${idx}`} className='chat-line mb-0.5'>
            {renderMarkdown ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
              >
                {ln}
              </ReactMarkdown>
            ) : (
              <div style={{ whiteSpace: 'pre-wrap' }}>{ln}</div>
            )}
          </div>
        ))}

        {lineIndex < lines.length && (
          <div key={`current-${lineIndex}`} className='chat-line mb-0.5'>
            <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {lines[lineIndex].slice(0, charIndex)}
              {charIndex < (lines[lineIndex]?.length ?? 0) && (
                <span className='animate-pulse inline-block ml-1' aria-hidden>
                  |
                </span>
              )}
            </div>
          </div>
        )}

        {/* Auto-scroll anchor */}
        <div ref={endRef} />
      </div>
    );
  }

  return (
    <div className={`${className}`} style={containerStyle}>
      {renderMarkdown ? (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
        >
          {text}
        </ReactMarkdown>
      ) : (
        <div style={{ whiteSpace: 'pre-wrap' }}>{text}</div>
      )}
      <div ref={endRef} />
    </div>
  );
};

export default ChatTypeWriter;
