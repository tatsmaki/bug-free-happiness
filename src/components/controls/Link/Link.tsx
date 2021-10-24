import { FC, ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styles from './Link.module.scss'

type LinkProps = {
  children: ReactNode
  to: string
}

export const Link: FC<LinkProps> = ({ children, to }) => {
  return (
    <RouterLink className={styles.link} to={to}>
      {children}
    </RouterLink>
  )
}
