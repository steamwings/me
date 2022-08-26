import Layout from '../components/layout'
import Link from 'next/link'
import React, {useState} from 'react';


export default class Blog extends React.Component {

  constructor(props) {
    super(props)
    this.posts = [{title: 'Test', date: new Date(), uri: "/blog/eat-well-for-15-a-week"}]
  }
 
  addPost(post) { 
    changePosts(this.posts.push(post)); console.log(posts);
  }

  render() {
    
    return (
      <Layout>
        <h1>Blog Posts</h1>
        <div>
          <ul>
            {
              this.posts.sort((x,y) => x.date - y.date).map((p,index) => 
                <li key={index}><Link href={p.uri}><a>
                  {p.title} - {p.date.toLocaleDateString()}
                </a></Link></li>  
              )
            }
            <li><Link href="/blog/eat-well-for-15-a-week"><a>Eat Well for $15/week</a></Link></li>
          </ul>
        </div>
      </Layout>
    )
  }
}



