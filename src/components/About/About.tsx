import { useEffect, useRef, useState } from 'react';
import { personalInfo, careers } from '../../config/portfolio.config';
import styles from './About.module.css';

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const paragraphs = personalInfo.description.split('\n').filter(Boolean);

  return (
    <section id="about" ref={ref} className={`section ${styles.about} ${visible ? styles.visible : ''}`}>
      <div className="container">
        <p className="section-label">About Me</p>
        <h2 className="section-heading">자기소개</h2>

        <div className={styles.grid}>
          {/* Text block */}
          <div className={styles.textBlock}>
            {paragraphs.map((p, i) => (
              <p key={i} className={styles.paragraph} style={{ animationDelay: `${i * 0.12}s` }}>
                {p}
              </p>
            ))}

            {/* Career */}
            {careers.length > 0 && (
              <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <p className="section-label">Career</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {careers.map((c) => (
                    <li key={`${c.company}-${c.period}`} style={{ marginBottom: '0.75rem' }}>
                      <strong>{c.company}</strong>
                      <span style={{ marginLeft: '0.75rem', opacity: 0.7 }}>{c.period}</span>
                      {c.role && <div className={styles.paragraph}>{c.role}</div>}
                      {c.description && <div className={styles.paragraph}>{c.description}</div>}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Links */}
            <div className={styles.links}>
              <a
                href={`https://github.com/${personalInfo.githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                <span className={styles.linkIcon}>⌂</span>
                github.com/{personalInfo.githubUsername}
              </a>
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className={styles.link}>
                  <span className={styles.linkIcon}>✉</span>
                  {personalInfo.email}
                </a>
              )}
              {personalInfo.blog && (
                <a href={personalInfo.blog} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  <span className={styles.linkIcon}>↗</span>
                  Blog
                </a>
              )}
            </div>
          </div>

          {/* Stats block */}
          <div className={styles.statsBlock}>
            <div className={styles.terminalCard}>
              <div className={styles.terminalBar}>
                <span className={styles.dot} style={{ background: '#FF5F56' }} />
                <span className={styles.dot} style={{ background: '#FFBD2E' }} />
                <span className={styles.dot} style={{ background: '#27C93F' }} />
                <span className={styles.terminalTitle}>profile.json</span>
              </div>
              <div className={styles.terminalBody}>
                <pre className={styles.json}>{JSON.stringify({
                  name: personalInfo.name,
                  nickname: personalInfo.nickname,
                  github: `@${personalInfo.githubUsername}`,
                  focus: ['문제 해결', '사용자 경험', 'AI 활용'],
                  status: 'open to work 🟢',
                }, null, 2)}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}