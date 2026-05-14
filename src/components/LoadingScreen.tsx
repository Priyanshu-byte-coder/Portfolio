import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onComplete: () => void;
  minDuration?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  minDuration = 2400,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return Math.min(p + 2, 100);
      });
    }, minDuration / 55);

    const mainTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 800);
    }, minDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(mainTimer);
    };
  }, [onComplete, minDuration]);

  return (
    <div className={`page-loader ${isExiting ? 'hide' : ''}`}>
      <div className="loader-bar" />
      <div className="loader-text">Loading</div>
      <div className="loader-pct">{progress}%</div>
    </div>
  );
};
