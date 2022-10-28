import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Layout.module.css'

export default function Layout({ children, hideBackToHome }) {
  return (<div className={styles.container}>
    <Head>
      <title>Zander Weather</title>
      <meta name="description" content="Zander Weather - artist, developer, Jesus-worshipper" />
      <link rel="icon" href="/z.ico" />
    </Head>
    <header className={styles.header}>
    </header>

    <main className={styles.main}>{children}</main>
    
    {!hideBackToHome && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
    )}

    <footer className={styles.footer}>
        &#169; 2021-{new Date().getFullYear()} Zander Weather. All Rights Reserved.
    </footer>
  </div>)
}