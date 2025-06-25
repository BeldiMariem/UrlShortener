import { Routes, Route } from 'react-router-dom'
import LoginForm from './presentation/components/Pages/LoginForm'
import Welcome from './presentation/components/Pages/Welcome'
import UserList from './presentation/components/user/UserList'
import Layout from './presentation/components/Pages/Layout'
import { Outlet } from 'react-router-dom';
import AuthPage from './presentation/components/Pages/LoginForm'
import RegisterPage from './presentation/components/Pages/RegisterForm'
import UrlManagement from './presentation/components/Url/UrlManagement'
import Home from './presentation/components/Pages/Home'
import SearchPage from './presentation/components/Pages/SearchPage'
import ProfilePage from './presentation/components/Pages/ProfilePage'

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