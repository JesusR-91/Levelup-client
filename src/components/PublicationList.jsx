/* eslint-disable react/prop-types */

//IMPORTS
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  allPublicationsService,
  deletePublicationService,
  friendsPublicationService,
  handleDislikePublicationService,
  handleLikePublicationService,
  handleLovePublicationService,
} from "../services/publications.services.js";
import CreatePublication from "./CreatePublication.jsx";
import likeImg from "../assets/icons8-zombie-hand-thumbs-up-100.png";
import dislikeImg from "../assets/icons8-zombie-hand-thumbs-dow-100.png";
import loveImg from "../assets/icons8-pixel-heart-white.png";
import {PuffLoader} from "react-spinners";
import { Button, Card, CardGroup  } from "react-bootstrap";
import { AuthContext } from "../context/auth.context.jsx";

export default function PublicationList() {
  
  //STATE
  const [publication, setPublication] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();
  const {activeUser} = useContext(AuthContext)

  //FUNCTION
  const getData = async () => {
    try {
      setIsLoading(true);
      const allResponse = await allPublicationsService();
      const friendResponse = await friendsPublicationService();
      const publicationUpdated = [...allResponse.data, ...friendResponse.data];
      setPublication(publicationUpdated);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleLike = async (valId) => {
    try {
      await handleLikePublicationService(valId);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      navigate("/error")
    }
  };
  
  const handleDislike = async (valId) => {
    try {
      await handleDislikePublicationService(valId);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      navigate("/error")
    }
  };
  
  const handleLove = async (valId) => {
    try {
      await handleLovePublicationService(valId);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      navigate("/error")
    }
  }

  //DELETE THE COMMENT
  const handlePublication = async (valId) =>{
    try {
      await deletePublicationService(valId)
      setReload(!reload)
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
}

  useEffect(() => {
    getData();
  }, [reload]);

  return !isLoading ? (
    <div>
    <div style={{padding:"2vh"}}><CreatePublication getData = {getData}/></div>
      {publication.length > 0 ? (
      <div style={{padding:"2vh"}}>
      <h4>All publications:</h4>
        <CardGroup style={{display:"flex", flexWrap:"wrap", gap:"5vh", padding:"2vh"}}>
          {publication.map(eachPubl => (
            <Card key={eachPubl._id} style={{backgroundColor:"lightgrey", padding:"2vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
              <h5>{eachPubl.owner.username} - <span>{eachPubl.createdAt}</span></h5>
              <p>{eachPubl.content}</p>
              <div>
                {eachPubl.likes.length > 0 && (eachPubl.likes.length > 1 ? (<p>{eachPubl.likes.length} Likes</p>): (<p>{eachPubl.likes.length} Like</p>))}
                {eachPubl.loves.length > 0 &&  (eachPubl.loves.length > 1 ? (<p>{eachPubl.loves.length} Likes</p>): (<p>{eachPubl.loves.length} Love</p>))}
                {eachPubl.dislikes.length > 0 && (eachPubl.dislikes.length > 1 ? (<p>{eachPubl.dislikes.length} Likes</p>): (<p>{eachPubl.dislikes.length} Dislikes</p>))}
              </div>
              <div style={{display:"flex", justifyContent:"center", gap:"2vh", padding:"2vh"}}>
                <Button style={{width:"10px", height:"20px", display:"flex", alignItems:"center", justifyContent: "center"}} onClick={() =>{handleLike(eachPubl._id)}}><img src={likeImg} alt="thumbUp" width={"20px"}/></Button> 
                <Button style={{width:"10px", height:"20px", display:"flex", alignItems:"center", justifyContent: "center"}} onClick={() =>{handleDislike(eachPubl._id)}}><img src={dislikeImg} alt="thumbUp" width={"20px"}/></Button> 
                <Button style={{width:"10px", height:"20px", display:"flex", alignItems:"center", justifyContent: "center"}} onClick={() =>{handleLove(eachPubl._id)}}><img src={loveImg} alt="thumbUp" width={"20px"}/></Button>
              </div>
              {(eachPubl.owner._id === activeUser._id) && (<button onClick={()=>{handlePublication(eachPubl._id)}}>Delete valuation</button>)}
            </Card>
          ))}
        </CardGroup>
      </div>
        
      ): (<p>No publications</p>)}
    </div>
  ) : (<div className="spinners"><PuffLoader color="white" size={120}/></div>);
}
