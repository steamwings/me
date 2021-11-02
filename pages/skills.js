import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function CV() {
  return (
    <Layout>
      <h1>Skills</h1>
      <p className={utilStyles.small}>This list is not exhaustive.&nbsp;
      <a className={utilStyles.linkBlue} href="mailto:contact@zweather.me" aria-label="email link">Ask me</a>
      &nbsp;if I&apos;ve used your technology.</p>
      <div className={utilStyles.grid}>
        <span>
          <p>Languages</p>
          <ul>
            <li>Bash</li>
            <li>C</li>
            <li>C#</li>
            <li>C++</li>
            <li>Java</li>
            <li>JavaScript</li>
            <li>Ocaml</li>
            <li>Python</li>
            <li>Ruby</li>
            <li>Rust</li>
            <li>SQL</li>
            <li>TypeScript</li>
          </ul>
        </span>
        <span>
          <p>Frameworks</p>
          <ul>
            <li>Angular</li>
            <li>Next.js (React)</li>
            <li>Rails</li>
            <li>Spring Boot</li>
          </ul>
          <p>Tools</p>
          <ul>
            <li>.NET Core</li>
            <li>Apache Kafka</li>
            <li>Docker</li>
            <li>NodeJS</li>
            <li>Postman</li>
            <li>WSL 2</li>
          </ul>
        </span>
        <span>
          <p>Platforms</p>
          <ul>
            <li>Azure</li>
            <li>AWS</li>
            <li>Pivotal Cloud Foundry</li>
          </ul>
          <p>CI/CD</p>
          <ul>
            <li>Azure DevOps</li>
            <li>Concourse</li>
            <li>Jenkins</li>
          </ul>
        </span>
      </div>
    </Layout>
  )
}