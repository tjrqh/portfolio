import { useEffect, useRef, useState } from 'react';
import { skills } from '../../config/portfolio.config';
import styles from './Skills.module.css';

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={ref}
      className={`section ${styles.skills} ${visible ? styles.visible : ''}`}
    >
      <div className={`container ${styles.inner}`}>
        <p className="section-label">Skills</p>
        <h2 className="section-heading">기술 스택</h2>

        <div className={styles.categories}>
          {skills.map((cat, catIdx) => (
            <div
              key={cat.category}
              className={styles.category}
              style={{ animationDelay: `${catIdx * 0.1}s` }}
            >
              <div className={styles.categoryHeader}>
                <span className={styles.catIcon}>{cat.icon}</span>
                <span className={styles.catName}>{cat.category}</span>
              </div>
              <div className={styles.badges}>
                {cat.skills.map((skill, skillIdx) => (
                  <span
                    key={skill}
                    className={styles.badge}
                    style={{ animationDelay: `${(catIdx * 0.1) + (skillIdx * 0.05)}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
