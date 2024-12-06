import React, { useEffect, useState } from 'react'
import s from './AdminDashboard.module.css'
import { getStats ,startNewPoll } from '../../services/operation/adminApi';
import {Link} from 'react-router-dom'
const AdminDashboard = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    getStats(setData, setLoading)
  }, [])

  const newPollHandler = (e)=>{
    e.preventDefault();
    const userConsent = window.confirm(`Are you sure you want start new poll?`);
    if(userConsent){
      startNewPoll(setData,setLoading)
    }
  }

  return (
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
                        <div className={s.personlText}>A : {data.data.a} / {data.pollDetails.totalMembers}</div>
                        <div className={s.personlText}>B : {data.data.b}  / {data.pollDetails.totalMembers}</div>
                        <div className={s.personlText}>C : {data.data.c}   / {data.pollDetails.totalMembers}</div>
                      </p>
                    </div>

                    <div className={s.card}>
                      <div className={s.pollDiv}>
                        <h2>Current Poll</h2>
                        <Link to='/admin/allpolls' className={s.LinkFix}><h4>See All Poll results</h4></Link>
                      </div>
                      <p className={s.cardText}>Current Poll : {data.pollDetails.currentPoll} <button onClick={(e)=>newPollHandler(e)}>Start New Poll</button></p>

                    </div>

                    <div className={s.card}>
                      <h2>Total Votings</h2>
                      <p className={s.cardText}>
                        <div className={s.personlText}>Total Members : {data.pollDetails.totalMembers}</div>
                        <div className={s.personlText}>No. of Members Voted : {data.pollDetails.totalMembers - data.data.n} </div>
                        <div className={s.personlText}>No. of Members Remaining : {data.data.n}  </div>
                      </p>

                    </div>

                    <div className={s.card}>
                      <h2>Members</h2>
                      <Link to="/admin/list"><p className={s.cardText}>Tap To See the List & Edit</p></Link>
                    </div>
                  </div>
                </>
              )
            }
          </>
        )
      }
    </div>
  )
}

export default AdminDashboard