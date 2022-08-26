import Post from '../../components/post'

const title = 'Eat Well for $15/week'
const date = new Date(2022, 0, 10);

export default function eat15() {
  return (
    <Post title={title} date={date}>
      <p>
        Working on this...
      </p>
    </Post>
  )
}