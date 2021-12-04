import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { MainMenu } from '@components/MainMenu/MainMenu'
import { Login } from '@components/Login'
import { SignUp } from '@components/SignUp/SignUp'
import { userStore } from '@mobx'
import { Canvas } from '@components/Canvas'

export const Router = observer(() => {
  const isWithToken = userStore.token.value

  return (
    <BrowserRouter>
      <Switch>
        {isWithToken && <Route path="/main" component={MainMenu} />}
        {isWithToken && <Route path="/game" component={Canvas} />}
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Redirect to="/login" />
      </Switch>
    </BrowserRouter>
  )
})
