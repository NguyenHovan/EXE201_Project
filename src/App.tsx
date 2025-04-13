
import { PATH, roles } from './consts'
import { FooterComponent, Navbar } from './components'
import AppRouter from './routers'

import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'

function App() {
  const location = useLocation()

  const isNotUseHeaderFooter = useMemo(() => {
    return (
      location.pathname.includes(roles.ADMIN.toLowerCase()) ||
      location.pathname.includes(roles.STAFF.toLowerCase()) ||
      location.pathname.includes(roles.MANAGER.toLowerCase()) ||
      location.pathname.includes(PATH.LOGIN) ||
      location.pathname.includes(PATH.REGISTER) ||
      location.pathname.includes(PATH.FORGOT_PASSWORD)
    )
  }, [location.pathname])

  return (
    <div className="flex flex-col min-h-screen">
      {!isNotUseHeaderFooter && <Navbar />}
      <div className="flex-grow">
        <AppRouter />
      </div>
      {!isNotUseHeaderFooter && <FooterComponent />}
    </div>
  )
}

export default App
