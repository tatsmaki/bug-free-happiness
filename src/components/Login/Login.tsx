import { useState, FormEvent } from 'react'
import { useHistory } from 'react-router'
import { request } from '@api'
import { userStore } from '@mobx'
import { Input } from '@controls/Input'
import { Button } from '@controls/Button'
import { Link } from '@controls/Link'
import { Text } from '@common/Text'
import { Welcome } from '@components/Welcome'
import { Loader } from '@common/Loader'
import { Flex } from '@common/Flex'
import styles from './Login.module.scss'

export const Login = () => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const isLoginValid = Boolean(username && password)

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsLoading(true)
    request({
      // url: 'http://localhost:4000/auth/login',
      url: 'https://nest-ts-server.herokuapp.com/auth/login',
      method: 'POST',
      body: { username, password },
      success: ({ token }) => {
        if (token) {
          // const user = jwt.decode(token)
          userStore.setToken(token)
          history.push('main')
        }
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
        <Loader isLoading={isLoading}>
          <Flex>
            <Input placeholder="Username*" onChange={handleUsername} />
            <Input
              type="password"
              placeholder="Password*"
              onChange={handlePassword}
            />
          </Flex>
        </Loader>

        <Flex>
          <Button type="submit" disabled={!isLoginValid || isLoading}>
            Log In
          </Button>

          <div>
            <Text>Don't have an account? </Text>
            <Link to="signup">Sign Up</Link>
          </div>
        </Flex>
      </form>
    </div>
  )
}
