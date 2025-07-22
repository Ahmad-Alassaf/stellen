import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children,allowedRoles}) => {
    const {user}=useSelector((state)=>state.auth)
    if(user)
    {
        if(allowedRoles.includes(user.role))
        {
            return children
        }
        else
        return <Navigate to="/accessdenied " />

    }
    else{
        return <Navigate to="/login"></Navigate>
    }
 
}

export default ProtectedRoute
