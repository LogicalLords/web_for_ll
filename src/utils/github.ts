// GitHub Public API service with caching and graceful fallbacks

export interface GitHubUserData {
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
  location?: string;
  blog?: string;
}

export interface GitHubRepoData {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  updated_at: string;
}

const cache: Record<string, { data: GitHubUserData; timestamp: number }> = {};
const repoCache: Record<string, { data: GitHubRepoData[]; timestamp: number }> = {};
const CACHE_TTL = 1000 * 60 * 15; // 15 minutes

export async function fetchGitHubUser(username: string): Promise<GitHubUserData | null> {
  const cached = cache[username];
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!res.ok) {
      return null;
    }

    const data = (await res.json()) as GitHubUserData;
    cache[username] = { data, timestamp: Date.now() };
    return data;
  } catch {
    return null;
  }
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepoData[]> {
  const cached = repoCache[username];
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!res.ok) {
      return [];
    }

    const data = (await res.json()) as GitHubRepoData[];
    repoCache[username] = { data, timestamp: Date.now() };
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
