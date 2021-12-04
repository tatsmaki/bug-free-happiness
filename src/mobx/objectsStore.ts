import { action, observable } from 'mobx'
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

export type ObjectsKeys = 'tree'

export class ObjectsStore {
  loader = new GLTFLoader()

  @observable
  tree?: GLTF

  @action
  loadObject = (key: ObjectsKeys) => {
    return new Promise((resolve, reject) => {
      this.loader.load(
        `${process.env.PUBLIC_URL}/objects/${key}.glb`,
        (gltf) => {
          this[key] = gltf
          resolve(key)
        },
        undefined,
        (error) => reject(error),
      )
    })
  }
}
