import React, { useState } from 'react';
import s from './SearchToVote.module.css';
import { useNavigate } from 'react-router-dom';
import { getMemberVote, sendVote, unvoteMember } from '../../services/operation/adminApi';

const SearchToVote = ({ setData }) => {
    const [data, setData2] = useState(null);
    const [loading, setloading] = useState(false);
    const [memberNo, setMemberNo] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const value = e.target.value;

        if (/^\d*$/.test(value)) {
            setMemberNo(value);
            setError('');
        }
    };

    const handleVoteClick = () => {
        const memberNumber = parseInt(memberNo, 10);

        // Validate input
        if (!memberNo || isNaN(memberNumber)) {
            setError('Please enter a valid member number.');
        } else if (memberNumber <= 0 || memberNumber >= 2000) {
            setError('Member number must be a positive integer less than 2000.');
        } else {
            //Proceed Further
            getMemberVote(memberNo, setData2, setloading)
        }
    };

    const validCallhandler = () =>{
        const memberNumber = parseInt(memberNo, 10);

        // Validate input
        if (!memberNo || isNaN(memberNumber)) {
            alert('Please enter a valid member number.');
            return false;
        } else if (memberNumber <= 0 || memberNumber >= 2000) {
            alert('Member number must be a positive integer less than 2000.');
            return false;
        } else if(memberNumber != data.memberNo){
            alert("Both MemberNo are Diffrent Find Again")
            return false;
        }
        return true;
    }

    const sendVoteHandler = () => {
        if(validCallhandler()){
            sendVote(memberNo, setloading, setData, setData2, setMemberNo);
        }
    }

    const unVoteHandler = () => {
        if(validCallhandler()){
            unvoteMember(memberNo, setloading, setData, setData2, setMemberNo);
        }
    }


    return (
        <div className={s.card}>
            <h2>Search and Vote</h2>
            <div className={s.searchContainer}>
                <div className={s.inputContainer}>
                    <label htmlFor="memberNo">
                        Enter Member No.
                    </label>
                    <input
                        id="memberNo"
                        type="text"
                        placeholder="Member No"
                        value={memberNo}
                        onChange={handleInputChange}
                    />
                    {error && <p className={s.error}>{error}</p>}
                    {loading ? (<button disabled>Loading...</button>) : (<button onClick={handleVoteClick}>Find</button>)}
                </div>

                <div className={s.btnContainer}>
                    {
                        loading ? (<>Loading..</>) : (
                            <>
                                {
                                    data == null ? (<>Find Member First</>) : (
                                        <>
                                            <div className={s.Mname}><p>Name:  {data.name}</p></div>
                                            <div className={s.buttonHolder}>
                                                <button onClick={() => navigate(`/admin/${memberNo}/edit`)}>Edit</button>
                                                {data.votted == 'y' ? (<button onClick={unVoteHandler}>Unvote</button>) : (<button onClick={sendVoteHandler}>Vote</button>)}
                                            </div>
                                        </>
                                    )
                                }
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default SearchToVote;
