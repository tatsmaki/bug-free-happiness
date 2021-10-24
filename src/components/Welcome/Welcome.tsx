import { Title } from '@common/Title'
import styles from './Welcome.module.scss'

export const Welcome = () => {
  return (
    <div className={styles.welcome}>
      {/* <Title>
        Hey, <br />
        nice to see you.
      </Title> */}
      <Title>
        Welcome <br />
        to PlayIt.
      </Title>
    </div>
  )
}
