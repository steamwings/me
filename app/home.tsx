import Layout from 'components/layout'
import Link from 'next/link'
import styles from 'styles/home.module.css'
import utilStyles from 'styles/utils.module.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faLinkedin,
  faSignalMessenger,
} from '@fortawesome/free-brands-svg-icons'
import {faEnvelope, faDollarSign} from '@fortawesome/free-solid-svg-icons'
import { Destination } from 'lib/nav';

export default function Home() {
  return (
    <Layout backNav={Destination.None} >
      <div className={
        styles.main
      }>
        <h1 className={
          styles.title
        }>
          Zander
        </h1>

        <p className={
          styles.description
        }>
          <a href="https://www.bible.com/bible/59/JHN.18.36-37.ESV">
            Living like Jesus is &#x1f451;
          </a>
        </p>

        <div className={
          styles.social
        }>
          <a href="https://github.com/steamwings" aria-label="Github link">
            <FontAwesomeIcon size="lg" icon={faGithub}/>
          </a>
          <a href="https://signal.me/#eu/JMbjrhGqx/NJWDIGLJlFhYRMlkjJDfFwlIrsAEHEgMuW8hEs7o1JrLh7AsFfncFR" aria-label="Signal link">
            <FontAwesomeIcon size="lg" icon={faSignalMessenger}/>
          </a>
          {/* <a rel="me" href="https://weather.family/@zander" aria-label="Mastodon link"><FontAwesomeIcon size="lg"
            icon={faMastodon}/></a> */}
          <a href="https://www.linkedin.com/in/zanderw/" aria-label="LinkedIn link">
            <FontAwesomeIcon size="lg" icon={faLinkedin}/>
          </a>
          <a href="mailto:contact@zweather.me" aria-label="email link">
            <FontAwesomeIcon size="lg" icon={faEnvelope}/>
          </a>
          <a href="https://venmo.com/u/zweather" aria-label="Venmo link">
            <FontAwesomeIcon size="lg" icon={faDollarSign}/></a>
        </div>

        <div className={
          utilStyles.grid
        }>
          <Link href="/poems"
            className={styles.card}>
            <span>
              <h2>Poems</h2>&nbsp;&#x1f33b;
            </span>
            <p>A small smattering of poor poetry</p>
          </Link>

          <Link href="/blog"
            className={styles.card}>
            <span>
              <h2>Blog</h2>&nbsp;&#x1f4e2;
            </span>
            <p>
              Things I thought I ought to share
            </p>
          </Link>

          <Link href="/sets"
            className={styles.card}>
            <span>
              <h2>Sets</h2>&nbsp;&#x1f4d6;
            </span>
            <p>Lyrics and readings for worship nights</p>
          </Link>

          <Link href="https://www.youtube.com/channel/UCYtpQXhep8dADXhU11xsBXA"
            className={styles.card}>
            <span>
              <h2>Music</h2>&nbsp;&#x1f3bc;
            </span>
            <p>Original songs I&apos;ll one day make more of</p>
          </Link>

          <Link href="/skills"
            className={styles.card}>
            <span>
              <h2>Skills</h2>&nbsp;&#x1f4bb;
            </span>
            <p>An outdated list of tech and tools I&apos;ve used</p>
          </Link>

        </div>
      </div>
    </Layout>
  );
}
