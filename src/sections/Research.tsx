import React from 'react';
import './Research.css';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const Research: React.FC = () => {
  const [ref, visible] = useScrollReveal(0.08);

  return (
    <section className="section" id="research" style={{ background: 'var(--bg-warm)' }}>
      <div className="section-inner" ref={ref as React.RefObject<HTMLDivElement>}>
        <span className={`section-number reveal ${visible ? 'visible' : ''}`}>04 — Research</span>
        <h2 className={`section-heading reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
          Publi<span className="thin">cations</span>
        </h2>

        <div className={`research-card reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
          <div className="research-card-top">
            <div className="research-venue">IEEE Sensors Letters · 2026</div>
            <a
              href="https://ieeexplore.ieee.org/document/11359621"
              target="_blank"
              rel="noopener noreferrer"
              className="research-link"
            >
              View Paper
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
          <h3 className="research-title">Robotic Arm Fault Detection using CatBoost Classifier</h3>
          <p className="research-abstract">
            Predictive industrial fault detection using the CASPER robotic arm dataset. CatBoost-based ensemble approach
            outperforming SVM, Logistic Regression, Naive Bayes, and Quadratic Discriminant Analysis baselines across
            all evaluation metrics.
          </p>
          <div className="research-metrics-row">
            <div className="research-metric">
              <div className="research-metric-val">97.20%</div>
              <div className="research-metric-label">Accuracy</div>
            </div>
            <div className="research-metric">
              <div className="research-metric-val">0.9718</div>
              <div className="research-metric-label">F1 Score</div>
            </div>
            <div className="research-metric">
              <div className="research-metric-val">4</div>
              <div className="research-metric-label">Baselines Beat</div>
            </div>
            <div className="research-metric">
              <div className="research-metric-val">100+</div>
              <div className="research-metric-label">Full-Text Views · IEEE Xplore</div>
            </div>
          </div>
          <div className="research-tags">
            <span>CatBoost</span>
            <span>Fault Detection</span>
            <span>Robotics</span>
            <span>IEEE</span>
            <span>Sensors</span>
          </div>
        </div>
      </div>
    </section>
  );
};
