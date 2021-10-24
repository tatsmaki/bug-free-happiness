import { userStore } from '@mobx'
import { Button } from '@controls/Button'
import styles from './MainMenu.module.scss'

export const MainMenu = () => {
  const handleLogout = () => userStore.clearToken()

  return (
    <div className={styles.main}>
      <Button onClick={handleLogout}>Logout</Button>
      <br />
      <Button>Play</Button>
    </div>
  )
}
