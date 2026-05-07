import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ============================================================
// GitHub Pages 배포 base 경로 설정
//
// 유저 페이지로 배포할 경우 (레포명 = tjrqh.github.io):
//   base: '/'
//
// 프로젝트 페이지로 배포할 경우 (예: tjrqh.github.io/portfolio):
//   base: '/portfolio/'
// ============================================================
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
})
