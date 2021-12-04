import { FC } from 'react'
import { useHistory } from 'react-router'
import { Button } from '@controls/Button'
import styles from './PauseMenu.module.scss'

type PauseMenuProps = {
  handlePauseMenu: () => void
}

export const PauseMenu: FC<PauseMenuProps> = ({ handlePauseMenu }) => {
  const history = useHistory()

  const handleExit = () => history.push('main')

  return (
    <div className={styles.shadow}>
      <div className={styles.menu}>
        <Button onClick={handlePauseMenu}>Resume</Button>
        <Button disabled>Save</Button>
        <Button disabled>Load</Button>
        <Button disabled>Settings</Button>
        <Button onClick={handleExit}>Exit</Button>
      </div>
    </div>
  )
}
