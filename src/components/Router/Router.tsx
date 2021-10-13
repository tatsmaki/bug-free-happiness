import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom'
import { Game } from '../Game/Game'
import { Login } from '../Login/Login'

const isLoggedIn = false

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/game">
          <Game />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        {!isLoggedIn && <Redirect to="/login" />}
      </Switch>
    </BrowserRouter>
  )
}
