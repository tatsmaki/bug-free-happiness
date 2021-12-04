import { useHistory } from 'react-router'
import { userStore } from '@mobx'
import { Button } from '@controls/Button'
import styles from './MainMenu.module.scss'
import { Title } from '@components/common/Title'

export const MainMenu = () => {
  const history = useHistory()

  const handleStart = () => history.push('game')

  const handleLogout = () => userStore.clearToken()

  return (
    <div className={styles.main}>
      <Title>Play It</Title>
      <Button disabled>Continue</Button>
      <Button onClick={handleStart}>Start</Button>
      <Button disabled>Load</Button>
      <Button disabled>Settings</Button>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}
