import { FC, ReactNode } from 'react'
import styles from './Title.module.scss'

type TitleProps = {
  children: ReactNode
}

export const Title: FC<TitleProps> = ({ children }) => {
  return <span className={styles.title}>{children}</span>
}
