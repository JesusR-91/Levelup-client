//IMPORTS
import { useNavigate, useParams} from "react-router-dom"
import { handleLikeValuationService, allValuationServices, handleDislikeValuationService, handleLoveValuationService, deleteValuationService } from "../services/valuation.services"
import { useContext, useEffect, useState } from "react";
import CreateValuation from "./CreateValuation";
import { AuthContext } from "../context/auth.context";


export default function ValuationsList() {

  //STATES
const [valuation, setValuations] = useState([])
const [isLoading, setIsLoading]= useState(true);
const [average, setAverage] = useState(0);
const [reload, setReload] = useState(false);

  //OTHER VARIABLE
const {activeUser} = useContext(AuthContext);
const {gameId} = useParams();

  //FUNCTIONS
const navigate = useNavigate()
const getData = async ()=>{
  try {
    const response = await allValuationServices(gameId)
    const allValuations = response.data;
    setIsLoading(true);
    setValuations(allValuations);
    setIsLoading(false);

    //making the average rating
    let  values  = 0;
    allValuations.forEach(val => (values += val.value));
    values = values /allValuations.length;
    setAverage(values)
  } catch (error) {
    console.log(error)
    navigate("/error")
  }
}

//REACTION HANDLERS
const handleLike = async (valId) => {
  try {
    await handleLikeValuationService(valId);
    setReload(!reload);
  } catch (error) {
    console.log(error);
    navigate("/error")
  }
};

const handleDislike = async (valId) => {
  try {
    await handleDislikeValuationService(valId);
    setReload(!reload);
  } catch (error) {
    console.log(error);
    navigate("/error")
  }
};

const handleLove = async (valId) => {
  try {
    await handleLoveValuationService(valId);
    setReload(!reload);
  } catch (error) {
    console.log(error);
    navigate("/error");
  }
};

//DELETE THE COMMENT
const handleValuation = async (valId) =>{
  try {
    await deleteValuationService(valId)
    setReload(!reload)
  } catch (error) {
    console.log(error);
    navigate("/error");
  }
}

useEffect(()=>{
  getData()
}, [reload])


  return !isLoading ? (
    <div>

      <CreateValuation getData={getData}/>

      <h4>Valuation List - Average: { "★".repeat(Math.floor(average))}{"☆".repeat(5 - Math.floor(average))} </h4>
  {valuation.map((eachValue)=>(
    <div key={eachValue._id}>
      <h5>{eachValue.owner.username} - { "★".repeat(Math.floor(eachValue.value))}{"☆".repeat(5 - Math.floor(eachValue.value))}</h5>
      <p>{eachValue.content}</p>
      <p>{eachValue.updateAt}</p>
      <div>
        {eachValue.likes.length > 0 && (eachValue.likes.length > 1 ? (<p>{eachValue.likes.length} Likes</p>): (<p>{eachValue.likes.length} Like</p>))}
        {eachValue.loves.length > 0 &&  (eachValue.loves.length > 1 ? (<p>{eachValue.loves.length} Likes</p>): (<p>{eachValue.loves.length} Love</p>))}
        {eachValue.dislikes.length > 0 && (eachValue.dislikes.length > 1 ? (<p>{eachValue.dislikes.length} Likes</p>): (<p>{eachValue.dislikes.length} Dislikes</p>))}
      </div>
      <div>
        <button style={{width:"10px", height:"20px", display:"flex", alignItems:"center", justifyContent: "center"}} onClick={() =>{handleLike(eachValue._id)}}><img src="../../public/icons8-zombie-hand-thumbs-up-100.png" alt="thumbUp" width={"20px"}/></button> 
        <button style={{width:"10px", height:"20px", display:"flex", alignItems:"center", justifyContent: "center"}} onClick={() =>{handleLove(eachValue._id)}}><img src="../../public/icons8-pixel-heart-white.png" alt="thumbUp" width={"20px"}/></button>
        <button style={{width:"10px", height:"20px", display:"flex", alignItems:"center", justifyContent: "center"}} onClick={() =>{handleDislike(eachValue._id)}}><img src="../../public/icons8-zombie-hand-thumbs-dow-100.png" alt="thumbUp" width={"20px"}/></button> 
      </div>
      {(eachValue.owner._id === activeUser._id) && (<button onClick={()=>{handleValuation(eachValue._id)}}>Delete valuation</button>)}
    </div>
  ))}
  
    </div>
  ) : <h3>Loading...</h3>
}
