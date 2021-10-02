import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faGithub, faKeybase, faYoutube,  } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faDollarSign } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Zander Weather</title>
        <meta name="description" content="Zander's site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Zander
        </h1>

        <p className={styles.description}>
          <a href="https://www.bible.com/bible/59/JHN.18.36-37.ESV">
          Living like Jesus is &#x1f451;
          </a>
        </p>

        <div className={styles.subtitle}>
          <a href="https://twitter.com/zweather"><FontAwesomeIcon size="lg" icon={faTwitter} /></a>
          <a href="https://github.com/steamwings"><FontAwesomeIcon size="lg" icon={faGithub} /></a>
          <a href="https://www.youtube.com/channel/UCYtpQXhep8dADXhU11xsBXA"><FontAwesomeIcon size="lg" icon={faYoutube}/></a>
          <a href="https://venmo.com/u/zweather"><FontAwesomeIcon size="lg" icon={faDollarSign} /></a>
          <a href="mailto:zanderweather@outlook.com"><FontAwesomeIcon size="lg" icon={faEnvelope} /></a>
          <a href="https://keybase.io/zweather"><FontAwesomeIcon size="lg" icon={faKeybase} /></a>
        </div>

        <div className={styles.grid}>
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
              See the source code, bootstrapped with Next.js
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
      </main>

      <footer className={styles.footer}>
        &#169; 2021 Zander Weather. All Rights Reserved.
      </footer>
    </div>
  )
}
