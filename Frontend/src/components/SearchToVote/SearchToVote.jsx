import React, { useState } from 'react';
import s from './SearchToVote.module.css';
import { useNavigate } from 'react-router-dom';

const SearchToVote = () => {
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
            navigate(`/admin/${memberNumber}/vote`)
        }
    };

    return (
        <div className={s.card}>
            <h2>Search and Vote</h2>
            <div className={s.searchConatiner}>
                <div className={s.inputContiner}>
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
                    <button onClick={handleVoteClick}>Vote</button>
                </div>
            </div>
        </div>
    );
};

export default SearchToVote;
