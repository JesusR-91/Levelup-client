/* eslint-disable react/prop-types */

//IMPORTS
import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate } from "react-router-dom"

export default function IsAdmin(props) {

  //VARIABLES

  const {isAdmin} = useContext(AuthContext)

  return isAdmin ? (props.children) : <Navigate to="/"/>
}
