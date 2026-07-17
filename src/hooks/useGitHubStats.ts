import { useEffect, useState } from 'react';

const GH_USER = 'Priyanshu-byte-coder';
const CACHE_KEY = 'gh-stats-v2';
const CACHE_TTL = 6 * 60 * 60 * 1000; // 6h — protects unauthenticated rate limits

export interface GitHubStats {
  publicRepos: number;
  followers: number;
  totalStars: number;
  totalForks: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  /** letter grade + percentile, same algorithm as github-readme-stats */
  rankLevel: string;
  rankPercentile: number;
  topLanguages: { name: string; count: number }[];
}

/* ── rank calculation ported from github-readme-stats/src/calculateRank.js ── */
function expCdf(x: number) { return 1 - 2 ** -x; }
function logNormalCdf(x: number) { return x / (1 + x); }

function calculateRank(s: {
  commits: number; prs: number; issues: number;
  stars: number; followers: number; reviews: number;
}): { level: string; percentile: number } {
  const COMMITS_MEDIAN = 250, COMMITS_WEIGHT = 2;
  const PRS_MEDIAN = 50, PRS_WEIGHT = 3;
  const ISSUES_MEDIAN = 25, ISSUES_WEIGHT = 1;
  const REVIEWS_MEDIAN = 2, REVIEWS_WEIGHT = 1;
  const STARS_MEDIAN = 50, STARS_WEIGHT = 4;
  const FOLLOWERS_MEDIAN = 10, FOLLOWERS_WEIGHT = 1;
  const TOTAL_WEIGHT =
    COMMITS_WEIGHT + PRS_WEIGHT + ISSUES_WEIGHT + REVIEWS_WEIGHT + STARS_WEIGHT + FOLLOWERS_WEIGHT;

  const rank =
    1 -
    (COMMITS_WEIGHT * expCdf(s.commits / COMMITS_MEDIAN) +
      PRS_WEIGHT * expCdf(s.prs / PRS_MEDIAN) +
      ISSUES_WEIGHT * expCdf(s.issues / ISSUES_MEDIAN) +
      REVIEWS_WEIGHT * expCdf(s.reviews / REVIEWS_MEDIAN) +
      STARS_WEIGHT * logNormalCdf(s.stars / STARS_MEDIAN) +
      FOLLOWERS_WEIGHT * logNormalCdf(s.followers / FOLLOWERS_MEDIAN)) /
      TOTAL_WEIGHT;

  const THRESHOLDS = [1, 12.5, 25, 37.5, 50, 62.5, 75, 87.5, 100];
  const LEVELS = ['S', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C'];
  const percentile = rank * 100;
  const level = LEVELS[THRESHOLDS.findIndex((t) => percentile <= t)];
  return { level, percentile };
}

async function searchCount(url: string): Promise<number> {
  try {
    const res = await fetch(url);
    if (!res.ok) return 0;
    const data = await res.json();
    return data.total_count || 0;
  } catch {
    return 0;
  }
}

export function useGitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    // serve from cache when fresh — avoids burning unauthenticated rate limits
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { ts, data } = JSON.parse(cached);
        if (Date.now() - ts < CACHE_TTL) {
          setStats(data);
          setLoading(false);
          return;
        }
      }
    } catch { /* ignore */ }

    async function fetchStats() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GH_USER}`),
          fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&type=public`),
        ]);

        if (!userRes.ok || !reposRes.ok) return;

        const user = await userRes.json();
        const repos: { stargazers_count: number; forks_count: number; language: string | null }[] =
          await reposRes.json();

        const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
        const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);

        const langMap: Record<string, number> = {};
        for (const r of repos) {
          if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1;
        }
        const topLanguages = Object.entries(langMap)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        // commit / PR / issue totals via the search API (same numbers the
        // github-readme-stats card shows)
        const [totalCommits, totalPRs, totalIssues] = await Promise.all([
          searchCount(`https://api.github.com/search/commits?q=author:${GH_USER}`),
          searchCount(`https://api.github.com/search/issues?q=author:${GH_USER}+type:pr`),
          searchCount(`https://api.github.com/search/issues?q=author:${GH_USER}+type:issue`),
        ]);

        const { level, percentile } = calculateRank({
          commits: totalCommits,
          prs: totalPRs,
          issues: totalIssues,
          stars: totalStars,
          followers: user.followers,
          reviews: 0,
        });

        const data: GitHubStats = {
          publicRepos: user.public_repos,
          followers: user.followers,
          totalStars,
          totalForks,
          totalCommits,
          totalPRs,
          totalIssues,
          rankLevel: level,
          rankPercentile: percentile,
          topLanguages,
        };

        if (!cancelled) {
          setStats(data);
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
          } catch { /* storage full/blocked — fine */ }
        }
      } catch {
        // silently fail — stats card will show fallback
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchStats();
    return () => { cancelled = true; };
  }, []);

  return { stats, loading };
}
