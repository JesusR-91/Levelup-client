/* eslint-disable react/prop-types */

import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate } from "react-router-dom"

export default function IsAdmin(props) {
    const {isAdmin} = useContext(AuthContext)

  return isAdmin ? (props.children) : <Navigate to="/"/>
}
