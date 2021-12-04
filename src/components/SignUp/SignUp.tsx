import { useState, FormEvent } from 'react'
import { useHistory } from 'react-router'
import { request } from '@api'
import { userStore } from '@mobx'
import { Input } from '@controls/Input'
import { Button } from '@controls/Button'
import { Text } from '@common/Text'
import { Link } from '@controls/Link'
import { Welcome } from '@components/Welcome'
import { Loader } from '@common/Loader'
import { Flex } from '@common/Flex'
import styles from './SignUp.module.scss'

export const SignUp = () => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const isFormValid = Boolean(username && password)

  const handleSignUp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsLoading(true)
    request({
      path: 'auth/signup',
      method: 'POST',
      body: { email, username, password },
      success: ({ token }) => {
        if (token) {
          userStore.setToken(token)
          history.push('main')
        }
      },
      fail: () => setIsLoading(false),
    })
  }

  const handleEmail = (value: string) => setEmail(value)

  const handleUsername = (value: string) => setUsername(value)

  const handlePassword = (value: string) => setPassword(value)

  return (
    <div className={styles.container}>
      <Welcome />

      <form className={styles.form} onSubmit={handleSignUp}>
        <Loader isLoading={isLoading}>
          <Flex>
            <Input placeholder="Email" disabled onChange={handleEmail} />
            <Input placeholder="Username*" onChange={handleUsername} />
            <Input
              type="password"
              placeholder="Password*"
              onChange={handlePassword}
            />
          </Flex>
        </Loader>

        <Flex>
          <Button type="submit" disabled={!isFormValid || isLoading}>
            Sign Up
          </Button>

          <div>
            <Text>Already have an account? </Text>
            <Link to="login">Log In</Link>
          </div>
        </Flex>
      </form>
    </div>
  )
}
