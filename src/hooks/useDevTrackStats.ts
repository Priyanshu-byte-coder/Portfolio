import { useEffect, useState } from 'react';

// NOTE: the repo moved from Umbrella-io/devtrack to this owner. The repos API
// follows the redirect but the search API does not — using the old name made
// the merged-PR count silently return 0.
const REPO = 'Priyanshu-byte-coder/devtrack';

export interface DevTrackStats {
  stars: number;
  forks: number;
  contributors: number;
  mergedPRs: number;
  openIssues: number;
  description: string;
  language: string;
  license: string;
  topics: string[];
}

export function useDevTrackStats() {
  const [stats, setStats] = useState<DevTrackStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const [repoRes, contribRes, prSearchRes] = await Promise.all([
          fetch(`https://api.github.com/repos/${REPO}`),
          fetch(`https://api.github.com/repos/${REPO}/contributors?per_page=1&anon=true`),
          fetch(`https://api.github.com/search/issues?q=repo:${REPO}+is:pr+is:merged&per_page=1`),
        ]);

        if (!repoRes.ok) return;

        const repo = await repoRes.json();

        // contributor count from Link header (last page number)
        let contributors = 0;
        const contribLink = contribRes.headers.get('Link');
        if (contribLink) {
          const match = contribLink.match(/page=(\d+)>;\s*rel="last"/);
          if (match) contributors = parseInt(match[1], 10);
        } else if (contribRes.ok) {
          const contribData = await contribRes.json();
          contributors = Array.isArray(contribData) ? contribData.length : 0;
        }

        let mergedPRs = 0;
        if (prSearchRes.ok) {
          const prData = await prSearchRes.json();
          mergedPRs = prData.total_count || 0;
        }

        if (!cancelled) {
          setStats({
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            contributors,
            mergedPRs,
            openIssues: repo.open_issues_count,
            description: repo.description || '',
            language: repo.language || 'TypeScript',
            license: repo.license?.spdx_id || 'MIT',
            topics: repo.topics || [],
          });
        }
      } catch {
        // silent fail
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchStats();
    return () => { cancelled = true; };
  }, []);

  return { stats, loading };
}
