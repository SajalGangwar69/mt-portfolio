import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './ProjectsSection.module.css'
import { PROJECTS } from '../data/portfolio'

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      className={`${styles.card} ${project.featured ? styles.featured : ''} ${project.demo ? styles.demo : ''}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      whileHover={{ y: -8 }}
      onClick={() => setExpanded(!expanded)}
      data-hover
      style={{ '--pcolor': project.color }}
    >
      <div className={styles.badge}>{project.badge}</div>
      <h3 className={styles.name}>{project.name}</h3>
      <p className={styles.desc}>{project.desc}</p>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className={styles.expandedInfo}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.divider} />
            <p className={styles.demoNote}>
              {project.details || (project.demo ? '🚀 This project is currently in development. Check back soon for updates!' : '📊 Live project details and links.')}
            </p>
            {!project.demo && project.link && (
              <a 
                href={project.link} 
                target={project.link.startsWith('http') ? '_blank' : '_self'} 
                rel="noopener noreferrer" 
                className={styles.viewBtn} 
                data-hover
              >
                View Project →
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.tags}>
        {project.tags.map(t => (
          <span key={t} className={styles.tag}>{t}</span>
        ))}
      </div>

      <div className={styles.glowCorner} />
    </motion.div>
  )
}

export default function ProjectsSection() {
  return (
    <div className={styles.projects}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center' }}
      >
        <div className={styles.label}>// Projects</div>
        <h2 className={styles.title}>Deployed Missions</h2>
        <p className={styles.subtitle}>Click any card to expand details</p>
      </motion.div>

      <div className={styles.grid}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </div>
  )
}
