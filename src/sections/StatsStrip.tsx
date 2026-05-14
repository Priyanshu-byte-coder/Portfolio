import React from 'react';
import './StatsStrip.css';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
}

function StatCounter({ value, suffix = '', label, decimals = 0 }: StatCounterProps) {
  const { ref, count } = useCountUp(value, 2200, decimals);
  return (
    <div className="stat-counter" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="stat-val">{count}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export const StatsStrip: React.FC = () => {
  const [ref, visible] = useScrollReveal(0.2);
  return (
    <div className="stats-strip" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className={`stats-strip-inner reveal ${visible ? 'visible' : ''}`}>
        <StatCounter value={20} suffix="+" label="Projects" />
        <div className="stats-divider" />
        <StatCounter value={1} label="IEEE Paper" />
        <div className="stats-divider" />
        <StatCounter value={8.85} label="CGPA" decimals={2} />
        <div className="stats-divider" />
        <StatCounter value={200} suffix="+" label="LC Problems" />
      </div>
    </div>
  );
};
