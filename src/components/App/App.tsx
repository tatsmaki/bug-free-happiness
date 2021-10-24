import { Router } from '@components/Router'
import styles from './App.module.scss'

export const App = () => {
  return (
    <div className={styles.app}>
      <Router />
    </div>
  )
}
