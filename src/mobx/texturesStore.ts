import { action, observable } from 'mobx'
import { TextureLoader, Texture, RepeatWrapping } from 'three'
import { IDLE, RUN } from '@constants'

export type TexturesKeys = 'idle' | 'run'
export type TextureParams = {
  KEY: TexturesKeys
  HORIZONTAL: number
  VERTICAL: number
  SIZE: number
}

export class TexturesStore {
  loader = new TextureLoader()

  @observable
  idle?: Texture

  @observable
  run?: Texture

  @action
  loadTexture = (key: TexturesKeys) => {
    return new Promise((resolve, reject) => {
      this.loader.load(
        `${process.env.PUBLIC_URL}/textures/${key}.png`,
        (texture) => {
          texture.name = key
          texture.needsUpdate = true
          texture.wrapS = texture.wrapT = RepeatWrapping
          if (key === IDLE.KEY) {
            texture.repeat.set(1 / IDLE.HORIZONTAL, 1 / IDLE.VERTICAL)
          }
          if (key === RUN.KEY) {
            texture.repeat.set(1 / RUN.HORIZONTAL, 1 / RUN.VERTICAL)
          }
          this[key] = texture
          resolve(key)
        },
        undefined,
        (error) => reject(error),
      )
    })
  }
}
