import { FC, ReactNode } from 'react'
import styles from './Button.module.scss'

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset' | undefined
  children: ReactNode
  disabled?: boolean
  onClick?: () => void
}

export const Button: FC<ButtonProps> = ({
  type,
  children,
  disabled,
  onClick,
}) => {
  return (
    <button
      className={styles.button}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      <span className={styles.children}>{children}</span>
    </button>
  )
}
