import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './GitHubSection.module.css'
import { GITHUB_PROFILE } from '../data/portfolio'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function getLocalDate(date) {
  return new Date(`${date}T00:00:00`)
}

function buildWeeks(contributions) {
  if (!contributions.length) return []

  const sorted = [...contributions].sort((a, b) => a.date.localeCompare(b.date))
  const weeks = []
  let week = Array(getLocalDate(sorted[0].date).getDay()).fill(null)

  sorted.forEach((day) => {
    week.push(day)
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  })

  if (week.length) {
    while (week.length < 7) week.push(null)
    weeks.push(week)
  }

  return weeks
}

function getMonthLabel(week, prevWeek) {
  const firstDay = week.find(Boolean)
  if (!firstDay) return ''

  const date = getLocalDate(firstDay.date)
  const prevDay = prevWeek?.find(Boolean)
  const prevDate = prevDay ? getLocalDate(prevDay.date) : null

  if (!prevDate || date.getMonth() !== prevDate.getMonth()) {
    return MONTHS[date.getMonth()]
  }

  return ''
}

export default function GitHubSection() {
  const [contributions, setContributions] = useState([])
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false

    async function loadContributions() {
      try {
        const response = await fetch(GITHUB_PROFILE.contributionsApiUrl)
        if (!response.ok) throw new Error('Unable to load contributions')

        const data = await response.json()
        if (cancelled) return

        const days = Array.isArray(data.contributions) ? data.contributions : []
        setContributions(days)
        setTotal(data.total?.lastYear ?? days.reduce((sum, day) => sum + day.count, 0))
        setStatus('ready')
      } catch {
        if (!cancelled) setStatus('error')
      }
    }

    loadContributions()
    return () => {
      cancelled = true
    }
  }, [])

  const weeks = useMemo(() => buildWeeks(contributions), [contributions])

  return (
    <div className={styles.github}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.label}>// GitHub</div>
        <h2 className={styles.title}>Contribution Log</h2>
        <p className={styles.subtitle}>Live activity from @{GITHUB_PROFILE.username}</p>
      </motion.div>

      <motion.div
        className={styles.panel}
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.7 }}
      >
        <div className={styles.topBar}>
          <div>
            <div className={styles.panelLabel}>Contributor Calendar</div>
            <div className={styles.user}>{GITHUB_PROFILE.username}</div>
          </div>
          <a
            className={styles.profileLink}
            href={GITHUB_PROFILE.url}
            target="_blank"
            rel="noreferrer"
            data-hover
          >
            Open GitHub
          </a>
        </div>

        <div className={styles.calendarWrap}>
          {status === 'loading' && <div className={styles.loader}>Loading contribution graph...</div>}
          {status === 'error' && (
            <div className={styles.loader}>
              Contribution graph unavailable. Open GitHub for the live profile.
            </div>
          )}
          {status === 'ready' && (
            <div className={styles.calendar} style={{ '--weeks': weeks.length }}>
              <div className={styles.summary}>
                {total.toLocaleString()} contributions in the last year
              </div>
              <div className={styles.months}>
                {weeks.map((week, index) => (
                  <span key={index}>{getMonthLabel(week, weeks[index - 1])}</span>
                ))}
              </div>
              <div className={styles.graphBody}>
                <div className={styles.weekdays}>
                  {WEEKDAYS.map(day => (
                    <span key={day}>{day === 'Mon' || day === 'Wed' || day === 'Fri' ? day : ''}</span>
                  ))}
                </div>
                <div className={styles.weeks}>
                  {weeks.map((week, weekIndex) => (
                    <div className={styles.week} key={weekIndex}>
                      {week.map((day, dayIndex) => (
                        <span
                          key={day?.date || `${weekIndex}-${dayIndex}`}
                          className={`${styles.day} ${day ? styles[`level${day.level}`] : styles.empty}`}
                          title={
                            day
                              ? `${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`
                              : undefined
                          }
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.legend}>
          <span>Less</span>
          <span className={styles.level0} />
          <span className={styles.level1} />
          <span className={styles.level2} />
          <span className={styles.level3} />
          <span className={styles.level4} />
          <span>More</span>
        </div>

        <div className={styles.glowTop} />
        <div className={styles.glowBottom} />
      </motion.div>
    </div>
  )
}
