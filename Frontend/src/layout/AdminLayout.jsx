import React from 'react'
import { Outlet } from 'react-router-dom'
import s from './layout.module.css'
import Navbar from '../components/Navbar/Navbar'

const AdminLayout = () => {
  return (
    <div className={s.layoutConatiner}>
        <Navbar title={"Admin"} />
        <div className={s.outletConatienr}>
            <Outlet />
        </div>
    </div>
  )
}

export default AdminLayout