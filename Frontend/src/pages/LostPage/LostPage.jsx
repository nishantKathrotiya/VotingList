import React from 'react'
import s from './LostPage.module.css'
import { Link } from 'react-router-dom'

const LostPage = () => {
    return (
        <div className={s.mainConatiner}>
           <div className={s.innerBox}>
                <h1>Opps You Lost!!</h1>
                <Link to="/" className={s.linkBtn}>Show me Way</Link>
           </div>
        </div>
    )
}

export default LostPage
