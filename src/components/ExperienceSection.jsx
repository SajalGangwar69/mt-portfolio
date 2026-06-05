import { motion } from 'framer-motion'
import styles from './ExperienceSection.module.css'
import { EXPERIENCE } from '../data/portfolio'

export default function ExperienceSection() {
  return (
    <div className={styles.exp}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center' }}
      >
        <div className={styles.label}>// Experience</div>
        <h2 className={styles.title}>Mission Log</h2>
      </motion.div>

      <div className={styles.grid}>
        {EXPERIENCE.map((item, i) => (
          <motion.div
            key={item.company}
            className={styles.card}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            whileHover={{ y: -8 }}
            data-hover
            style={{ '--accent': item.color }}
          >
            <div className={styles.cardTop}>
              <span className={styles.icon}>{item.icon}</span>
              <div className={styles.topRight}>
                <div className={styles.company}>{item.company}</div>
                <div className={styles.role}>{item.role}</div>
              </div>
            </div>

            <p className={styles.desc}>{item.desc}</p>

            <div className={styles.tags}>
              {item.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>

            {/* Accent top line */}
            <div className={styles.accentLine} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
