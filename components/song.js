//import styles from '../styles/Layout.module.css' // TODO
import utilStyles from '../styles/utils.module.css'

export default function Song({ name, lyrics }) {

  return (<div>
      <h5>{name}</h5>
      <p className={utilStyles.preline}>
        {lyrics}
      </p>
  </div>)
}