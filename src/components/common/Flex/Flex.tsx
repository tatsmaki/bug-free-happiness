import { FC, ReactNode } from 'react'
import styles from './Flex.module.scss'

type FlexProps = {
  children: ReactNode
}

export const Flex: FC<FlexProps> = ({ children }) => {
  return <div className={styles.flex}>{children}</div>
}
