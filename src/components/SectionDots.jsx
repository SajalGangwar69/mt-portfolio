import styles from './SectionDots.module.css'

export default function SectionDots({ current, total, goTo }) {
  return (
    <div className={styles.dots}>
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          className={`${styles.dot} ${current === i ? styles.active : ''}`}
          onClick={() => goTo(i)}
          aria-label={`Go to section ${i + 1}`}
          data-hover
        />
      ))}
    </div>
  )
}
