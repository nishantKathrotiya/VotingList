import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import List from './pages/List/List.jsx'
import Login from './pages/Login/Login.jsx'
import Signup from './pages/Signup/Signup.jsx'
import UserLayout from './layout/UserLayout.jsx'
import OpenRoute from './components/OpenRoute.jsx'
import AdminLayout from './layout/AdminLayout.jsx'
import LostPage from './pages/LostPage/LostPage.jsx'
import PrivateRoute from './components/PrivteRoute.jsx'
import MemberUpdate from './pages/MemberUpdate/MemberUpdate.jsx'
import UserDashboard from './pages/UserDashboard/UserDashboard.jsx'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard.jsx'

function App() {
  const {role,token} = useSelector((state)=>state.profile);
 
  return (
    <>
      <Routes>
        <Route path="/" element={<OpenRoute><Login /></OpenRoute>} />
        <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>} />


          <Route path="/admin" element={<PrivateRoute id="admin"><AdminLayout /></PrivateRoute>}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/list" element={<List id={"admin"} />} />
            <Route path="/admin/:memberNo/edit" element={<MemberUpdate />} />
        </Route>



          <Route path="/user" element={<PrivateRoute id="user"><UserLayout /></PrivateRoute>}>
            <Route path="/user" element={<UserDashboard />} />
          </Route>


      
        <Route path="*" element={<LostPage />} />
      </Routes>
    </>
  )
}

export default App
