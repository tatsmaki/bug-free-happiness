import {
  Mesh,
  Raycaster,
  PlaneGeometry,
  MeshBasicMaterial,
  FrontSide,
  Clock,
  Quaternion,
  Vector3,
} from 'three'
import { FIRE_COLOR, UP, IDLE, RUN, FRAME_DURATION } from '@constants'
import { texturesStore } from '@mobx'
import { TextureParams } from 'src/mobx/texturesStore'

export class Player {
  public mesh: Mesh
  public ray = new Raycaster()

  private currentTime = 0
  private currentTile = 0
  private clock = new Clock()

  private isIdle = true

  constructor() {
    this.mesh = new Mesh(
      new PlaneGeometry(2, 2),
      new MeshBasicMaterial({
        side: FrontSide,
        transparent: true,
        color: FIRE_COLOR,
        map: texturesStore.idle,
      }),
    )

    this.ray.far = 1
  }

  animate = (movement: Vector3, xBias: number, yBias: number) => {
    this.mesh.position.add(movement)

    if (xBias || yBias) {
      this.isIdle = false
      const angle = Math.atan2(-xBias, yBias)
      const quaternion = new Quaternion().setFromAxisAngle(UP, angle)

      this.mesh.quaternion.slerp(quaternion, 0.2)
    } else {
      this.isIdle = true
    }

    const delta = this.clock.getDelta() * 1000

    if (this.isIdle) {
      this.animateTexture(delta, IDLE as TextureParams)
    } else {
      this.animateTexture(delta, RUN as TextureParams)
    }
  }

  animateTexture = (delta: number, { KEY, HORIZONTAL, VERTICAL, SIZE }: TextureParams) => {
    // @ts-ignore
    if (this.mesh.material.map.name !== KEY) {
      // @ts-ignore
      this.mesh.material.map = texturesStore[KEY]
      // @ts-ignore
      this.mesh.material.map.offset.set(1 / HORIZONTAL, 1 / VERTICAL)
      this.currentTime = 0
      this.currentTile = 0
    }
    this.currentTime += delta

    if (this.currentTime > FRAME_DURATION) {
      this.currentTime = 0
      this.currentTile += 1
      if (this.currentTime === SIZE) {
        this.currentTile = 0
      }

      const currentColumn = (this.currentTile % HORIZONTAL) - HORIZONTAL - 1
      const currentRow = -Math.ceil(this.currentTile / HORIZONTAL)
      console.log('c', currentColumn, 'r', currentRow)
      // console.log('offset', currentColumn / HORIZONTAL, currentRow / VERTICAL)
      // @ts-ignore
      this.mesh.material.map.offset.set(currentColumn / HORIZONTAL, currentRow / VERTICAL)
      // this.mesh.material.map.offset.x = currentColumn / HORIZONTAL
      // @ts-ignore
      // this.mesh.material.map.offset.y = currentRow / VERTICAL
    }
  }
}
