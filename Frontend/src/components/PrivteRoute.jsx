import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({children,id}) => {

    const {token,role} = useSelector((state) => state.profile);

    if(token !== null && role == id)
        return children
    else
        return <Navigate to="/" />
  
}

export default PrivateRoute