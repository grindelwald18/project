import { client } from '../api/client'
import { postsEndpoint, myPostsEndpoint } from '../api/endpoints'

async function requestPosts (params = {}) {
  const { data } = await client.get(postsEndpoint, { params })
  if (data.results.length === 0) {
    return []
  }
  return data
}

async function requestMyPosts (params = {}) {
  const { data } = await client.get(myPostsEndpoint, { params })
  return data.results
}

export { requestPosts, requestMyPosts }
