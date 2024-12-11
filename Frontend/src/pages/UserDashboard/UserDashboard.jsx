import React, { useEffect, useState } from 'react'
import { getStats } from '../../services/operation/adminApi';
import { Outlet } from 'react-router-dom'
import List from '../List/List';
import s from './UserDashboard.module.css'
import Cookies from 'js-cookie'

const UserDashboard = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
  
    useEffect(() => {
      getStats(setData, setLoading)
    }, [])


  return (
    <div>
        <div className={s.adminDashContainer}>
        {
          loading ? (
            <div className={s.loading}>
              Loading ...
            </div>
          ) : (
            <>
              {
                data == null ? (<>Data Not Found</>) : (
                  <>
                    <div className={s.cardContainer}>

                      <div className={s.card}>
                        <h2>Current Statistics</h2>
                        <p className={s.cardText}>
                          <div className={s.personlText}>A : {data.data.a} / {data.totalMembers.a}</div>
                          <div className={s.personlText}>B : {data.data.b}  / {data.totalMembers.b}</div>
                          <div className={s.personlText}>C : {data.data.c}   / {data.totalMembers.c}</div>
                        </p>
                      </div>



                      <div className={s.card}>
                        <h2>Total Votings</h2>
                        <p className={s.cardText}>
                          <div className={s.personlText}>Total Members : {data.pollDetails.totalMembers}</div>
                          <div className={s.personlText}>No. of Members Voted : {data.data.a + data.data.b + data.data.c} </div>
                          <div className={s.personlText}>No. of Members Remaining : {data.pollDetails.totalMembers - data.data.a - data.data.b - data.data.c}  </div>
                        </p>

                      </div>
                    </div>
                  </>
                )
              }
            </>
          )
        }
      </div>
      <List id="user"></List>
    </div>
  )
}

export default UserDashboard