import React from 'react'
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import './Dataview.css'
const Dataview = ({entry}) => {
  return (
    <div className='rowdata'>
                    <span className='titlelable'>{entry.memberNo}</span>
                    <span className='titlelable'>{entry.name}</span>
                    <span className='titlelable '>{entry.address}</span>
                    <span className='titlelable '>{entry.mobileNo ? (entry.mobileNo) : (<>-</>)}</span>
                    <span className='titlelable lastLine'>{entry.votted.toUpperCase()}</span>
                    <span className='titlelable lastLine'><Link to={`/admin/${entry.memberNo}/edit`}>Edit</Link> </span>
                </div>
  )
}

export default Dataview