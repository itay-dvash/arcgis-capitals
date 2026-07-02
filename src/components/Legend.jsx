import { POPULATION_BREAKS, MARKER_COLOR } from "../data/populationBreaks";
import styles from "./Legend.module.css";

export default function Legend() {
  const [r, g, b] = MARKER_COLOR;

  return (
    <aside className={styles.panel} aria-label="Legend">
      <div className={styles.headingRow}>
        <h3 className={styles.heading}>Map Legend - Population Size</h3>
      </div>

      <ul className={styles.list}>
        {[...POPULATION_BREAKS].reverse().map((brk) => (
          <li key={brk.label} className={styles.item}>
            <span
              className={styles.dot}
              style={{
                height: brk.size,
                width: brk.size,
                background: `rgba(${r},${g},${b},0.92)`,
                boxShadow: `0 0 ${Math.round(brk.size * 0.4)}px rgba(${r},${g},${b},0.5)`,
              }}
              aria-hidden="true"
            />
            <span className={styles.text}>
              <strong className={styles.range}>{brk.label}</strong>
              <span className={styles.sublabel}>{brk.sublabel}</span>
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
