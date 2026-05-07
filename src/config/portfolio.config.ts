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
// 새 프로젝트를 추가할 때는 레포 이름만 여기에 추가하면 됩니다.
// README와 메타정보는 GitHub API에서 자동으로 불러옵니다.
// ============================================================
export const featuredRepos: string[] = [
  'ticketing',
  // 새 프로젝트 추가 예시:
  // 'my-new-project',
  // 'another-project',
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
    category: 'Backend',
    icon: '⚙️',
    skills: ['Node.js'],
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
// 🔑 GitHub API Token (선택 - Rate Limit 해제용)
// ============================================================
// GitHub API는 인증 없이 시간당 60회 요청 제한이 있습니다.
// 레포가 많아지면 .env 파일에 아래를 추가하세요:
//   VITE_GITHUB_TOKEN=ghp_your_token_here
// .env 파일은 절대 git에 커밋하지 마세요! (.gitignore 확인)
// ============================================================
export const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;
