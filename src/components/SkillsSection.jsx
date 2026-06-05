import { motion } from 'framer-motion'
import styles from './SkillsSection.module.css'
import { SKILLS } from '../data/portfolio'

export default function SkillsSection() {
  return (
    <div className={styles.skills}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center' }}
      >
        <div className={styles.label}>// Tech Arsenal</div>
        <h2 className={styles.title}>Core Capabilities</h2>
      </motion.div>

      <div className={styles.grid}>
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill.name}
            className={styles.node}
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.45 }}
            whileHover={{ scale: 1.08, y: -6 }}
            data-hover
          >
            <div className={styles.icon}>{skill.icon}</div>
            <div className={styles.name}>{skill.name}</div>
            <div
              className={styles.glow}
              style={{ background: skill.color }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
