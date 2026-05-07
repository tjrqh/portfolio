import { useEffect, useRef, useState } from 'react';
import { useGitHubRepos } from '../../hooks/useGitHubRepos';
import type { RepoWithReadme } from '../../types';
import ProjectCard from './ProjectCard';
import ReadmeModal from '../ReadmeModal/ReadmeModal';
import styles from './Projects.module.css';

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<RepoWithReadme | null>(null);

  const { repos, loading, error, loadReadme } = useGitHubRepos();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleReadmeClick = async (repo: RepoWithReadme) => {
    setSelectedRepo(repo);
    if (!repo.readme && !repo.readmeLoading) {
      await loadReadme(repo.name);
    }
  };

  // selectedRepo가 변경될 때 최신 상태 반영
  const currentSelected = repos.find((r) => r.name === selectedRepo?.name) ?? selectedRepo;

  return (
    <>
      <section
        id="projects"
        ref={ref}
        className={`section ${styles.projects} ${visible ? styles.visible : ''}`}
      >
        <div className="container">
          <p className="section-label">Projects</p>
          <h2 className="section-heading">프로젝트</h2>

          {loading && (
            <div className={styles.loading}>
              <span className={styles.spinner} />
              <span>GitHub에서 프로젝트를 불러오는 중...</span>
            </div>
          )}

          {error && !loading && (
            <div className={styles.error}>
              <p>⚠️ {error}</p>
              <p className={styles.errorHint}>
                GitHub API 요청 한도를 초과했을 수 있습니다.{' '}
                <code>.env</code>에 <code>VITE_GITHUB_TOKEN</code>을 설정하면 한도가 증가합니다.
              </p>
            </div>
          )}

          {!loading && repos.length > 0 && (
            <div className={styles.grid}>
              {repos.map((repo, i) => (
                <ProjectCard
                  key={repo.id}
                  repo={repo}
                  index={i}
                  onReadmeClick={() => handleReadmeClick(repo)}
                />
              ))}
            </div>
          )}

          {!loading && !error && repos.length === 0 && (
            <p className={styles.empty}>
              <code>portfolio.config.ts</code>의 <code>featuredRepos</code>에 레포를 추가해주세요.
            </p>
          )}
        </div>
      </section>

      {currentSelected && (
        <ReadmeModal
          repo={currentSelected}
          onClose={() => setSelectedRepo(null)}
        />
      )}
    </>
  );
}
