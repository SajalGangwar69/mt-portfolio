import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './ContactSection.module.css'

export default function ContactSection() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('sajalgangwar2222@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={styles.contact}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className={styles.label}>// Contact</div>
        <h2 className={styles.title}>Let's Build<br />Something</h2>
        <p className={styles.sub}>Open to collaborations, freelance work,<br />and full-time opportunities.</p>

        <div className={styles.emailRow} onClick={copyEmail} data-hover>
          <span className={styles.email}>sajalgangwar2222@gmail.com</span>
          <span className={styles.copyBtn}>{copied ? '✓ Copied' : 'Copy'}</span>
        </div>

        <div className={styles.links}>
          <a
            href="https://linkedin.com/in/sajal-gangwar"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
            data-hover
          >
            LinkedIn ↗
          </a>
          <a
            href="https://instagram.com/ck.sajall.fu"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
            data-hover
          >
            Instagram ↗
          </a>
          <a
            href="mailto:sajalgangwar2222@gmail.com"
            className={styles.link}
            data-hover
          >
            Email ↗
          </a>
        </div>

        <div className={styles.footer}>
          <span className={styles.footerText}>
            Designed &amp; Built by{' '}
            <span style={{ color: 'var(--cyan)' }}>Sajal Gangwar</span>
          </span>
        </div>

        {/* Decorative corner glows */}
        <div className={styles.glowTL} />
        <div className={styles.glowBR} />
      </motion.div>
    </div>
  )
}
