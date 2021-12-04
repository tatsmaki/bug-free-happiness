import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PlaneGeometry,
  // MeshBasicMaterial,
  Mesh,
  Raycaster,
  Vector3,
  Vector2,
  Group,
  Quaternion,
  FrontSide,
  PointLight,
  AmbientLight,
  MeshPhongMaterial,
  MathUtils,
  Clock,
  MeshLambertMaterial,
  // MeshPhysicalMaterial,
} from 'three'
import {
  NORMAL_SPEED,
  SHIFT_SPEED,
  NO_SPEED,
  DOWN,
  MIN_MAGIC_DISTANCE,
  MAX_MAGIC_DISTANCE,
  UP,
  FIRE_COLOR,
} from '@constants'
import { objectsStore, audioPlayer } from '@mobx'
import { Player } from './player'

const TREE_POSITIONS = [
  { x: -1, y: 5 },
  { x: 5, y: 5 },
  { x: -3, y: 7 },
  { x: 5, y: -5 },
  { x: 5, y: -3 },
  { x: 1, y: 11 },
]

export class Game {
  private scene = new Scene()
  private camera: PerspectiveCamera
  private renderer: WebGLRenderer

  private surfaceGroup = new Group()
  private ambientLight = new AmbientLight(0xffffff, 1)

  private isForward = false
  private isBackward = false
  private isLeft = false
  private isRight = false
  private velocity = NORMAL_SPEED

  private player: Player

  private isMagic = false
  private magicGroup = new Group()
  private magicLight = new PointLight(FIRE_COLOR, 1, 0, 2)
  private magicRay = new Raycaster()
  private mouse = new Vector2()

  private frames: Array<number> = []

  constructor(
    canvas: HTMLCanvasElement,
    private handlePauseMenu: () => void,
    private handleFrames: (newFrames: number) => void,
  ) {
    audioPlayer.playAudio('garden')
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    this.camera.position.z = 10

    this.renderer = new WebGLRenderer({ canvas, alpha: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.shadowMap.enabled = true
    this.renderer.physicallyCorrectLights = true

    const plane = new Mesh(
      new PlaneGeometry(30, 30),
      new MeshPhongMaterial({
        side: FrontSide,
        color: 0xffffff,
      }),
    )
    plane.receiveShadow = true
    this.surfaceGroup.add(plane)
    this.scene.add(this.surfaceGroup)

    this.player = new Player()
    this.scene.add(this.player.mesh)

    this.magicLight.castShadow = true
    this.magicGroup.add(this.magicLight)
    this.scene.add(this.magicGroup)

    this.scene.add(this.ambientLight)

    this.createForest()

    this.animate()

    setInterval(() => {
      this.handleFrames(this.frames.length)
      this.frames = []
    }, 1000)
  }

  private createForest = () => {
    const baseTree = objectsStore.tree!.scene
    const newTreeMaterial = new MeshLambertMaterial({ color: 0xc4c4c4 })

    baseTree.traverse((child) => {
      //@ts-ignore
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        //@ts-ignore
        child.material = newTreeMaterial
      }
    })

    TREE_POSITIONS.forEach(({ x, y }) => {
      const tree = baseTree.clone()

      tree.position.set(x, y, -1)
      tree.scale.set(0.5, 0.5, 0.5)
      tree.rotation.x = MathUtils.degToRad(90)
      tree.rotation.y = MathUtils.randFloat(0, Math.PI)
      this.scene.add(tree)
    })
  }

  private animate = () => {
    requestAnimationFrame(this.animate)
    this.renderer.render(this.scene, this.camera)
    this.frames.push(1)

    this.handleMovement()
    this.handlePhysics()
    this.handleMagic()
  }

  private handleMovement = () => {
    const xBias = Number(this.isRight) - Number(this.isLeft)
    const yBias = Number(this.isForward) - Number(this.isBackward)

    const normal = new Vector3(xBias, yBias, 0)
    const movement = normal.clampLength(this.velocity, this.velocity)

    this.camera.position.add(movement)
    this.player.animate(movement, xBias, yBias)
    // this.camera.position.copy

    // this.player.animate(movement, )
    // this.player.animate(movement)
    // this.player.mesh.position.add(movement)

    // if (xBias || yBias) {
    //   const angle = Math.atan2(-xBias, yBias)
    //   const quaternion = new Quaternion().setFromAxisAngle(UP, angle)

    //   this.player.mesh.quaternion.slerp(quaternion, 0.2)
    // }
  }

  private handlePhysics = () => {
    this.player.ray.set(this.player.mesh.position, DOWN)
    const intersections = this.player.ray.intersectObject(this.surfaceGroup)

    if (!intersections.length) {
      this.player.mesh.position.z -= 0.1
    }
    if (this.player.mesh.position.z < -5) {
      this.player.mesh.position.z = 5
    }
  }

  private handleMagic = () => {
    // const prevPosition = new Vector3().copy(this.magicGroup.position)

    if (this.isMagic) {
      this.magicRay.setFromCamera(this.mouse, this.camera)
      const intersections = this.magicRay.intersectObject(this.surfaceGroup)

      if (intersections.length) {
        const { point } = intersections[0]

        point.z = 0

        const direction = new Vector3()
          .subVectors(this.player.mesh.position, point)
          .negate()
          .clampLength(MIN_MAGIC_DISTANCE, MAX_MAGIC_DISTANCE)
          .add(this.player.mesh.position)
          .setZ(1)

        this.magicGroup.position.lerp(direction, 0.3)

        // const movement = this.magicGroup.position.distanceTo(prevPosition)

        // this.magicLight.intensity = Math.min(movement * 10, 2)
        this.magicLight.intensity = 2
      }
    } else {
      this.magicGroup.position.lerp(this.player.mesh.position, 0.1)

      this.magicLight.intensity = 0
    }
  }

  addListeners = () => {
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)
    document.addEventListener('mousedown', this.handleMouseDown)
    document.addEventListener('mouseup', this.handleMouseUp)
    document.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('wheel', this.handleWheel, { passive: false })
  }

