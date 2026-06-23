import React from 'react';
import './GitHub.css';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useDevTrackStats } from '../hooks/useDevTrackStats';

const GH_USER = 'Priyanshu-byte-coder';

const STREAK_URL =
  `https://streak-stats.demolab.com/?user=${GH_USER}` +
  `&theme=transparent&hide_border=true` +
  `&background=0c0b09&ring=c45d3e&fire=b8976a` +
  `&currStreakLabel=c45d3e&sideLabels=6b6560&dates=3a3632` +
  `&currStreakNum=e8e4dc&sideNums=e8e4dc`;

const CDN = 'https://github.githubassets.com/images/modules/profile/achievements';

interface Achievement {
  slug: string;
  name: string;
  desc: string;
  tier?: 'x2' | 'x3' | 'x4';
}

const ACHIEVEMENTS: Achievement[] = [
  { slug: 'starstruck',           name: 'Starstruck',            desc: 'Created a repository that has 16+ stars' },
  { slug: 'pair-extraordinaire',  name: 'Pair Extraordinaire',   desc: 'Co-authored commits in merged pull requests' },
  { slug: 'quickdraw',            name: 'Quickdraw',             desc: 'Closed a PR or issue within 5 min of opening' },
  { slug: 'yolo',                 name: 'YOLO',                  desc: 'Merged a pull request without a code review' },
  { slug: 'pull-shark',           name: 'Pull Shark',            desc: 'Opened pull requests that have been merged', tier: 'x2' },
];

export const GitHub: React.FC = () => {
  const [ref, visible] = useScrollReveal(0.06);
  const { stats: dt, loading: dtLoading } = useDevTrackStats();

  return (
    <section className="section" id="github">
      <div className="section-inner" ref={ref as React.RefObject<HTMLDivElement>}>
        <span className={`section-number reveal ${visible ? 'visible' : ''}`}>05 — Open Source</span>
        <h2 className={`section-heading reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
          GitHub <span className="thin">Activity</span>
        </h2>

        <div className="gh-cards">
          {/* ── Contribution Map ── */}
          <div className={`gh-card reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <div className="gh-card-label">Contribution Map</div>
            <img src={`https://ghchart.rshah.org/c45d3e/${GH_USER}`} alt="Contributions" loading="lazy" />
          </div>

          {/* ── Streak + Achievements ── */}
          <div className="gh-row">
            <div className={`gh-card reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
              <div className="gh-card-label">Streak</div>
              <img src={STREAK_URL} alt="GitHub Streak" loading="lazy" />
            </div>
            <div className={`gh-card reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
              <div className="gh-card-label">Profile Achievements</div>
              <div className="gh-ach-grid">
                {ACHIEVEMENTS.map((a) => {
                  const imgSlug = a.tier ? `${a.slug}${a.tier}` : a.slug;
                  return (
                    <a
                      key={a.slug}
                      href={`https://github.com/${GH_USER}?tab=achievements`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gh-ach-card"
                      title={a.desc}
                    >
                      <div className="gh-ach-img-wrap">
                        <img
                          src={`${CDN}/${imgSlug}-default.png`}
                          alt={a.name}
                          loading="lazy"
                          onError={(e) => {
                            const t = e.currentTarget;
                            if (a.tier && t.src.includes(imgSlug)) {
                              t.src = `${CDN}/${a.slug}-default.png`;
                            }
                          }}
                        />
                      </div>
                      <span className="gh-ach-name">{a.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Featured Project: DevTrack ── */}
          <div className={`gh-card gh-featured reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.5s' }}>
            <div className="gh-featured-header">
              <div className="gh-featured-left">
                <div className="gh-featured-badges">
                  <div className="gh-featured-badge gh-badge-founder">Founder</div>
                  <div className="gh-featured-badge gh-badge-maintainer">Lead Maintainer</div>
                </div>
                <h3 className="gh-featured-title">
                  <a href="https://github.com/Umbrella-io/devtrack" target="_blank" rel="noopener noreferrer">
                    DevTrack
                  </a>
                </h3>
                <p className="gh-featured-desc">
                  Built from scratch — an open-source developer productivity dashboard
                  powering GitHub stats, PR metrics, streaks & goals for a growing community.
                </p>
                <div className="gh-featured-meta">
                  <span className="gh-featured-lang">
                    <span className="gh-lang-dot gh-lang-ts" /> TypeScript
                  </span>
                  <span className="gh-featured-license">MIT</span>
                </div>
              </div>
            </div>

            {dtLoading ? (
              <div className="gh-stats-loading">Loading metrics…</div>
            ) : dt ? (
              <div className="gh-featured-metrics">
                <div className="gh-metric">
                  <span className="gh-metric-value">{dt.stars.toLocaleString()}</span>
                  <span className="gh-metric-label">Stars</span>
                </div>
                <div className="gh-metric-divider" />
                <div className="gh-metric">
                  <span className="gh-metric-value">{dt.forks.toLocaleString()}</span>
                  <span className="gh-metric-label">Forks</span>
                </div>
                <div className="gh-metric-divider" />
                <div className="gh-metric">
                  <span className="gh-metric-value">{dt.mergedPRs.toLocaleString()}</span>
                  <span className="gh-metric-label">Merged PRs</span>
                </div>
                <div className="gh-metric-divider" />
                <div className="gh-metric">
                  <span className="gh-metric-value">{dt.contributors.toLocaleString()}</span>
                  <span className="gh-metric-label">Contributors</span>
                </div>
                <div className="gh-metric-divider" />
                <div className="gh-metric">
                  <span className="gh-metric-value">{dt.openIssues.toLocaleString()}</span>
                  <span className="gh-metric-label">Open Issues</span>
                </div>
              </div>
            ) : null}

            {dt && dt.topics.length > 0 && (
              <div className="gh-featured-topics">
                {dt.topics.slice(0, 10).map((t) => (
                  <span key={t} className="gh-topic">{t}</span>
                ))}
              </div>
            )}

            <a
              href="https://github.com/Umbrella-io/devtrack"
              target="_blank"
              rel="noopener noreferrer"
              className="gh-featured-cta"
            >
              View on GitHub →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
