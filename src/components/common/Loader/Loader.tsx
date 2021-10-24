import { FC, ReactNode } from 'react'
import styles from './Loader.module.scss'

type LoaderProps = {
  children: ReactNode
  isLoading: boolean
}

export const Loader: FC<LoaderProps> = ({ children, isLoading }) => {
  return (
    <div className={styles.container}>
      {isLoading && (
        <>
          <div className={styles.block} />
          <div className={styles.loader} />
        </>
      )}
      <div className={`${styles.children} ${isLoading && styles.faded}`}>
        {children}
      </div>
    </div>
  )
}
