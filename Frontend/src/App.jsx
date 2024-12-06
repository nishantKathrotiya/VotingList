import { Route, Routes } from 'react-router-dom'
import List from './pages/List/List.jsx'
import MemberUpdate from './pages/MemberUpdate/MemberUpdate.jsx'
import AdminLayout from './layout/AdminLayout.jsx'
import UserLayout from './layout/UserLayout.jsx'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard.jsx'
import Vote from './pages/Vote/Vote.jsx'
function App() {
  

  return (
    <>
      <Routes>

        <Route path='/login' element={<h1 style={{ fontFamily: 'Noto Sans Gujarati, sans-serif' }}>
          આ મેસેજ ગુજરાતી ભાષામાં છે
        </h1>} />

        <Route path='/signup' element={<h1>Hello</h1>} />

        

        <Route path="/admin" element={<AdminLayout/> }>
          <Route path="/admin" element={<AdminDashboard /> }/>
          <Route path="/admin/list" element={<List  id={"admin"} /> } />
          <Route path="/admin/:memberNo/edit" element={<MemberUpdate /> } />
          <Route path="/admin/:memberNo/vote" element={<Vote /> } />
          <Route path="/admin/allpolls" element={<h1>Coming Soon..</h1> } />
        </Route>


        <Route path="/user" element={<UserLayout /> }>
          <Route path="/user" element={<List id={"user"} /> } />
        </Route>

      </Routes>
    </>
  )
}

export default App
