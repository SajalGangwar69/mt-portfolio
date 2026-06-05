import { AnimatePresence, motion } from 'framer-motion'
import styles from './SectionWrapper.module.css'

const variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -30 },
}

export default function SectionWrapper({ id, children }) {
  return (
    <motion.section
      id={id}
      className={styles.section}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.section>
  )
}
