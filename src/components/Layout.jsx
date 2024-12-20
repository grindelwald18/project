import { useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Main } from './Main'
import { Footer } from './Footer'

export function Layout (props) {
  const location = useLocation()

  const isSignInPage = useMemo(() => location.pathname === '/auth/signin' || location.pathname === '/auth/signup', [location])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', backgroundColor: '#5d5d5d' }}>
      {/* {isSignInPage ? null : <Header/>} */}
      <Header />
      <div className="container flex-grow-1">
        <Main>
          <Outlet />
        </Main>
      </div>
      {isSignInPage ? null : <Footer />}
    </div>
  )
}
