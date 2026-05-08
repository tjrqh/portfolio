import { useState, useEffect } from 'react';
import { personalInfo } from '../../config/portfolio.config';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { label: 'about', href: '#about' },
  { label: 'skills', href: '#skills' },
  { label: 'projects', href: '#projects' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <a href="#hero" className={styles.logo} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <span className={styles.logoBracket}>{'<'}</span>
          {"I'm"+ personalInfo.nickname}
          <span className={styles.logoBracket}>{' />'}</span>
        </a>

        {/* Desktop Nav */}
        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={styles.navLink}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
            >
              <span className={styles.navIndex}>
                {String(NAV_ITEMS.indexOf(item) + 1).padStart(2, '0')}.
              </span>
              {item.label}
            </a>
          ))}
          <a
            href={`https://github.com/${personalInfo.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubBtn}
          >
            GitHub
          </a>
        </nav>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 토글"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={styles.mobileNavLink}
              onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
            >
              {item.label}
            </a>
          ))}
          <a
            href={`https://github.com/${personalInfo.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileNavLink}
          >
            GitHub ↗
          </a>
        </div>
      )}
    </header>
  );
}
