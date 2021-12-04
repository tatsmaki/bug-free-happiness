import { FC, ReactNode } from 'react'
import styles from './Frames.module.scss'

type FramesProps = {
  children: ReactNode
}

export const Frames: FC<FramesProps> = ({ children }) => {
  return <span className={styles.frames}>{children}</span>
}
