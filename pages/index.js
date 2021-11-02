import Layout from '../components/layout'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import utilStyles from '../styles/utils.module.css'
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faGithub, faKeybase, faYoutube, faInstagram,  } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faDollarSign } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <Layout home>
      <div className={styles.main}>
        <h1 className={styles.title}>
          Zander
        </h1>

        <p className={styles.description}>
          <a href="https://www.bible.com/bible/59/JHN.18.36-37.ESV">
          Living like Jesus is &#x1f451;
          </a>
        </p>

        <div className={styles.social}>
          <a href="https://github.com/steamwings" aria-label="Github link"><FontAwesomeIcon size="lg" icon={faGithub} /></a>
          <a href="https://www.youtube.com/channel/UCYtpQXhep8dADXhU11xsBXA" aria-label="Youtube link"><FontAwesomeIcon size="lg" icon={faYoutube}/></a>
          <a href="https://twitter.com/zanderweather" aria-label="Twitter link"><FontAwesomeIcon size="lg" icon={faTwitter} /></a>
          <a href="https://instagram.com/zanderweather" aria-label="Instagram link"><FontAwesomeIcon size="lg" icon={faInstagram}/></a>
          <a href="https://venmo.com/u/zweather" aria-label="Venmo link"><FontAwesomeIcon size="lg" icon={faDollarSign} /></a>
          <a href="mailto:contact@zweather.me" aria-label="email link"><FontAwesomeIcon size="lg" icon={faEnvelope} /></a>
          <a href="https://keybase.io/zweather" aria-label="Keybase link"><FontAwesomeIcon size="lg" icon={faKeybase} /></a>
        </div>

        <div className={utilStyles.grid}>
          <a href="https://www.youtube.com/channel/UCYtpQXhep8dADXhU11xsBXA" className={styles.card}>
            <h2>&#x1f3bc; Music &rarr;</h2>
            <p>Check out my original songs and performances.</p>
          </a>

          <Link href="/skills" className={styles.card}>
            <a className={styles.card}>
              <h2> &#x1f4bb; Skills &rarr;</h2>
              <p>Read about my projects and the tech I&apos;ve used</p>
            </a>
          </Link>

          <a
            href="https://github.com/steamwings/me"
            className={styles.card}
          >
            <h2>&#x1f4dc; Source &rarr;</h2>
            <p>
              See this site&apos;s source code, bootstrapped with Next.js
            </p>
          </a>

          <a
            href="https://keybase.io/zweather"
            className={styles.card}
          >
            <h2>&#x1f511; Keybase &rarr;</h2>
            <p>Encrypted chat and cryptographic proofs</p>
          </a>
        </div>
      </div>
    </Layout>
  )
}
