import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Game } from '../Game/Game'
import { Login } from '../Login/Login'
import { SignUp } from '../SignUp/SignUp'
import { userStore } from 'src/mobx'

export const Router = observer(() => {
  const isWithToken = userStore.token.value

  return (
    <BrowserRouter>
      <Switch>
        {isWithToken && <Route path="/game" component={Game} />}
        <Route path="/sign-up" component={SignUp} />
        <Route path="/login" component={Login} />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  )
})
