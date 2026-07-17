import React from 'react';
import './GitHub.css';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useDevTrackStats } from '../hooks/useDevTrackStats';
import { useGitHubStats } from '../hooks/useGitHubStats';

const GH_USER = 'Priyanshu-byte-coder';

// Daily cache-buster — external chart services (ghchart, streak-stats) sit
// behind CDNs that serve stale SVGs for days; a date-stamped query param
// forces a fresh render once per day.
const CB = new Date().toISOString().slice(0, 10).replace(/-/g, '');

// github-readme-stats image — FALLBACK ONLY (public instances are flaky and
// often serve a "Something went wrong" card). Primary stats render from the
// GitHub API via useGitHubStats.
const STATS_URL =
  `https://github-readme-stats-fast.vercel.app/api?username=${GH_USER}` +
  `&show_icons=true&hide_border=true&count_private=true` +
  `&bg_color=00000000&title_color=c45d3e&icon_color=c45d3e` +
  `&text_color=c4bfb5&ring_color=b8976a&cache_seconds=21600&v=${CB}`;

const STREAK_URL =
  `https://streak-stats.demolab.com/?user=${GH_USER}` +
  `&theme=transparent&hide_border=true` +
  `&background=0c0b09&ring=c45d3e&fire=b8976a` +
  `&currStreakLabel=c45d3e&sideLabels=6b6560&dates=3a3632` +
  `&currStreakNum=e8e4dc&sideNums=e8e4dc&v=${CB}`;

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

// Octicon icons — same glyphs the github-readme-stats card uses
const STAT_ICONS: Record<string, string> = {
  star: 'M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z',
  commit: 'M10.5 7.75a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm1.43.75a4.002 4.002 0 01-7.86 0H.75a.75.75 0 110-1.5h3.32a4.002 4.002 0 017.86 0h3.32a.75.75 0 110 1.5h-3.32z',
  pr: 'M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.24a.75.75 0 111.5 0 .75.75 0 01-1.5 0zm-8.25-.75a.75.75 0 100 1.5.75.75 0 000-1.5z',
  issue: 'M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z',
  fork: 'M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z',
};

function StatRow({ icon, label, value }: { icon: string; label: string; value: number }) {
  return (
    <div className="gh-stat-row">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d={STAT_ICONS[icon]} />
      </svg>
      <span className="gh-stat-label">{label}</span>
      <span className="gh-stat-value">{value.toLocaleString()}</span>
    </div>
  );
}

/** Circular rank ring — replica of the github-readme-stats rank circle. */
function RankRing({ level, percentile }: { level: string; percentile: number }) {
  const R = 40;
  const CIRC = 2 * Math.PI * R;
  // ring fills with (100 - percentile), same as the original card
  const progress = Math.max(0, Math.min(100, 100 - percentile));
  return (
    <div className="gh-rank-ring" title={`Top ${percentile.toFixed(1)}%`}>
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={R} fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="7" />
        <circle
          className="gh-rank-progress"
          cx="55" cy="55" r={R} fill="none" stroke="currentColor" strokeWidth="7"
          strokeLinecap="round" strokeDasharray={CIRC}
          strokeDashoffset={CIRC * (1 - progress / 100)}
          transform="rotate(-90 55 55)"
        />
        <text x="55" y="55" textAnchor="middle" dominantBaseline="central" className="gh-rank-letter">
          {level}
        </text>
      </svg>
    </div>
  );
}

