import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBaseUserListByMemberNo,baseUserUpdate } from '../../services/operation/baseUser';
import s from './Member.module.css';
import { IoIosInformationCircleOutline , IoIosReturnLeft ,IoIosArrowDropleft } from "react-icons/io";

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
        pannel: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        address: '',
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

        console.log('Updated Member Data:', data);
        baseUserUpdate(memberNo,data,setData,setLoading)
        
    };

    return (
        <div className={s.updateConatiner}>
            <h1 className={s.upperlable}><span className={s.backBtn} onClick={()=>navigate(-1)}> <IoIosArrowDropleft /> </span>Member Number : {memberNo}</h1>
            <form className={s.innerConatienr} onSubmit={handleSubmit}>

                {loading ? (
                    <div className={s.loadingConatienr}>Loading...</div>
                ) : (
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
                                <label htmlFor="pannel">Pannel: </label>
                                <input
                                    type="text"
                                    id="pannel"
                                    name="pannel"
                                    value={data.pannel}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
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
