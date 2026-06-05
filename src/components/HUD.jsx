import styles from './HUD.module.css'

export default function HUD({ progress, label }) {
  return (
    <>
      {/* Top progress bar */}
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Section label bottom-right */}
      <div className={styles.sectionLabel}>{label}</div>

      {/* Bottom-left coordinates */}
      <div className={styles.coords}>
        <span>LAT: 27.1767°N</span>
        <span>LON: 78.0081°E</span>
      </div>
    </>
  )
}
