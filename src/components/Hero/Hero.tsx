import { useEffect, useState } from 'react';
import { personalInfo } from '../../config/portfolio.config';
import styles from './Hero.module.css';

const TYPING_STRINGS = [
  personalInfo.tagline,
  'Clean Code를 지향합니다',
  '새로운 기술을 배우는 것을 좋아합니다',
];

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = TYPING_STRINGS[stringIndex];
    const delay = isDeleting ? 40 : charIndex === current.length ? 2000 : 70;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < current.length) {
        setDisplayText(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      } else if (!isDeleting && charIndex === current.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      } else {
        setIsDeleting(false);
        setStringIndex((i) => (i + 1) % TYPING_STRINGS.length);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, stringIndex]);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero} id="hero">
      {/* Grid background */}
      <div className={styles.grid} aria-hidden="true" />
      {/* Glow blob */}
      <div className={styles.glow} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <p className={styles.greeting} style={{ animationDelay: '0.1s' }}>
          안녕하세요, 저는
        </p>

        <h1 className={styles.name} style={{ animationDelay: '0.25s' }}>
          {personalInfo.name}
          <span className={styles.dot}>.</span>
        </h1>

        <div className={styles.taglineWrap} style={{ animationDelay: '0.4s' }}>
          <span className={styles.prompt}>{'>'}_</span>
          <span className={styles.tagline}>{displayText}</span>
          <span className={styles.cursor} />
        </div>

        <div className={styles.actions} style={{ animationDelay: '0.6s' }}>
          <button className={styles.btnPrimary} onClick={scrollToAbout}>
            더 알아보기
          </button>
          <a
            href={`https://github.com/${personalInfo.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnSecondary}
          >
            GitHub 프로필 →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <button className={styles.scrollIndicator} onClick={scrollToAbout} aria-label="아래로 스크롤">
        <div className={styles.scrollDot} />
      </button>
    </section>
  );
}
