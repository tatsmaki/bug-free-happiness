import { FC, ChangeEvent } from 'react'
import { Icon } from '@common/Icon'
import styles from './Input.module.scss'

type InputProps = {
  type?: string
  value?: string
  placeholder?: string
  autoComplete?: string
  disabled?: boolean
  onChange?: (value: string) => void
}
type InputEvent = ChangeEvent<HTMLInputElement>

export const Input: FC<InputProps> = ({
  type = 'text',
  value,
  disabled,
  placeholder,
  autoComplete = 'new-password',
  onChange,
}) => {
  const handleChange = (event: InputEvent) => onChange!(event.target.value)

  return (
    <div className={`${styles.wrapper}`}>
      {placeholder === 'Email' && <Icon name="mail" start />}
      {placeholder === 'Username*' && <Icon name="user" start />}
      {placeholder === 'Password*' && <Icon name="lock" start />}
      <input
        className={styles.input}
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={handleChange}
      />
    </div>
  )
}
