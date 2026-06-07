import { useState, useEffect } from 'react'
import styles from './Nav.module.css'
import { NAV_ITEMS } from '../data/portfolio'

export default function Nav({ current, goTo }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu when section changes
  useEffect(() => { setMenuOpen(false) }, [current])

  const handleNav = (id) => {
    goTo(id)
    setMenuOpen(false)
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.logo} onClick={() => handleNav(0)} data-hover>
        SG
      </div>

      {/* Desktop links */}
      <ul className={styles.links}>
        {NAV_ITEMS.map(item => (
          <li key={item.id}>
            <a
              className={current === item.id ? styles.active : ''}
              onClick={() => goTo(item.id)}
              data-hover
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.dot} />

      {/* Mobile hamburger */}
      <button
        className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile drawer */}
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}>
        <ul className={styles.drawerLinks}>
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <a
                className={current === item.id ? styles.drawerActive : ''}
                onClick={() => handleNav(item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
