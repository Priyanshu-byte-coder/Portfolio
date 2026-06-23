import { useEffect, useState } from 'react';

const GH_USER = 'Priyanshu-byte-coder';

export interface GitHubStats {
  publicRepos: number;
  followers: number;
  totalStars: number;
  totalForks: number;
  topLanguages: { name: string; count: number }[];
}

export function useGitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

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

        if (!cancelled) {
          setStats({
            publicRepos: user.public_repos,
            followers: user.followers,
            totalStars,
            totalForks,
            topLanguages,
          });
        }
      } catch {
        // silently fail — stats card will show loading/fallback
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchStats();
    return () => { cancelled = true; };
  }, []);

  return { stats, loading };
}
