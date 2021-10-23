import { useHistory } from 'react-router'
import { request } from 'src/api'
import { userStore } from 'src/mobx'

export const Login = () => {
  const history = useHistory()

  const handleLogin = (event: any) => {
    event.preventDefault()

    const user = {
      username: event.target.username.value,
      password: event.target.password.value,
    }

    request({
      url: 'http://localhost:4000/auth/login',
      method: 'POST',
      body: user,
    }).then(({ token }) => {
      // const token = jwt.decode(response.jwt)
      userStore.setToken(token)
      history.push('game')
    })
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input name="username" />
        <input name="password" />
        <button type="submit">Login</button>
      </form>
      <div>
        <span>Don't have an account?</span>
        <button onClick={() => history.push('sign-up')}>Sign Up</button>
      </div>
    </div>
  )
}
