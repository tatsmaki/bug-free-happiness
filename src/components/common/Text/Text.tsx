import { FC, ReactNode } from 'react'
import styles from './Text.module.scss'

type TextProps = {
  children: ReactNode
}

export const Text: FC<TextProps> = ({ children }) => {
  return <span className={styles.text}>{children}</span>
}
