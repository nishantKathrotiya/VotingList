import React from 'react'
import { Outlet } from 'react-router-dom'
import s from './layout.module.css'
import Navbar from '../components/Navbar/Navbar'
const UserLayout = () => {
  return (
    <div className={s.layoutConatiner}>
        <Navbar title={"User"} />
        <div className={s.outletConatienr}>
            <Outlet />
        </div>
    </div>
  )
}

export default UserLayout