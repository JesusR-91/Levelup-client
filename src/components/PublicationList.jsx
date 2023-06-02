import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { allPublications, friendsPublication} from "../services/publications.services.js"

export default function PublicationList() {
  const [publ, setPubli] = useState([])
  const [isFetching, setIsFetching] = useState(true)
  const navigate = useNavigate()
  console.log(publ)
  const getData = async ()=>{
    try {
      const allResponse = await allPublications()
      const friendResponse = await friendsPublication()
      setPubli([...allResponse.data, ...friendResponse.data])
      setIsFetching(false)
    } catch (error) {
      console.log(error)
      navigate("/error")
  }
}
console.log (publ)
useEffect(()=>{
  getData()
}, [])

return isFetching !== true ? (
  <div>
  {publ.map((eachPubl)=>{
    <div key={eachPubl._id}>
<h4>{eachPubl.owner} - </h4><span>{eachPubl.timestamps}</span>
<p>{eachPubl.content}</p>
    </div>
  })}
  </div>
):(
  <h4>Loading</h4>
)
}
