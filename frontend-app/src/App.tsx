import { Routes, Route } from 'react-router-dom'
import Welcome from './presentation/welcome/Welcome'
import UserList from './presentation/user/UserList'
import Layout from './presentation/Layout'
import { Outlet } from 'react-router-dom';
import AuthPage from './presentation/auth/LoginForm'
import UrlManagement from './presentation/url/UrlManagement'
import Home from './presentation/home/Home'
import SearchPage from './presentation/searchPage/SearchPage'
import ProfilePage from './presentation/profile/ProfilePage'

function App() {
  return (
  <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={<Welcome />} />
      <Route 
        element={
          <Layout showSidebar={true}>
            <Outlet /> 
          </Layout>
        }
      >        
      <Route path="/" element={<Welcome />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/myUrls" element={<UrlManagement />} />
      <Route path="/home" element={<Home />} />
      <Route path="/search" element={<SearchPage  />} />
      <Route path="/profile" element={<ProfilePage  />} />


      </Route>
    </Routes>
  )
}

export default App