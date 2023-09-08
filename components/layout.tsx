import Head from 'next/head'
import Link from 'next/link'
import styles from 'styles/layout.module.css'
import { Destination, getUrl } from 'lib/nav';

type LayoutProps = { children: React.ReactNode, backNav?: Destination }

export default function Layout({ children, backNav }: LayoutProps) {
  backNav = backNav ?? Destination.Up;
  return (
    <div className={styles.container}>
      <Head>
        <title>Zander Weather</title>
        <meta name="description" content="Zander Weather - artist, developer, Jesus-worshipper" />
        <link rel="icon" href="/z.ico" />
      </Head>
      <header className={styles.header}>
      </header>

      <main className={styles.main}>{children}</main>

      {(backNav != Destination.None) && (
          <div className={styles.backToHome}>
            <Link href={getUrl(backNav)}>
              ← Back
            </Link>
          </div>
      )}

      <footer className={styles.footer}>
          &#169; 2021-{new Date().getFullYear()} Zander Weather. All Rights Reserved.
          &nbsp;|&nbsp; See this site&#39;s
          <a href="https://github.com/steamwings/me">&nbsp;source code</a>.
      </footer>
    </div>
  );
}
