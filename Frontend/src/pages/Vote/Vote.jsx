import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { getCoo } from '../../services/operation/adminApi'
const Vote = () => {

    const getHandler = (e)=>{
        e.preventDefault();
        getCoo()
    }

    const printhandler = (e)=>{
        e.preventDefault();
        const userCookie = Cookies.get();
        console.log(userCookie)
    }


    return (
        <div >
            <button onClick={(e)=>getHandler(e)}>Click To get Cookies</button>
            <button onClick={(e)=>printhandler(e)}>Click to print</button>
        </div>
    )
}

export default Vote