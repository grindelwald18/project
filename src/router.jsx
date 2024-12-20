import { createBrowserRouter } from 'react-router-dom'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { SearchResults } from './pages/SearchResults'
import { Posts } from './pages/Posts'
import { Layout } from './components/Layout'
import { Post } from './pages/Post'
import { PostsLayout } from './components/PostsLayout'
import { Favorite } from './pages/Favorite'
import { Popular } from './pages/Popular'
import { UserActivation } from './pages/UserActivation'
import { RegistrationConfirmation } from './components/RegistrationConfirmation'
import { Successful } from './pages/Successful'
import { MyPosts } from './pages/MyPosts'
import { NotFound } from './components/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <PostsLayout />,
        children: [
          {
            path: '/posts/pages/:page',
            element: <Posts />
          },
          {
            path: '/posts/favorite',
            element: <Favorite />
          },
          {
            path: '/posts/popular',
            element: <Popular/>
          }
        ]
      },
      {
        path: '/posts/my',
        element: <MyPosts />
      },
      {
        path: 'posts/search/:query',
        element: <SearchResults />
      },
      {
        path: '/auth/signup',
        element: <SignUp />
      },
      {
        path: '/auth/activate/:uid/:token',
        element: <UserActivation />
      },
      {
        path: '/auth/activate/successful',
        element: <Successful />
      },
      {
        path: '/auth/signin',
        element: <SignIn />
      },
      {
        path: '/registration-confirmation',
        element: <RegistrationConfirmation />
      },
      {
        path: '/post/:postId',
        element: <Post/>
      },
      {
        path: '/not-found',
        element: <NotFound />
      }
    ]
  }
])
