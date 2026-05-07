import { useState, useEffect } from 'react';
import type { GitHubRepo, RepoWithReadme } from '../types';
import { personalInfo, featuredRepos, GITHUB_TOKEN } from '../config/portfolio.config';

const BASE_URL = 'https://api.github.com';

function getHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
  };
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
  }
  return headers;
}

// ============================================================
// 레포 목록 + 메타정보 페치
// ============================================================
function resolveOwnerRepo(entry: string): { owner: string; repo: string } {
  if (entry.includes('/')) {
    const [owner, repo] = entry.split('/');
    return { owner, repo };
  }
  return { owner: personalInfo.githubUsername, repo: entry };
}

async function fetchRepo(entry: string): Promise<GitHubRepo | null> {
  const { owner, repo } = resolveOwnerRepo(entry);
  try {
    const res = await fetch(
      `${BASE_URL}/repos/${owner}/${repo}`,
      { headers: getHeaders() }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ============================================================
// README 내용 페치 (Base64 디코딩)
// ============================================================
export async function fetchReadme(repoName: string): Promise<string | null> {
  const { owner, repo: resolvedRepo } = resolveOwnerRepo(repoName);
  try {
    const res = await fetch(
      `${BASE_URL}/repos/${owner}/${resolvedRepo}/readme`,
      { headers: getHeaders() }
    );
    if (!res.ok) return null;
    const data: { content: string; encoding: string } = await res.json();
    if (data.encoding === 'base64') {
      // base64 디코딩 + UTF-8 처리
      const binary = atob(data.content.replace(/\n/g, ''));
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return new TextDecoder('utf-8').decode(bytes);
    }
    return data.content;
  } catch {
    return null;
  }
}

// ============================================================
// 메인 훅: featuredRepos 기반으로 모든 레포 데이터 로드
// ============================================================
export function useGitHubRepos() {
  const [repos, setRepos] = useState<RepoWithReadme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadRepos() {
      setLoading(true);
      setError(null);

      try {
        const results = await Promise.all(featuredRepos.map(fetchRepo));
        if (cancelled) return;

        const validRepos: RepoWithReadme[] = results
          .filter((r): r is GitHubRepo => r !== null)
          .map((repo) => ({
            ...repo,
            readme: null,
            readmeLoading: false,
            readmeError: false,
          }));

        setRepos(validRepos);
      } catch {
        if (!cancelled) setError('GitHub 데이터를 불러오지 못했습니다.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadRepos();
    return () => { cancelled = true; };
  }, []);

  // README는 개별 카드에서 필요할 때 로드 (lazy)
  const loadReadme = async (repoFullName: string) => {
    setRepos((prev) =>
      prev.map((r) =>
        r.full_name === repoFullName ? { ...r, readmeLoading: true, readmeError: false } : r
      )
    );

    const readme = await fetchReadme(repoFullName);

    setRepos((prev) =>
      prev.map((r) =>
        r.full_name === repoFullName
          ? { ...r, readme, readmeLoading: false, readmeError: readme === null }
          : r
      )
    );
  };

  return { repos, loading, error, loadReadme };
}
