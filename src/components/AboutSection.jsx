import { motion } from 'framer-motion'
import styles from './AboutSection.module.css'

const stats = [
  { num: '3+',  label: 'Companies' },
  { num: '10+', label: 'Skills' },
  { num: '∞',   label: 'Curiosity' },
  { num: '01',  label: 'Vision' },
]

const variants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0 },
}

export default function AboutSection() {
  return (
    <div className={styles.about}>
      <motion.div
        className={styles.left}
        variants={variants}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.7 }}
      >
        <div className={styles.label}>// About Me</div>
        <h2 className={styles.title}>
          Crafting Digital<br />Experiences
        </h2>
        <p className={styles.body}>
          Passionate Computer Science Engineering student from Dr. Bhimrao Ambedkar University, Agra.
          I blend creative design thinking with full-stack engineering to build immersive digital products
          that leave lasting impressions.
        </p>
        <p className={styles.body} style={{ marginTop: '16px' }}>
          From brand identities to full-stack web applications — I build things that look stunning
          and work flawlessly.
        </p>
        <div className={styles.edu}>
          <div className={styles.eduIcon}>🎓</div>
          <div>
            <div className={styles.eduTitle}>B.Tech — Computer Science Engineering</div>
            <div className={styles.eduSub}>Dr. Bhimrao Ambedkar University, Agra</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className={styles.right}
        variants={variants}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className={styles.statCard}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
          >
            <div className={styles.statNum}>{s.num}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
