import { Routes, Route } from 'react-router-dom'
import LoginForm from './pages/LoginForm'
import Welcome from './pages/Welcome'
import UserList from './presentation/components/user/UserList'
import Layout from './pages/Layout'
import { Outlet } from 'react-router-dom';
import AuthPage from './pages/LoginForm'
import RegisterPage from './pages/RegisterForm'
import UrlManagement from './presentation/components/Url/UrlManagement'
import Home from './pages/Home'
import SearchPage from './pages/SearchPage'
import ProfilePage from './pages/ProfilePage'

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