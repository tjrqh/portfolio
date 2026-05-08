import type { RepoWithReadme } from '../../types';
import { repoDisplayNames, repoHomepageOverrides } from '../../config/portfolio.config';
import styles from './ProjectCard.module.css';

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3776AB',
  Java: '#B07219',
  Go: '#00ADD8',
  Rust: '#DEA584',
  'C++': '#F34B7D',
  C: '#555555',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Vue: '#42B883',
  Svelte: '#FF3E00',
  Kotlin: '#A97BFF',
  Swift: '#FA7343',
};

interface Props {
  repo: RepoWithReadme;
  index: number;
  onReadmeClick: () => void;
}

export default function ProjectCard({ repo, index, onReadmeClick }: Props) {
  const displayName = repoDisplayNames[repo.full_name] ?? repo.name;
  const homepage = repo.full_name in repoHomepageOverrides
    ? repoHomepageOverrides[repo.full_name]
    : repo.homepage;
  const langColor = repo.language ? (LANG_COLORS[repo.language] ?? '#8B949E') : null;
  const updatedAt = new Date(repo.pushed_at).toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long',
  });

  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Card top */}
      <div className={styles.top}>
        <div className={styles.titleRow}>
          <span className={styles.folderIcon}>⌂</span>
          <h3 className={styles.name}>{displayName}</h3>
        </div>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.externalLink}
          title="GitHub에서 열기"
          aria-label="GitHub에서 열기"
        >
          ↗
        </a>
      </div>

      {/* Description */}
      <p className={styles.description}>
        {repo.description ?? '설명이 없습니다.'}
      </p>

      {/* Topics */}
      {repo.topics.length > 0 && (
        <div className={styles.topics}>
          {repo.topics.slice(0, 4).map((topic) => (
            <span key={topic} className={styles.topic}>{topic}</span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.meta}>
          {langColor && (
            <span className={styles.lang}>
              <span className={styles.langDot} style={{ background: langColor }} />
              {repo.language}
            </span>
          )}
          {repo.stargazers_count > 0 && (
            <span className={styles.stars}>★ {repo.stargazers_count}</span>
          )}
          <span className={styles.updated}>{updatedAt}</span>
        </div>

        <div className={styles.actions}>
          <button className={styles.readmeBtn} onClick={onReadmeClick}>
            README
          </button>
          {homepage && (
            <a
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.demoBtn}
            >
              Demo ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
