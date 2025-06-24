import { Routes, Route } from 'react-router-dom'
import LoginForm from './presentation/components/LoginForm'
import Welcome from './presentation/components/Welcome'
import UserList from './presentation/components/user/UserList'
import Layout from './presentation/components/Layout'
import { Outlet } from 'react-router-dom';
import AuthPage from './presentation/components/LoginForm'
import RegisterPage from './presentation/components/RegisterForm'
import UrlManagement from './presentation/components/Url/UrlManagement'
import Home from './presentation/components/Home'

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


      </Route>
    </Routes>
  )
}

export default App