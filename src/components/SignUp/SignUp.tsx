import { useHistory } from 'react-router'
import { request } from 'src/api'
import { userStore } from 'src/mobx'

export const SignUp = () => {
  const history = useHistory()

  const handleSignUp = (event: any) => {
    event.preventDefault()

    const user = {
      username: event.target.username.value,
      password: event.target.password.value,
    }

    request({
      url: 'http://localhost:4000/auth/signup',
      method: 'POST',
      body: user,
    }).then(({ token }) => {
      userStore.setToken(token)
      history.push('game')
    })
  }

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <input name="username" />
        <input name="password" />
        <button type="submit">Sign up</button>
      </form>
      <div>
        <span>Already have an account?</span>
        <button onClick={() => history.push('login')}>Login</button>
      </div>
    </div>
  )
}
