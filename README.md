# MUI Portfolio

개인 개발자 포트폴리오 — React + TypeScript + Vite

## 🚀 시작하기

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 빌드
npm run build
```

## ✏️ 커스터마이징

**`src/config/portfolio.config.ts`** 파일 하나만 수정하면 됩니다.

| 항목 | 설정 위치 | 설명 |
|------|-----------|------|
| 이름, 소개 | `personalInfo` | 헤더 이름, About Me 텍스트 |
| 프로젝트 | `featuredRepos` | 보여줄 GitHub 레포 이름 배열 |
| 기술 스택 | `skills` | 카테고리별 기술 목록 |

### 새 프로젝트 추가

```ts
export const featuredRepos: string[] = [
  'ticketing',
  'my-new-project',  // ← 여기에 레포 이름만 추가!
];
```

## 📦 GitHub Pages 배포

```bash
# 1. gh-pages 패키지 설치
npm install --save-dev gh-pages

# 2. package.json scripts에 추가
"deploy": "npm run build && gh-pages -d dist"

# 3. 배포 실행
npm run deploy
```

> **유저 페이지** (tjrqh.github.io): `vite.config.ts`의 `base: '/'` 유지  
> **프로젝트 페이지** (tjrqh.github.io/portfolio): `base: '/portfolio/'`로 변경

## 🔑 GitHub API 토큰 (선택)

API 한도를 늘리려면 `.env.example`을 복사해 `.env`로 만들고 토큰을 입력하세요.

```bash
cp .env.example .env
# .env 파일을 열어 VITE_GITHUB_TOKEN 값 입력
```

## 📁 프로젝트 구조

```
src/
├── config/
│   └── portfolio.config.ts   ← 📝 여기만 수정!
├── components/
│   ├── Header/
│   ├── Hero/
│   ├── About/
│   ├── Skills/
│   ├── Projects/
│   ├── ReadmeModal/
│   └── Footer/
├── hooks/
│   └── useGitHubRepos.ts     ← GitHub API 연동
└── types/
    └── index.ts
```