  removeListeners = () => {
    document.removeEventListener('keydown', this.handleKeyDown)
    document.removeEventListener('keyup', this.handleKeyUp)
    document.removeEventListener('mousedown', this.handleMouseDown)
    document.removeEventListener('mouseup', this.handleMouseUp)
    document.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('wheel', this.handleWheel)
  }

  private handleMouseDown = () => {
    this.isMagic = true
  }

  private handleMouseUp = () => {
    this.isMagic = false
  }

  private handleMouseMove = (event: MouseEvent) => {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'KeyW': {
        this.isForward = true
        break
      }
      case 'KeyS': {
        this.isBackward = true
        break
      }
      case 'KeyA': {
        this.isLeft = true
        break
      }
      case 'KeyD': {
        this.isRight = true
        break
      }
      case 'Escape': {
        this.handlePauseMenu()
        break
      }
      case 'Space': {
        if (this.velocity === NORMAL_SPEED) {
          this.handleEvade()
        }
        break
      }
      default: {
        break
      }
    }
  }

  private handleEvade = () => {
    this.velocity = SHIFT_SPEED
    setTimeout(() => (this.velocity = NO_SPEED), 200)
    setTimeout(() => (this.velocity = NORMAL_SPEED), 1000)
  }

  private handleKeyUp = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'KeyW': {
        this.isForward = false
        break
      }
      case 'KeyS': {
        this.isBackward = false
        break
      }
      case 'KeyA': {
        this.isLeft = false
        break
      }
      case 'KeyD': {
        this.isRight = false
        break
      }
      default: {
        break
      }
    }
  }

  private handleResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  private handleWheel = (event: WheelEvent) => {
    event.preventDefault()
  }
}
