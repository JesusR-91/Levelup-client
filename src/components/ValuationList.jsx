import { useNavigate, useParams } from "react-router-dom"
import { allValuationServices } from "../services/valuation.services"
import { useEffect, useState } from "react"
export default function ValuationsList() {
const [valuation, setValuations] = useState([])
const [isLoading, setIsLoading]= useState(true)
const navigate = useNavigate()
const getData = async ()=>{
  try {
    const allValuations = await allValuationServices()
    setValuations(allValuations.data)
    setIsLoading(false)
  } catch (error) {
    console.log(error)
    navigate("/error")
  }
}
useEffect(()=>{
  getData()
}, [])


  return (
    <div><h4>Valoration List</h4>
  {valuation.map((eachValue)=>{
    <div>
    <h5>{eachValue.owner} - {eachValue.value}</h5>
    <p>{eachValue.content}</p>
    <p>{eachValue.updateAt}</p>
    </div>
  })}
    </div>
  )
}
