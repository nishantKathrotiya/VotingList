import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import s from './Vote.module.css';
import { FaArrowLeft } from "react-icons/fa";
const Vote = () => {

    const [loading,setLoading] = useState(false);
    const [data,setData] = useState(null)
    const {memberNo} = useParams()
    const navigate = useNavigate()

  return (
    <div className={s.updateConatiner}>

            <div className={s.upperTitle}>
                <h1 className={s.backArrow} onClick={() => navigate(-1)}><FaArrowLeft /></h1>
                <h1 className={s.text}>Member No : {memberNo}</h1>
            </div>

            <form className={s.innerConatienr} >

                {loading ? (
                    <div className={s.loadingConatienr}>Loading...</div>
                ) : (
                    <>
                        {
                            (data!=null)?(<>Data Not Found</>) : (
                                <>
                                    <div className={s.test}>
                                        <h3>Name : Nisant </h3>
                                        <h3>Address : Nisant </h3>
                                        <h3>Mobile No : Nisant </h3>cls
                                        <h3>Fees recipt No. : Nisant </h3>
                                        <h3>pannel : Nisant </h3>
                                    </div>

                                    <div className={`${s.test} ${s.flex}`}>
                                        <button className={s.active}>Vote A</button>
                                        <button>Vote B</button>
                                        <button>Vote C</button>
                                    </div>
                                </>
                            )
                        }
                    </>
                )}
            </form>
            <div className={s.btnContaienr}>
                {loading ? (
                    <button disabled>UnVote</button>
                ) : (
                    <button type="submit">UnVote</button>
                )}
            </div>
        </div>
  )
}

export default Vote