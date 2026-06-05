import styles from './Nav.module.css'
import { NAV_ITEMS } from '../data/portfolio'

export default function Nav({ current, goTo }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo} onClick={() => goTo(0)} data-hover>
        SG
      </div>
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
    </nav>
  )
}
