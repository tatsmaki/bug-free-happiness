import { userStore } from '@mobx'
import { Button } from '@controls/Button'

export const MainMenu = () => {
  const handleLogout = () => userStore.clearToken()

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}
