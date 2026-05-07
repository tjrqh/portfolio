# Portfolio

개인 개발자 포트폴리오 웹사이트입니다. GitHub API와 연동해 프로젝트를 자동으로 불러오며, 설정 파일 하나만 수정하면 콘텐츠가 업데이트됩니다.

**라이브 데모**: https://tjrqh.github.io/portfolio/

## 기술 스택

- **React 18** + **TypeScript**
- **Vite** — 빌드 도구
- **CSS Modules** — 컴포넌트 단위 스타일
- **GitHub REST API** — 프로젝트 정보 자동 연동
- **GitHub Actions** — 자동 배포 (GitHub Pages)

## 주요 기능

- **GitHub API 연동** — 지정한 레포의 메타정보와 README를 자동으로 불러옴
- **타이핑 애니메이션** — Hero 섹션 인터랙티브 텍스트 효과
- **README 모달** — 프로젝트 카드에서 README 미리보기
- **반응형 디자인** — 모바일/데스크톱 모두 지원
- **자동 배포** — main 브랜치 push 시 GitHub Pages에 자동 배포

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build
```

## 커스터마이징

`src/config/portfolio.config.ts` 파일 하나만 수정하면 됩니다.

```ts
// 개인 정보
export const personalInfo = {
  name: 'MUI',
  githubUsername: 'tjrqh',
  tagline: '코드로 문제를 해결하는 개발자',
  description: '...',
  email: undefined,    // 선택
  blog: undefined,     // 선택
  linkedIn: undefined, // 선택
};

// 보여줄 GitHub 레포 목록
export const featuredRepos = [
  'my-project',
  'another-project',
];

// 기술 스택
export const skills = [
  { category: 'Frontend', icon: '🖥️', skills: ['React', 'TypeScript'] },
  // ...
];
```

## 프로젝트 구조

```
src/
├── config/
│   └── portfolio.config.ts   # 콘텐츠 설정 (이 파일만 수정)
├── components/
│   ├── Header/
│   ├── Hero/
│   ├── About/
│   ├── Skills/
│   ├── Projects/
│   ├── ReadmeModal/
│   └── Footer/
├── hooks/
│   └── useGitHubRepos.ts     # GitHub API 연동 훅
└── types/
    └── index.ts
```

## GitHub API 토큰 (선택)

인증 없이도 동작하지만, 레포가 많은 경우 API 한도(시간당 60회)에 걸릴 수 있습니다.

```bash
cp .env.example .env
# .env 파일을 열어 VITE_GITHUB_TOKEN 값 입력
```

## 배포

main 브랜치에 push하면 GitHub Actions가 자동으로 빌드 및 배포합니다.

```
main 브랜치 push → GitHub Actions 빌드 → GitHub Pages 배포
```
