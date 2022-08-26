//import { BlogDataContext } from "../pages/blog"
import Layout from "./layout"
import Blog from "../pages/blog"

export default function Post({ children, title, date }) {
  Blog.addPost({title: title, date: date, uri: "/"})
  return (
    //<BlogDataContext.Provider value={[{'title': title, 'date': date}]}>
      <Layout>
        <h1>{title} ({date.toLocaleDateString()})</h1>
        <div>
          {children}
        </div>
      </Layout>
    //</BlogDataContext.Provider>
  )
}