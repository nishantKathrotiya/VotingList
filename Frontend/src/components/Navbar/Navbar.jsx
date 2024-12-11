import React from 'react'
import { LuLogOut } from "react-icons/lu";
import { AiOutlineDashboard } from "react-icons/ai";
import s from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/operation/authApi';
import { useDispatch } from 'react-redux';
const Navbar = ({ title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={s.navbarConatienr}>
      <Link to={`/${title.toLowerCase()}`} className={s.linkFix}><h1>Welcome {title}</h1></Link>
      <div className={s.logoutBtnConatainer}><Link className={s.linkBtn}  to={`/${title.toLowerCase()}`}><AiOutlineDashboard /></Link>  <button className={s.linkBtn} onClick={()=>dispatch(logout(navigate))}><LuLogOut /></button></div>
    </div>
  )
}

export default Navbar