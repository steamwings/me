import Link from 'next/link'
import styles from 'styles/layout.module.css'
import { Destination, getUrl } from 'lib/nav';

type LayoutProps = { children: React.ReactNode, backNav?: Destination }

export default function Layout({ children, backNav }: LayoutProps) {
  backNav = backNav ?? Destination.Up;
  return (
    <div className={styles.container}>
      <header className={styles.header}>
      </header>

      <main className={styles.main}>{children}</main>

      {(backNav != Destination.None) && (
        <Link href={getUrl(backNav)} className={styles.backToHome}>
          ← Back
        </Link>
      )}

      <footer className={styles.footer}>
        <section>
          &#169; 2021-{new Date().getFullYear()} Zander Weather. All Rights Reserved.
        </section>
        <section>
          &nbsp;See this site&#39;s
          <a href="https://github.com/steamwings/me">&nbsp;source code</a>.
        </section>
      </footer>
    </div>
  );
}
