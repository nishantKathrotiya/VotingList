import React, { useEffect, useState } from 'react'
import { getStats } from '../services/operation/adminApi';

import { Outlet } from 'react-router-dom'
import s from './layout.module.css'
import Navbar from '../components/Navbar/Navbar';

const UserLayout = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    getStats(setData, setLoading)
  }, [])


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