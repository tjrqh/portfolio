import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import type { RepoWithReadme } from '../../types';
import styles from './ReadmeModal.module.css';

interface Props {
  repo: RepoWithReadme;
  onClose: () => void;
}

export default function ReadmeModal({ repo, onClose }: Props) {
  // ESC 키로 닫기
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // 상대 이미지 URL → GitHub raw URL로 변환
  const transformImageUri = (src: string) => {
    if (src.startsWith('http')) return src;
    return `https://raw.githubusercontent.com/${repo.full_name}/HEAD/${src}`;
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.repoIcon}>⌂</span>
            <div>
              <h3 className={styles.repoName}>{repo.name}</h3>
              {repo.description && (
                <p className={styles.repoDesc}>{repo.description}</p>
              )}
            </div>
          </div>
          <div className={styles.headerActions}>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkBtn}
              title="GitHub에서 보기"
            >
              GitHub ↗
            </a>
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkBtn}
                title="데모 사이트"
              >
                Demo ↗
              </a>
            )}
            <button className={styles.closeBtn} onClick={onClose} aria-label="닫기">
              ✕
            </button>
          </div>
        </div>

        {/* README Content */}
        <div className={styles.body}>
          {repo.readmeLoading && (
            <div className={styles.loading}>
              <span className={styles.spinner} />
              README 불러오는 중...
            </div>
          )}
          {repo.readmeError && (
            <p className={styles.error}>README를 불러오지 못했습니다.</p>
          )}
          {repo.readme && !repo.readmeLoading && (
            <div className={styles.markdown}>
              <ReactMarkdown
                urlTransform={(url) => {
                  if (url.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i)) {
                    return transformImageUri(url);
                  }
                  return url;
                }}
              >
                {repo.readme}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
