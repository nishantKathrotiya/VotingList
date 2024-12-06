import React from 'react'
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import './Dataview.css';

const UserDataView = ({entry}) => {
  return (
    <div className='rowdata'>
                    <span className='titlelable'>{entry.memberNo}</span>
                    <span className='titlelable'>{entry.name}</span>
                    <span className='titlelable '>{entry.address}</span>
                    <span className='titlelable lastLine'>{entry.currentPollVote.toUpperCase()}</span>
                </div>
  )
}


export default UserDataView