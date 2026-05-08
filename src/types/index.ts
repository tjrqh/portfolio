// ===================================
// GitHub API 타입
// ===================================
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  pushed_at: string;
}

export interface RepoWithReadme extends GitHubRepo {
  readme: string | null;
  readmeLoading: boolean;
  readmeError: boolean;
}

// ===================================
// 포트폴리오 설정 타입
// ===================================
export interface PersonalInfo {
  name: string;
  nickname?: string;
  githubUsername: string;
  tagline: string;
  description: string;
  email?: string;
  blog?: string;
  linkedIn?: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: string[];
}
