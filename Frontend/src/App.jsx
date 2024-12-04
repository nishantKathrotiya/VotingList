import { Route, Routes } from 'react-router-dom'
import List from './pages/List/List.jsx'
import MemberUpdate from './pages/MemberUpdate/MemberUpdate.jsx'

function App() {
  

  return (
    <>
      <Routes>

        <Route path='/login' element={<h1 style={{ fontFamily: 'Noto Sans Gujarati, sans-serif' }}>
          આ મેસેજ ગુજરાતી ભાષામાં છે
        </h1>} />

        <Route path='/signup' element={<h1>Hello</h1>} />

        <Route path="/list" element={<List /> } />
        <Route path="/list/:memberNo/edit" element={<MemberUpdate /> } />

      </Routes>
    </>
  )
}

export default App
