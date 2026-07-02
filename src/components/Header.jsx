import styles from "./Header.module.css";
import SunIcon from "../assets/sun.svg?react";
import MoonIcon from "../assets/moon.svg?react";
import GlobeIcon from "../assets/globe.svg?react";

export default function Header({ isDark, onToggle }) {
  return (
    <header className={styles.header}>
      <div className={styles.titleGroup}>
        <GlobeIcon className={styles.globe} aria-hidden="true" />
        <h1 className={styles.title}>Capitals of the World</h1>
        <p className={styles.hint}>
          Click on a capital city for population size
        </p>
      </div>

      <button
        type="button"
        className={styles.toggle}
        onClick={onToggle}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <span className={styles.toggleTrackIcon}>
          {isDark ? (
            <MoonIcon className={styles.toggleIcon} />
          ) : (
            <SunIcon className={styles.toggleIcon} />
          )}
        </span>
        <span className={styles.toggleThumb} />
      </button>
    </header>
  );
}
