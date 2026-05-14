const GITHUB_USER = 'Priyanshu-byte-coder';

interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  html_url: string;
  topics: string[];
}

interface GithubEvent {
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    commits?: { message: string }[];
    action?: string;
    ref?: string;
  };
}

export async function fetchGithubContext(): Promise<string> {
  try {
    const [reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=8&type=public`),
      fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=15`),
    ]);

    const lines: string[] = [];

    if (reposRes.ok) {
      const repos: Repo[] = await reposRes.json();
      lines.push('Recent public repositories (sorted by last updated):');
      for (const r of repos) {
        const lang = r.language ? ` [${r.language}]` : '';
        const desc = r.description ? ` — ${r.description}` : '';
        const updated = new Date(r.updated_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
        lines.push(`- ${r.name}${lang}${desc} (updated ${updated})`);
      }
    }

    if (eventsRes.ok) {
      const events: GithubEvent[] = await eventsRes.json();
      const pushEvents = events.filter(e => e.type === 'PushEvent').slice(0, 5);
      if (pushEvents.length > 0) {
        lines.push('\nRecent commits:');
        for (const e of pushEvents) {
          const repo = e.repo.name.replace(`${GITHUB_USER}/`, '');
          const msgs = (e.payload.commits || []).map(c => c.message.split('\n')[0]).slice(0, 2);
          const date = new Date(e.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
          for (const msg of msgs) {
            lines.push(`- [${repo}] ${msg} (${date})`);
          }
        }
      }
    }

    return lines.length > 0 ? lines.join('\n') : 'GitHub data unavailable.';
  } catch {
    return 'GitHub data unavailable.';
  }
}
