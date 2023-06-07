/* eslint-disable react/prop-types */

import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate } from "react-router-dom"

export default function IsLogged(props) {
    const {isLoggedIn} = useContext(AuthContext)
    console.log("ïsLogged", isLoggedIn)

  return isLoggedIn ? (props.children) : <Navigate to="/auth/login"/>
}
