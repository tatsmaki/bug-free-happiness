import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Game } from '@components/Game/Game'
import { Login } from '@components/Login'
import { SignUp } from '@components/SignUp/SignUp'
import { userStore } from '@mobx'

export const Router = observer(() => {
  const isWithToken = userStore.token.value

  return (
    <BrowserRouter>
      <Switch>
        {isWithToken && <Route path="/game" component={Game} />}
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  )
})
