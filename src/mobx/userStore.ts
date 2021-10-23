import { action, observable } from 'mobx'
import Cookie from 'mobx-cookie'
import { TOKEN } from '../constants'

export class UserStore {
  @observable
  token = new Cookie(TOKEN)

  @action
  setToken = (token: string) => {
    this.token.set(token)
  }

  @action
  clearToken = () => {
    this.token.remove()
  }
}
