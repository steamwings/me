//import styles from 'styles/Layout.module.css' // TODO
import styles from 'styles/layout.module.css'
import utilStyles from 'styles/utils.module.css'
import { titelize } from 'lib/format'

export default function Song({ name, lyrics }) {

  return (<div className={styles.container}>
      <h2>{titelize(name)}</h2>
      <p className={utilStyles.preline}>
        {lyrics}
      </p>
  </div>)
}
