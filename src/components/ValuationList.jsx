import { useNavigate} from "react-router-dom"
import { allValuationServices } from "../services/valuation.services"
import { useEffect, useState } from "react"
import CreateValuation from "./CreateValuation"
export default function ValuationsList() {
const [valuation, setValuations] = useState([])
const [isLoading, setIsLoading]= useState(true);
const [average, setAverage] = useState(0)


const navigate = useNavigate()
const getData = async ()=>{
  try {
    const response = await allValuationServices()
    const allValuations = response.data;
    setValuations(allValuations)
    setIsLoading(false)
    let  values  = 0;
    allValuations.forEach(val => (values += val.value));
    values = values /allValuations.length
    setAverage(values)
  } catch (error) {
    console.log(error)
    navigate("/error")
  }
}


useEffect(()=>{
  getData()
}, [])


  return !isLoading ? (
    <div>
      <CreateValuation/>
      <h4>Valuation List - Average: { "★".repeat(Math.floor(average))}{"☆".repeat(5 - Math.floor(average))} </h4>
  {valuation.map((eachValue)=>(
    <div key={eachValue._id}>
      <h5>{eachValue.owner.username} - { "★".repeat(Math.floor(eachValue.value))}{"☆".repeat(5 - Math.floor(eachValue.value))}</h5>
      <p>{eachValue.content}</p>
      <p>{eachValue.updateAt}</p>
    </div>
  ))}
  
    </div>
  ) : <h3>Loading...</h3>
}
