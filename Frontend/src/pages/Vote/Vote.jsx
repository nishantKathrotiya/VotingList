import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import s from './Vote.module.css';
import { FaArrowLeft } from "react-icons/fa";
import { getMemberVote, sendVote , unvoteMember } from '../../services/operation/adminApi';
const Vote = () => {

    const [loading,setLoading] = useState(false);
    const [data,setData] = useState({
        name: '', 
        address: '',  
        feeRecipt:  0, 
        mobileNo: '0000000000', 
        ref: '',  
        pannel:'',
        currentPollVote:'n'
    });
    const {memberNo} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
            getMemberVote(memberNo,setData,setLoading)
    },[])

    const votehandler = (e, vote)=>{
        e.preventDefault();
        if(data.currentPollVote != 'n'){
            alert("Unvote First");
            return;
        }
        const userConsent = window.confirm(`Are you sure you want to vote for ${vote}?`);
        if(userConsent){
            sendVote(memberNo,vote,setLoading,setData)
        }
    }

    const unvoteHandler = (e)=>{
        e.preventDefault();
        if(data.currentPollVote == 'n'){
            alert("vote First");
            return;
        }
        const userConsent = window.confirm(`Are you sure you want to unvote?`);
        if(userConsent){
            //Unvote Function Call
            unvoteMember(memberNo,setLoading,setData);
        }
    }

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
                            (data==null)?(<>Data Not Found</>) : (
                                <>
                                    <div className={s.test}>
                                        <h3>Name : {data.name} </h3>
                                        <h3>Address : {data.address} </h3>
                                        <h3>Mobile No : {data.mobileNo} </h3>
                                        <h3>Fees recipt No. : {data.feeRecipt} </h3>
                                        <h3>pannel : {data.pannel} </h3>
                                    </div>

                                    <div className={`${s.test} ${s.flex}`}>
                                        <button className={data.currentPollVote == 'a' ? ( s.active ) : ('')} onClick={(e)=>votehandler(e,'a')}>Vote A</button>
                                        <button className={data.currentPollVote == 'b' ? ( s.active ) : ('')} onClick={(e)=>votehandler(e,'b')}>Vote B</button>
                                        <button className={data.currentPollVote == 'c' ? ( s.active ) : ('')} onClick={(e)=>votehandler(e,'c')}>Vote C</button>
                                    </div>
                                </>
                            )
                        }
                    </>
                )}
            </form>
            <div className={s.btnContaienr}>
                {loading ? (
                    <button disabled="true">Loading...</button>
                ) : (
                    <button type="submit" disabled={data.currentPollVote == 'n' ? ( true ) : (false)} onClick={(e)=>unvoteHandler(e)}>UnVote</button>
                )}
            </div>
        </div>
  )
}

export default Vote