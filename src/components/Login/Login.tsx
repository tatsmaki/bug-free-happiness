import { useState } from 'react'
import { useHistory } from 'react-router'
import { request } from '@api'
import { userStore } from '@mobx'
import { Input } from '@controls/Input'
import { Button } from '@controls/Button'
import { Link } from '@controls/Link'
import { Text } from '@common/Text'
import { Welcome } from '@components/Welcome'
import styles from './Login.module.scss'

export const Login = () => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const isLoginValid = Boolean(username && password)

  const handleLogin = (event: any) => {
    event.preventDefault()

    setIsLoading(true)
    request({
      // url: 'http://localhost:4000/auth/login',
      url: 'https://nest-ts-server.herokuapp.com/auth/login',
      method: 'POST',
      body: { username, password },
      success: ({ token }) => {
        // const token = jwt.decode(response.jwt)
        userStore.setToken(token)
        history.push('game')
      },
      fail: () => setIsLoading(false),
    })
  }

  const handleUsername = (value: string) => setUsername(value)

  const handlePassword = (value: string) => setPassword(value)

  return (
    <div className={styles.container}>
      <Welcome />
      <form className={styles.form} onSubmit={handleLogin}>
        <Input placeholder="Username" onChange={handleUsername} />
        <Input
          type="password"
          placeholder="Password"
          onChange={handlePassword}
        />
        <div className={styles.actions}>
          <Button type="submit" disabled={!isLoginValid || isLoading}>
            Log In
          </Button>
          <div>
            <Text>Don't have an account? </Text>
            <Link to="signup">Sign Up</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
