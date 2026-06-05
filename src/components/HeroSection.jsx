import { motion } from 'framer-motion'
import styles from './HeroSection.module.css'
import { SOCIALS } from '../data/portfolio'

export default function HeroSection({ goTo }) {
  return (
    <div className={styles.hero}>
      <motion.div
        className={styles.pre}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7 }}
      >
        CSE Student · Creative Designer · Full Stack Developer
      </motion.div>

      <motion.h1
        className={styles.name}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.8 }}
      >
        SAJAL<br />GANGWAR
      </motion.h1>

      <motion.div
        className={styles.tagline}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        <span className={styles.slash}>//</span> Building Immersive Digital Experiences
      </motion.div>

      <motion.div
        className={styles.btns}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.7 }}
      >
        <button className={styles.btnPrimary} onClick={() => goTo(4)} data-hover>
          View Projects
        </button>
        <button className={styles.btnGhost} onClick={() => goTo(5)} data-hover>
          Get In Touch
        </button>
      </motion.div>

      <motion.div
        className={styles.socials}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7 }}
      >
        {SOCIALS.map(s => (
          <a
            key={s.name}
            href={s.href}
            className={styles.socialLink}
            target={s.href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            title={s.name}
            data-hover
          >
            {s.label}
          </a>
        ))}
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span>Scroll to explore</span>
        <div className={styles.scrollLine} />
      </motion.div>
    </div>
  )
}
