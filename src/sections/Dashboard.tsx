import React, { useState, useEffect, useMemo } from 'react';
import './Dashboard.css';
import { SectionHeader } from '../components/SectionHeader';
import { Card } from '../components/Card';
import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}
interface GHData {
  contributions: Contribution[];
  total: Record<string, number>;
}

// ─── GitHub contributions hook ───────────────────────────────────────────────
function useGitHubContributions() {
  const [data, setData] = useState<GHData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://github-contributions-api.jogruber.de/v4/Priyanshu-byte-coder?y=last')
      .then(r => r.json())
      .then((d: GHData) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return { data, loading };
}

// Build 52-week grid aligned to Sunday columns (like GitHub)
function buildGrid(contributions: Contribution[]): Contribution[][] {
  const lookup: Record<string, Contribution> = {};
  contributions.forEach(c => { lookup[c.date] = c; });

  const weeks: Contribution[][] = [];
  const today = new Date();
  const start = new Date(today);
  start.setDate(start.getDate() - 52 * 7);
  start.setDate(start.getDate() - start.getDay()); // align to Sunday

  let cur = new Date(start);
  while (cur <= today) {
    const week: Contribution[] = [];
    for (let d = 0; d < 7; d++) {
      const ds = cur.toISOString().split('T')[0];
      week.push(lookup[ds] || { date: ds, count: 0, level: 0 as const });
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

function getMonthLabels(weeks: Contribution[][]) {
  const labels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const m = new Date(week[0].date).getMonth();
    if (m !== lastMonth) {
      labels.push({
        label: new Date(week[0].date).toLocaleString('en-US', { month: 'short' }),
        col: i,
      });
      lastMonth = m;
    }
  });
  return labels;
}

function computeStreaks(contributions: Contribution[]) {
  const sorted = [...contributions].sort((a, b) => a.date.localeCompare(b.date));
  let longest = 0, run = 0;
  for (const c of sorted) { c.count > 0 ? (run++, longest = Math.max(longest, run)) : (run = 0); }
  let current = 0, i = sorted.length - 1;
  while (i >= 0 && sorted[i].count > 0) { current++; i--; }
  return { longest, current };
}

// ─── Contribution heatmap ────────────────────────────────────────────────────
const LEVEL_COLORS = [
  'rgba(255,255,255,0.05)',
  'rgba(0,255,204,0.18)',
  'rgba(0,255,204,0.40)',
  'rgba(0,255,204,0.65)',
  '#00ffcc',
];

const ContributionGrid: React.FC<{
  weeks: Contribution[][];
  monthLabels: { label: string; col: number }[];
  total: number;
}> = ({ weeks, monthLabels, total }) => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [rendered, setRendered] = useState(false);
  useEffect(() => { if (isInView) setRendered(true); }, [isInView]);

  return (
    <div ref={ref} className={`gh-grid-wrap reveal ${isInView ? 'active' : ''}`}>
      <div className="gh-grid-header">
        <span className="gh-grid-title">
          <i className="fab fa-github" /> GitHub Contribution Activity
        </span>
        <span className="gh-grid-total">{total.toLocaleString()} contributions in the last year</span>
      </div>
      <div className="gh-grid-scroll">
        <div className="gh-grid-inner">
          {/* Month labels */}
          <div className="gh-months">
            <span className="gh-day-spacer" />
            {monthLabels.map((m, i) => {
              const nextCol = monthLabels[i + 1]?.col ?? weeks.length;
              const flex = nextCol - m.col;
              return (
                <span
                  key={i}
                  className="gh-month-label"
                  style={{ flex: `${flex} ${flex} 0`, minWidth: 0 }}
                >
                  {m.label}
                </span>
              );
            })}
          </div>
          {/* Day labels + week columns */}
          <div className="gh-body">
            <div className="gh-day-labels">
              {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
                <span key={i} className="gh-day-label">{d}</span>
              ))}
            </div>
            <div className="gh-grid">
              {weeks.map((week, wi) => (
                <div key={wi} className="gh-col">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      className="gh-cell"
                      style={{
                        background: rendered ? LEVEL_COLORS[day.level] : LEVEL_COLORS[0],
                        transitionDelay: rendered ? `${(wi * 0.003 + di * 0.001).toFixed(3)}s` : '0s',
                      }}
                      title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Legend */}
      <div className="gh-legend">
        <span className="gh-legend-text">Less</span>
        {LEVEL_COLORS.map((c, i) => (
          <div key={i} className="gh-cell" style={{ background: c }} />
        ))}
        <span className="gh-legend-text">More</span>
      </div>
    </div>
  );
};

// ─── GitHub quick-stat card ──────────────────────────────────────────────────
const GHStatCard: React.FC<{
  value: number; label: string; icon: string;
  color: string; suffix?: string;
}> = ({ value, label, icon, color, suffix = '' }) => {
  const { ref, isInView } = useInView();
  const count = useCountUp(value, 1400, isInView);
  return (
    <div ref={ref} className={`gh-stat-card reveal ${isInView ? 'active' : ''}`}>
      <i className={`${icon} gh-stat-icon`} style={{ color }} />
      <span className="gh-stat-value" style={{ color }}>{count}{suffix}</span>
      <span className="gh-stat-label">{label}</span>
    </div>
  );
};

// ─── Static data (derived from GitHub profile) ───────────────────────────────
const languages = [
  { name: 'Python',      pct: 45, color: '#3776ab' },
  { name: 'HTML / CSS',  pct: 24, color: '#e34c26' },
  { name: 'TypeScript',  pct: 14, color: '#3178c6' },
  { name: 'JavaScript',  pct: 11, color: '#f7df1e' },
  { name: 'C++',         pct:  6, color: '#f34b7d' },
];

const techStack = [
  { name: 'Python',       pct: 92, color: 'linear-gradient(90deg,#3776ab,#00ffcc)' },
  { name: 'PyTorch / DL', pct: 85, color: 'linear-gradient(90deg,#ee4c2c,#b05cff)' },
  { name: 'HTML / CSS',   pct: 80, color: 'linear-gradient(90deg,#e34c26,#f7df1e)' },
  { name: 'TypeScript',   pct: 73, color: 'linear-gradient(90deg,#3178c6,#00b8ff)' },
  { name: 'JavaScript',   pct: 68, color: 'linear-gradient(90deg,#f7df1e,#00ffcc)' },
  { name: 'C++',          pct: 83, color: 'linear-gradient(90deg,#f34b7d,#b05cff)' },
];

const activityLog = [
  { type: 'work',        event: 'Full Stack Developer Intern @ MZHub',               date: 'Dec 2025' },
  { type: 'research',    event: 'IEEE Paper — Skin Disease Detection (97.2% acc)',    date: 'Nov 2025' },
  { type: 'achievement', event: 'Coursera ML Specialization — 99.83%',               date: 'Oct 2025' },
  { type: 'leadership',  event: 'Technical Head @ Entrepreneurship Cell',            date: 'Sep 2025' },
  { type: 'achievement', event: 'PyTorch Deep Learning Bootcamp — Udemy',            date: 'Aug 2025' },
  { type: 'education',   event: 'BTech AI & ML @ Nirma University (8.85 GPA)',       date: 'Jul 2024' },
];

const coursework = [
  'Machine Learning', 'Deep Learning', 'Neural Networks',
  'Computer Vision', 'NLP Fundamentals', 'Data Structures & Algorithms',
  'Database Management', 'Operating Systems', 'Computer Networks',
  'Linear Algebra', 'Probability & Statistics', 'Python Programming',
];

const LOG_ICON: Record<string, string> = {
  work: 'fas fa-briefcase', research: 'fas fa-microscope',
  achievement: 'fas fa-trophy', leadership: 'fas fa-users', education: 'fas fa-graduation-cap',
};

// ─── Main Component ───────────────────────────────────────────────────────────
export const Dashboard: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const { data, loading } = useGitHubContributions();

  const weeks = useMemo(() =>
    data?.contributions.length ? buildGrid(data.contributions) : [],
  [data]);

  const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks]);

  const streaks = useMemo(() =>
    data?.contributions.length ? computeStreaks(data.contributions) : { longest: 12, current: 0 },
  [data]);

  const totalContribs = useMemo(() => {
    if (!data?.total) return 0;
    return data.total.lastYear ??
      (Object.values(data.total) as number[]).reduce((a, b) => a + b, 0);
  }, [data]);

  return (
    <section id="dashboard" className="dashboard" ref={ref}>
      <div className="container">

        <div className={`reveal ${isInView ? 'active' : ''}`}>
          <SectionHeader
            title="Analytics Dashboard"
            subtitle="Real-time GitHub activity & development overview"
          />
        </div>

        {/* Row 1: GitHub quick stats */}
        <div className={`gh-stats-row stagger-children ${isInView ? 'active' : ''}`}>
          <GHStatCard value={totalContribs || 280} label="Contributions (1yr)" icon="fas fa-chart-simple" color="#00ffcc" />
          <GHStatCard value={25} label="Public Repos" icon="fab fa-github" color="#00b8ff" />
          <GHStatCard value={17} label="Months Active" icon="fas fa-calendar-check" color="#b05cff" suffix="+" />
          <GHStatCard value={streaks.longest || 12} label="Longest Streak" icon="fas fa-fire" color="#ffc800" suffix=" days" />
        </div>

        {/* Row 2: Contribution heatmap */}
        {!loading && weeks.length > 0 ? (
          <ContributionGrid weeks={weeks} monthLabels={monthLabels} total={totalContribs} />
        ) : (
          <div className={`gh-grid-wrap gh-grid-skeleton reveal ${isInView ? 'active' : ''}`}>
            <div className="gh-grid-header">
              <span className="gh-grid-title"><i className="fab fa-github" /> GitHub Contribution Activity</span>
            </div>
            <div className="gh-skeleton-cells">
              {Array.from({ length: 52 * 7 }).map((_, i) => (
                <div key={i} className="gh-cell gh-cell--loading" />
              ))}
            </div>
          </div>
        )}

        {/* Row 3: Language distribution + Activity Log */}
        <div className={`dash-main-grid stagger-children ${isInView ? 'active' : ''}`}>
          <Card className="dash-card">
            <h3 className="dash-card__title">
              <i className="fas fa-code" style={{ color: '#00ffcc' }} /> Language Distribution
            </h3>
            <div className="dash-lang-list">
              {languages.map(l => (
                <div key={l.name} className="lang-row">
                  <div className="lang-meta">
                    <span className="lang-dot" style={{ background: l.color }} />
                    <span className="lang-name">{l.name}</span>
                    <span className="lang-pct">{l.pct}%</span>
                  </div>
                  <div className="lang-track">
                    <div
                      className="lang-fill"
                      style={{
                        width: isInView ? `${l.pct}%` : '0%',
                        background: l.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="dash-card">
            <h3 className="dash-card__title">
              <i className="fas fa-clock-rotate-left" style={{ color: '#b05cff' }} /> Activity Log
            </h3>
            <div className="dash-log">
              {activityLog.map((item, i) => (
                <div key={i} className="dash-log__item">
                  <div className={`dash-log__dot dash-log__dot--${item.type}`}>
                    <i className={LOG_ICON[item.type]} />
                  </div>
                  <div className="dash-log__body">
                    <span className="dash-log__event">{item.event}</span>
                    <span className="dash-log__date">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Row 4: Tech Proficiency */}
        <div className={`reveal ${isInView ? 'active' : ''}`} style={{ transitionDelay: '0.2s' }}>
          <Card className="dash-card dash-card--wide">
            <h3 className="dash-card__title">
              <i className="fas fa-gauge-high" style={{ color: '#00b8ff' }} /> Tech Proficiency
            </h3>
            <div className="dash-tech-list">
              {techStack.map((t, i) => (
                <div key={t.name} className="dash-tech-row">
                  <span className="dash-tech-name">{t.name}</span>
                  <div className="dash-tech-track">
                    <div
                      className="dash-tech-fill"
                      style={{
                        width: isInView ? `${t.pct}%` : '0%',
                        background: t.color,
                        transitionDelay: `${i * 80}ms`,
                      }}
                    />
                  </div>
                  <span className="dash-tech-pct">{t.pct}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Row 5: Coursework */}
        <div className={`reveal ${isInView ? 'active' : ''}`} style={{ transitionDelay: '0.35s' }}>
          <Card className="dash-card dash-card--wide dash-card--coursework">
            <h3 className="dash-card__title">
              <i className="fas fa-book" style={{ color: '#b05cff' }} /> Relevant Coursework
            </h3>
            <div className="dash-coursework">
              {coursework.map((c, i) => (
                <span
                  key={c}
                  className="dash-coursework__chip"
                  style={{
                    opacity: isInView ? 1 : 0,
                    transform: isInView ? 'translateY(0)' : 'translateY(10px)',
                    transition: `opacity 0.4s ease ${i * 0.04}s, transform 0.4s ease ${i * 0.04}s`,
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </section>
  );
};
