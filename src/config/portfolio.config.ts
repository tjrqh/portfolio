/**
 * ============================================================
 * 📝 portfolio.config.ts
 * ============================================================
 * 포트폴리오를 커스터마이징하는 중앙 설정 파일입니다.
 * 이 파일만 수정하면 포트폴리오가 자동으로 업데이트됩니다!
 * ============================================================
 */

import type { PersonalInfo, SkillCategory } from '../types';

// ============================================================
// 👤 개인 정보
// ============================================================
export const personalInfo: PersonalInfo = {
  name: '김보석',
  nickname: 'Mui', // 예: 'MUI' (선택사항)
  githubUsername: 'tjrqh',
  tagline: '코드로 문제를 해결하는 개발자',
  description:
    '안녕하세요. 새로운 문제를 발견하고 코드로 해결하는 것을 즐기는 개발자입니다.\n사용자 경험과 코드 품질 모두를 중요하게 생각하며, 꾸준히 성장하는 것을 추구합니다.',

  // 아래 항목은 선택사항입니다. 비워두면 표시되지 않습니다.
  email: 'asdww9964@knou.ac.kr',       // 예: 'your@email.com'
  blog: undefined,        // 예: 'https://your-blog.com'
  linkedIn: undefined,    // 예: 'https://linkedin.com/in/yourname'
};

// ============================================================
// 📦 GitHub 프로젝트 레포 목록
// ============================================================
// 개인 레포: 'repo-name'
// Organization 레포: 'org-name/repo-name'
// ============================================================
export const featuredRepos: string[] = [
  'lucky-biky/maru',
  'KOSTAeatTogether/.github',
  'JobHub',
  'canvas-drawing',
  'CalMinder',
  'concert-ticketing/concert-ticketing-be'
];

// ============================================================
// 🛠️ 기술 스택
// ============================================================
// category: 카테고리명
// icon: 이모지 아이콘
// skills: 기술 목록
// ============================================================
export const skills: SkillCategory[] = [
  {
    category: 'Frontend',
    icon: '🖥️',
    skills: ['React', 'TypeScript', 'HTML', 'CSS'],
  },
  {
    category: 'Language',
    icon: '⚙️',
    skills: ['C#', 'C++', 'Java', 'Python'],
  },
  {
    category: 'Tools',
    icon: '🔧',
    skills: ['Git', 'GitHub', 'Vite'],
  },
  // 새 카테고리 추가 예시:
  // {
  //   category: 'Database',
  //   icon: '🗄️',
  //   skills: ['MySQL', 'PostgreSQL'],
  // },
];

// ============================================================
// 🏷️ 레포 표시 이름 재정의 (full_name → 화면에 보여줄 이름)
// ============================================================
export const repoDisplayNames: Record<string, string> = {
  'KOSTAeatTogether/.github': 'eatTogether',
  'lucky-biky/maru': 'maru',
  'concert-ticketing/concert-ticketing-be': 'concert-ticketing'
};

// ============================================================
// 🔗 Demo 링크 재정의 (null → Demo 버튼 숨김)
// ============================================================
export const repoHomepageOverrides: Record<string, string | null> = {
  'tjrqh/CalMinder': 'https://tjrqh.github.io/CalMinder/',
};

// ============================================================
// 🔑 GitHub API Token (선택 - Rate Limit 해제용)
// ============================================================
// GitHub API는 인증 없이 시간당 60회 요청 제한이 있습니다.
// 레포가 많아지면 .env 파일에 아래를 추가하세요:
//   VITE_GITHUB_TOKEN=ghp_your_token_here
// .env 파일은 절대 git에 커밋하지 마세요! (.gitignore 확인)
// ============================================================
export const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;
