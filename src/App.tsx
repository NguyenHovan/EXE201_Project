
import { PATH, roles } from './consts'
import { FooterComponent, Navbar } from './components'
import AppRouter from './routers'

function App() {
  const isNotUseHeaderFooter =
    location.pathname.includes(roles.ADMIN) ||
    location.pathname.includes(roles.STAFF) ||
    location.pathname.includes(roles.MANAGER) ||
    location.pathname.includes(PATH.LOGIN) ||
    location.pathname.includes(PATH.REGISTER) ||
    location.pathname.includes(PATH.FORGOT_PASSWORD)
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* {!isNotUseHeaderFooter && <Header />}  */}
        {!isNotUseHeaderFooter && <Navbar />}
        <div className="flex-grow">
          <AppRouter />
        </div>
        {!isNotUseHeaderFooter && <FooterComponent />}
      </div>
    </>
  )
}

export default App
