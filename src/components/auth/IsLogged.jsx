/* eslint-disable react/prop-types */

//IMPORTS
import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate } from "react-router-dom"

export default function IsLogged(props) {
    const {isLoggedIn} = useContext(AuthContext);
  return isLoggedIn ? (props.children) : <Navigate to="/auth/login"/>
}
