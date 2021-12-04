import { audioStore } from '@mobx'
import { AudioKeys } from 'src/mobx/audioStore'

export class AudioPlayer {
  private context = new AudioContext()
  private backgroundVolume = this.context.createGain()
  private backgroundSource?: AudioBufferSourceNode

  constructor() {
    this.backgroundVolume.connect(this.context.destination)
    this.backgroundVolume.gain.value = 0.1
  }

  playAudio = (key: AudioKeys) => {
    const audioToPlay = audioStore[key]!

    this.context.decodeAudioData(audioToPlay, (buffer) => {
      this.backgroundSource = this.context.createBufferSource()
      this.backgroundSource.connect(this.backgroundVolume)
      this.backgroundSource.loop = true
      this.backgroundSource.buffer = buffer
      this.backgroundSource.start()
    })
  }
}
