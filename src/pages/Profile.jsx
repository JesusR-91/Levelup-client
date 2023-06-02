import{useState, useEffect} from "react"
import { userInfo} from "../services/user.services"
import { allPublications } from "../services/publications.services"
import { useNavigate, Link } from "react-router-dom"
export default function Profile() {
  const [profile, setProfile]=useState(null)
  const [publ, setPubl]=useState([])
  const navigate = useNavigate()
  const getData = async ()=>{
    try {
    const allProfile = await userInfo()
    const allPubl = await allPublications()

    setIsFetching(false)
  } catch (error) {
    console.log(error)
    navigate("/error")
  }
  
  
  
}

  return (
    <div>Profile</div>
  )
}
