import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LogIn from './components/auth/LogIn'
import SignUp from './components/auth/SignUp'
import PageNotFound from './components/PageNotFound'
import AuthLayout from './layout/auth-layout'
import { ToastContainer } from 'react-toastify'
import { paths } from './constant/Paths'
import MainLayout from './layout/main-layout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import PostPage from './pages/Post'

const App = () => {



  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>

          <Route element={<AuthLayout />}>
            <Route path={paths.logIn} element={<LogIn />} />
            <Route path={paths.signUp} element={<SignUp />} />
          </Route>

          <Route element={<MainLayout />}>
            {/* <Route element={<PrivateRoute />}> */}
            <Route path={paths.home} element={<Home />} />
            <Route path={paths.PostPage} element={<PostPage />} />
            <Route path={paths.profie} element={<Profile />} />
            {/* </Route> */}
          </Route>


          <Route path={paths.pageNotFound} element={<PageNotFound />} />

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App