import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function CV() {
  return (
    <Layout>
      <div className={utilStyles.grid}>
        {/* TODO <div>
          <h1>Projects</h1>
          <p>
            <ul>
              <li>Web frontend</li>
              <li>Mobile</li>
            </ul>
          </p>
        </div> */}
        <div>
          <h1>Skills</h1>
          <p> I have experience with
            <ul>
              <li>Bash</li>
              <li>C</li>
              <li>C#</li>
              <li>C++</li>
              <li>Java</li>
              <li>Javascript</li>
              <li>Ocaml</li>
              <li>Perl</li>
              <li>Python</li>
              <li>Ruby</li>
              <li>SQL (T-SQL, Oracle)</li>
              <li>TypeScript</li>
              <li>VBA</li>
            </ul>
          </p>
        </div>
      </div>
    </Layout>
  )
}