import { UserStore } from './userStore'
import { TexturesStore } from './texturesStore'
import { ObjectsStore } from './objectsStore'
import { AudioStore } from './audioStore'
import { AudioPlayer } from './audioPlayer'

export const userStore = new UserStore()
export const texturesStore = new TexturesStore()
export const objectsStore = new ObjectsStore()
export const audioStore = new AudioStore()
export const audioPlayer = new AudioPlayer()
