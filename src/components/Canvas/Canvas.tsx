import { useState, useRef, useEffect, MutableRefObject } from 'react'
import { createPortal } from 'react-dom'
import { Frames } from '@components/Frames'
import { PauseMenu } from '@components/PauseMenu'
import { Game } from './Game'
import { texturesStore, objectsStore, audioStore } from '@mobx'

const loadTexturesAndObjects = async () => {
  return Promise.all([
    texturesStore.loadTexture('idle'),
    texturesStore.loadTexture('run'),
    objectsStore.loadObject('tree'),
    // audioStore.loadAudio('winter'),
    audioStore.loadAudio('garden'),
  ])
}

export const Canvas = () => {
  const [isPaused, setIsPaused] = useState(false)
  const [frames, setFrames] = useState(0)
  const canvasRef = useRef() as MutableRefObject<HTMLCanvasElement>

  const handlePauseMenu = () => setIsPaused((prevState) => !prevState)

  const handleFrames = (newFrames: number) => setFrames(newFrames)

  useEffect(() => {
    loadTexturesAndObjects().then(() => {
      const game = new Game(canvasRef.current, handlePauseMenu, handleFrames)

      game.addListeners()
      return () => game.removeListeners()
    })
  }, [])

  return (
    <>
      <Frames>{frames}</Frames>
      <canvas ref={canvasRef} />
      {isPaused &&
        createPortal(
          <PauseMenu handlePauseMenu={handlePauseMenu} />,
          document.getElementById('root')!,
        )}
    </>
  )
}
