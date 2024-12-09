import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBaseUserListByMemberNo, baseUserUpdate } from '../../services/operation/baseUser';
import s from './Member.module.css';
import { FaArrowLeft } from "react-icons/fa";

const MemberUpdate = () => {
    const [loading, setLoading] = useState(false);
    const { memberNo } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        address: '',
        feeRecipt: 0,
        mobileNo: '000000000',
        ref: '',
        party: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        address: '',
        party: '',
    });

    // Fetch initial data
    useEffect(() => {
        getBaseUserListByMemberNo(memberNo, setData, setLoading);
    }, [memberNo]);

    // Form handler for inputs
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validation logic
        if (name === 'name' && value.trim() === '') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: 'Name is required.',
            }));
        } else if (name === 'name') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: '',
            }));
        }

        if (name === 'address' && value.trim() === '') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                address: 'Address is required.',
            }));
        } else if (name === 'address') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                address: '',
            }));
        }

        if (name === 'party') {
            if (!['a', 'b', 'c'].includes(value.trim().toLowerCase())) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    party: 'Pannel must be either "a", "b", or "c".',
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    party: '',
                }));
            }
        }

        // Update state
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Final validation before submission
        if (!data.name.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: 'Name is required.',
            }));
            return;
        }

        if (!data.address.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                address: 'Address is required.',
            }));
            return;
        }

        if (!data.party.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                party: 'Pannel is required.',
            }));
            return;
        }


        if (!['a', 'b', 'c'].includes(data.party.trim().toLowerCase())) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                party: 'Pannel must be either "a", "b", or "c".',
            }));
            return;
        }

        console.log('Updated Member Data:', data);
        baseUserUpdate(memberNo, data, setData, setLoading)

    };

    return (
        <div className={s.updateConatiner}>

            <div className={s.upperTitle}>
                <h1 className={s.backArrow} onClick={() => navigate(-1)}><FaArrowLeft /></h1>
                <h1 className={s.text}>Member No : {memberNo}</h1>
            </div>

            <form className={s.innerConatienr} onSubmit={handleSubmit}>

                {loading ? (
                    <div className={s.loadingConatienr}>Loading...</div>
                ) : (
                    <>
                        {
                            (data.name === '' && data.address === '' && data.feeRecipt === 0 && data.mobileNo === '000000000' && data.ref === '' && data.pannel === '') ? (<div className={s.loadingConatienr}>Network Error</div>) : (
                                <>
                                    <div className={s.test}>
                                        <div className={s.inputContaienr}>
                                            <label htmlFor="name">Name: </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={data.name}
                                                onChange={handleChange}
                                            />
                                            {errors.name && <p className={s.error}>{errors.name}</p>}
                                        </div>

                                        <div className={s.inputContaienr}>
                                            <label htmlFor="address">Address: </label>
                                            <textarea
                                                id="address"
                                                name="address"
                                                value={data.address}
                                                onChange={handleChange}
                                            ></textarea>
                                            {errors.address && <p className={s.error}>{errors.address}</p>}
                                        </div>

                                        <div className={s.inputContaienr}>
                                            <label htmlFor="mobileNo">Mobile No.: </label>
                                            <input
                                                type="text"
                                                id="mobileNo"
                                                name="mobileNo"
                                                value={data.mobileNo}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className={s.test}>
                                        <div className={s.inputContaienr}>
                                            <label htmlFor="feeRecipt">Fee Recipt: </label>
                                            <input
                                                type="number"
                                                id="feeRecipt"
                                                name="feeRecipt"
                                                value={data.feeRecipt}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className={s.inputContaienr}>
                                            <label htmlFor="ref">Ref: </label>
                                            <input
                                                type="text"
                                                id="ref"
                                                name="ref"
                                                value={data.ref}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className={s.inputContaienr}>
                                            <label htmlFor="party">Pannel: </label>
                                            <input
                                                type="text"
                                                id="party"
                                                name="party"
                                                value={data.party}
                                                onChange={handleChange}
                                            />
                                            {errors.party && <p className={s.error}>{errors.party}</p>}
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </>
                )}
            </form>
            <div className={s.btnContaienr}>
                {loading ? (
                    <button disabled>Update</button>
                ) : (
                    <button type="submit" onClick={handleSubmit}>Update</button>
                )}
            </div>
        </div>
    );
};

export default MemberUpdate;
