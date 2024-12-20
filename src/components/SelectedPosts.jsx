import { LargePost } from './largePost/LargePost'
export function SelectedPosts ({ posts }) {
  function renderPosts () {
    if (posts.length === 0) {
      return <h1>No posts found.</h1>
    }
    return posts.map((post) => {
      return <LargePost image={post.image} key={post.id} id={post.id} title={post.title} text={post.text} type={post.cardType}/>
    })
  }

  return (
    <>
      {renderPosts()}
    </>
  )
}
