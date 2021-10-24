import { FC } from 'react'
import styles from './Icon.module.scss'

enum IconNames {
  User = 'user',
  Lock = 'lock',
  Mail = 'mail',
}

type IconProps = {
  name: IconNames[keyof IconNames]
  start?: boolean
}

export const Icon: FC<IconProps> = ({ name, start }) => {
  return (
    <div className={`${styles.wrapper} ${start && styles.start}`}>
      {name === IconNames.User && (
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="11" />
          <circle cx="12" cy="9" r="5" />
          <path d="M4 19 C 8 14, 16 14, 20 19" />
        </svg>
      )}

      {name === IconNames.Lock && (
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 10 C 6 1, 18 1, 17 10" />
          <rect x="4" y="11" width="16" height="12" />
          <circle cx="12" cy="17" r="1" />
        </svg>
      )}
    </div>
  )
}
