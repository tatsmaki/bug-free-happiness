import { action, observable } from 'mobx'

export type AudioKeys = 'winter' | 'garden'

export class AudioStore {
  @observable
  winter?: ArrayBuffer

  @observable
  garden?: ArrayBuffer

  @action
  loadAudio = async (key: AudioKeys) => {
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/audio/${key}.wav`)

      this[key] = await response.arrayBuffer()
      return key
    } catch (error) {
      return error
    }
  }
}
