import React from 'react';
import './MarqueeStrip.css';
import { MARQUEE_ITEMS } from '../data';

export const MarqueeStrip: React.FC = () => (
  <div className="marquee-strip">
    <div className="marquee-track">
      {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
        <span className="marquee-item" key={i}>{item}</span>
      ))}
    </div>
  </div>
);
