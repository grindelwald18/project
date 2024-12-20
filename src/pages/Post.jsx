import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Title } from '../components/Title'
export function Post () {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const allPosts = useSelector(state => state.posts.list)

  useEffect(() => {
    setPost(allPosts.find(post => post.id === Number(postId)))
  }, [postId])

  if (!post) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
      <Title>{post.title}</Title>
      <img className="mb-3" src={`${post.image}`} style={{ width: '250px', height: '300px', objectFit: 'cover' }}/>
      <p>{post.text}</p>
      <p>{post.description}</p>
    </>
  )
}
