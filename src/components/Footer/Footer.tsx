import { personalInfo } from '../../config/portfolio.config';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.text}>
          <span className={styles.mono}>Built by </span>
          <a
            href={`https://github.com/${personalInfo.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {personalInfo.nickname}
          </a>
          <span className={styles.mono}> · {year}</span>
        </p>
        <p className={styles.stack}>
          React + TypeScript + Vite
        </p>
      </div>
    </footer>
  );
}
