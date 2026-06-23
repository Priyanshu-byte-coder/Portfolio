import React from 'react';
import './GitHub.css';
import { useScrollReveal } from '../hooks/useScrollReveal';

const GH_USER = 'Priyanshu-byte-coder';

const STATS_URL =
  `https://github-readme-stats.vercel.app/api?username=${GH_USER}` +
  `&show_icons=true&hide_border=true` +
  `&bg_color=0c0b09&title_color=c45d3e&icon_color=b8976a&text_color=6b6560` +
  `&ring_color=c45d3e&include_all_commits=true&cache_seconds=1800`;

const STREAK_URL =
  `https://streak-stats.demolab.com/?user=${GH_USER}` +
  `&theme=transparent&hide_border=true` +
  `&background=0c0b09&ring=c45d3e&fire=b8976a` +
  `&currStreakLabel=c45d3e&sideLabels=6b6560&dates=3a3632` +
  `&currStreakNum=e8e4dc&sideNums=e8e4dc`;

// GitHub CDN — stable path for achievement badge images
const CDN = 'https://github.githubassets.com/images/modules/profile/achievements';

interface Achievement {
  slug: string;
  name: string;
  desc: string;
  tier?: 'x2' | 'x3' | 'x4'; // bronze / silver / gold tier suffix
}

// ── Edit this list to match your actual earned achievements ──
const ACHIEVEMENTS: Achievement[] = [
  { slug: 'starstruck',           name: 'Starstruck',            desc: 'Created a repository that has 16+ stars' },
  { slug: 'pair-extraordinaire',  name: 'Pair Extraordinaire',   desc: 'Co-authored commits in merged pull requests' },
  { slug: 'quickdraw',            name: 'Quickdraw',             desc: 'Closed a PR or issue within 5 min of opening' },
  { slug: 'yolo',                 name: 'YOLO',                  desc: 'Merged a pull request without a code review' },
  { slug: 'pull-shark',           name: 'Pull Shark',            desc: 'Opened pull requests that have been merged', tier: 'x2' },
];

export const GitHub: React.FC = () => {
  const [ref, visible] = useScrollReveal(0.06);

  return (
    <section className="section" id="github">
      <div className="section-inner" ref={ref as React.RefObject<HTMLDivElement>}>
        <span className={`section-number reveal ${visible ? 'visible' : ''}`}>05 — Open Source</span>
        <h2 className={`section-heading reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
          GitHub <span className="thin">Activity</span>
        </h2>

        <div className="gh-cards">
          {/* Contribution map — full width */}
          <div className={`gh-card reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <div className="gh-card-label">Contribution Map</div>
            <img src={`https://ghchart.rshah.org/c45d3e/${GH_USER}`} alt="Contributions" loading="lazy" />
          </div>

          {/* Stats + Streak */}
          <div className="gh-row">
            <div className={`gh-card reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
              <div className="gh-card-label">Profile Stats</div>
              <img src={STATS_URL} alt="GitHub Stats" loading="lazy" />
            </div>
            <div className={`gh-card reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
              <div className="gh-card-label">Streak</div>
              <img src={STREAK_URL} alt="GitHub Streak" loading="lazy" />
            </div>
          </div>

          {/* Achievements — below stats/streak */}
          <div className={`gh-card reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.5s' }}>
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
      </div>
    </section>
  );
};