export const GitHub: React.FC = () => {
  const [ref, visible] = useScrollReveal(0.06);
  const { stats: dt, loading: dtLoading } = useDevTrackStats();
  const { stats: gh, loading: ghLoading } = useGitHubStats();

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
            <img src={`https://ghchart.rshah.org/c45d3e/${GH_USER}?v=${CB}`} alt="Contributions" loading="lazy" />
          </div>

          {/* ── Stats + Streak ── */}
          <div className="gh-row">
            <div className={`gh-card reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.25s' }}>
              <div className="gh-card-label">GitHub Stats</div>
              {gh ? (
                <div className="gh-stats-card">
                  <div className="gh-stats-left">
                    <div className="gh-stats-title">Priyanshu Doshi's GitHub Stats</div>
                    <StatRow icon="star" label="Total Stars Earned:" value={gh.totalStars} />
                    <StatRow icon="commit" label="Total Commits:" value={gh.totalCommits} />
                    <StatRow icon="pr" label="Total PRs:" value={gh.totalPRs} />
                    <StatRow icon="issue" label="Total Issues:" value={gh.totalIssues} />
                    <StatRow icon="fork" label="Total Forks:" value={gh.totalForks} />
                  </div>
                  <RankRing level={gh.rankLevel} percentile={gh.rankPercentile} />
                </div>
              ) : ghLoading ? (
                <div className="gh-stats-loading">Loading stats…</div>
              ) : (
                // GitHub API rate-limited for this visitor — fall back to the
                // external stats image (may itself be flaky).
                <img className="gh-stats-img" src={STATS_URL} alt="GitHub Stats" loading="lazy" />
              )}
            </div>
            <div className={`gh-card reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
              <div className="gh-card-label">Streak</div>
              <img src={STREAK_URL} alt="GitHub Streak" loading="lazy" />
            </div>
          </div>

          {/* ── Achievements — full row ── */}
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

          {/* ── Featured Project: DevTrack ── */}
          <div className={`gh-card gh-featured reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.5s' }}>
            <div className="gh-featured-header">
              <div className="gh-featured-left">
                <div className="gh-featured-badges">
                  <div className="gh-featured-badge gh-badge-founder">Founder</div>
                  <div className="gh-featured-badge gh-badge-maintainer">Maintainer</div>
                </div>
                <h3 className="gh-featured-title">
                  <a href="https://github.com/Priyanshu-byte-coder/devtrack" target="_blank" rel="noopener noreferrer">
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
                {dt.topics.filter((t) => !t.toLowerCase().startsWith('gssoc')).slice(0, 10).map((t) => (
                  <span key={t} className="gh-topic">{t}</span>
                ))}
              </div>
            )}

            <a
              href="https://github.com/Priyanshu-byte-coder/devtrack"
              target="_blank"
              rel="noopener noreferrer"
              className="gh-featured-cta"
            >
              View on GitHub →
            </a>
          </div>

          {/* ── Upstream contributions — major orgs ── */}
          <div className={`gh-card gh-upstream reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.6s' }}>
            <div className="gh-card-label">Open Source — Major Orgs</div>
            <div className="gh-upstream-org">
              <div className="gh-upstream-head">
                {/* PyTorch flame */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#ee4c2c" aria-hidden="true"><path d="M12.005 0L4.952 7.053a9.865 9.865 0 000 13.947 9.866 9.866 0 0013.947 0 9.866 9.866 0 000-13.947l-1.394 1.394a7.888 7.888 0 010 11.16 7.888 7.888 0 01-11.16 0 7.888 7.888 0 010-11.16l4.62-4.62.013 5.499h1.97L12.945.94 12.005 0zm3.568 3.899a1.327 1.327 0 00-1.327 1.327 1.327 1.327 0 001.327 1.328A1.327 1.327 0 0016.9 5.226a1.327 1.327 0 00-1.327-1.327z"/></svg>
                <a href="https://github.com/pytorch/pytorch" target="_blank" rel="noopener noreferrer" className="gh-upstream-repo">PyTorch</a>
                <span className="gh-upstream-count">Contributor</span>
              </div>
              <p className="gh-upstream-note">
                My pull requests have been merged into PyTorch — code contributed
                upstream now lives in <code>pytorch/pytorch</code> core.
              </p>
            </div>
            <div className="gh-upstream-org gh-upstream-divided">
              <div className="gh-upstream-head">
                {/* TensorFlow mark */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#ff6f00" aria-hidden="true"><path d="M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.168 3.564.015-5.311zm21.416 0L12.46 0v24l4.095-2.378V14.87l3.092 1.788-.018-4.618-3.074-1.756V7.603l6.168 3.564-.015-5.311z"/></svg>
                <a href="https://github.com/tensorflow/tensorflow" target="_blank" rel="noopener noreferrer" className="gh-upstream-repo">TensorFlow</a>
                <span className="gh-upstream-count">Contributor</span>
              </div>
              <p className="gh-upstream-note">
                Merged a pull request into TensorFlow — <code>tf.signal</code> documentation
                and validation fixes now live in <code>tensorflow/tensorflow</code>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
