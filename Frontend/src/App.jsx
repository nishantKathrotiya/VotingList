import { Route, Routes } from 'react-router-dom'
import List from './pages/List/List.jsx'
import MemberUpdate from './pages/MemberUpdate/MemberUpdate.jsx'
import AdminLayout from './layout/AdminLayout.jsx'
import UserLayout from './layout/UserLayout.jsx'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard.jsx'
import UserDashboard from './pages/UserDashboard/UserDashboard.jsx'
import Login from './pages/Login/Login.jsx'
import Signup from './pages/Signup/Signup.jsx'
function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Login /> }/>
        <Route path="/signup" element={<Signup /> }/>
        <Route path="/admin" element={<AdminLayout/> }>
          <Route path="/admin" element={<AdminDashboard /> }/>
          <Route path="/admin/list" element={<List  id={"admin"} /> } />
          <Route path="/admin/:memberNo/edit" element={<MemberUpdate /> } />
        </Route>

        <Route path="/user" element={<UserLayout /> }>
          <Route path="/user" element={<UserDashboard /> } />
        </Route>
      
      </Routes>
    </>
  )
}

export default App
