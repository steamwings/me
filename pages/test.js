import Layout from "../components/layout";

export default function Test() {
  return (
    <Layout fullWidth>
      <div style={{display:'grid', width: '100%', gridTemplateColumns: '200px 5fr' }}>
        <p>this is a thing</p>
        <p>hm, this is another thing</p>
      </div>
    </Layout>
  )
}