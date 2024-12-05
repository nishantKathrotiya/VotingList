import React from 'react'
import { LuLogOut } from "react-icons/lu";
import s from './Navbar.module.css'
const Navbar = ({title}) => {
  return (
    <div className={s.navbarConatienr}> 
       <h1>Welcome {title}</h1>
       <div className={s.logoutBtnConatainer}><button><LuLogOut/></button></div>
    </div>
  )
}

export default Navbar