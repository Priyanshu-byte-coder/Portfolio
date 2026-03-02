import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onComplete: () => void;
  minDuration?: number;
}

const bootLines = [
  { text: '> Initializing system...', delay: 0 },
  { text: '> Loading neural modules...', delay: 400 },
  { text: '> Compiling portfolio data...', delay: 800 },
  { text: '> Mounting components...', delay: 1200 },
  { text: '> System ready.', delay: 1800, accent: true },
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  minDuration = 3200,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    bootLines.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), line.delay));
    });

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return Math.min(p + 2, 100);
      });
    }, minDuration / 55);

    const mainTimer = setTimeout(() => {
      setIsExiting(true);
      timers.push(setTimeout(onComplete, 800));
    }, minDuration);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(mainTimer);
      clearInterval(interval);
    };
  }, [onComplete, minDuration]);

  const name = 'Priyanshu Doshi';

  return (
    <div className={`loading-screen ${isExiting ? 'loading-screen--exit' : ''}`}>
      <div className="loading-screen__bg">
        <div className="loading-screen__grid" aria-hidden />
        <div className="loading-screen__scanline" aria-hidden />
        <div className="loading-screen__particles" aria-hidden>
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="loading-screen__particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="loading-screen__content">
        <div className="loading-screen__hex">
          <div className="loading-screen__hex-ring loading-screen__hex-ring--1" />
          <div className="loading-screen__hex-ring loading-screen__hex-ring--2" />
          <div className="loading-screen__hex-ring loading-screen__hex-ring--3" />
          <div className="loading-screen__hex-core">
            <span className="loading-screen__hex-label text-gradient">PD</span>
          </div>
        </div>

        <h1 className="loading-screen__name">
          {name.split(' ').map((word, wi) => (
            <span key={wi} className="loading-screen__word">
              {word.split('').map((char, ci) => (
                <span
                  key={ci}
                  className="loading-screen__char"
                  style={{ animationDelay: `${400 + wi * 100 + ci * 50}ms` }}
                >
                  {char}
                </span>
              ))}
              {wi < name.split(' ').length - 1 ? '\u00A0' : null}
            </span>
          ))}
        </h1>

        <p className="loading-screen__tagline">AI &amp; Machine Learning Engineer</p>

        <div className="loading-screen__terminal">
          {bootLines.slice(0, visibleLines).map((line, i) => (
            <span
              key={i}
              className={`loading-screen__term-line ${line.accent ? 'loading-screen__term-line--accent' : ''}`}
            >
              {line.text}
            </span>
          ))}
        </div>

        <div className="loading-screen__bar-wrap">
          <div className="loading-screen__bar" style={{ width: `${progress}%` }} />
        </div>
        <span className="loading-screen__pct">{progress}%</span>
      </div>

      {/* Mechanical exit doors */}
      <div className="loading-screen__door loading-screen__door--left" />
      <div className="loading-screen__door loading-screen__door--right" />
    </div>
  );
};
