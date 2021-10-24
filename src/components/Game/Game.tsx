import { userStore } from '@mobx'

export const Game = () => {
  const handleLogout = () => userStore.clearToken()

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      123
    </div>
  )
}
