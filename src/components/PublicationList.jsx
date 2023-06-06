/* eslint-disable react/prop-types */

//IMPORTS
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  allPublicationsService,
  friendsPublicationService,
  handleDislikePublicationService,
  handleLikePublicationService,
  handleLovePublicationService,
} from "../services/publications.services.js";
import CreatePublication from "./CreatePublication.jsx";

export default function PublicationList({setReload}) {
  
  //STATE
  const [publication, setPublication] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  //FUNCTION
  const getData = async () => {
    try {
      const allResponse = await allPublicationsService();
      const friendResponse = await friendsPublicationService();

      const publicationUpdated = [...allResponse.data, ...friendResponse.data];
      publicationUpdated.forEach((publication) => {
        const publicationDate = publication.createdAt;
        publication.createdAt = new Date(publicationDate).toTimeString().slice(0,8) + " - " + new Date(publicationDate).toDateString();
      });
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
      setReload(currentValue => {!currentValue});
    } catch (error) {
      console.log(error);
      navigate("/error")
    }
  };
  
  const handleDislike = async (valId) => {
    try {
      await handleDislikePublicationService(valId);
      setReload(currentValue => {!currentValue});
    } catch (error) {
      console.log(error);
      navigate("/error")
    }
  };
  
  const handleLove = async (valId) => {
    try {
      await handleLovePublicationService(valId);
      setReload(currentValue => {!currentValue});
    } catch (error) {
      console.log(error);
      navigate("/error")
    }
  }


  useEffect(() => {
    console.log(publication.length)
    getData();
  }, []);

  return !isLoading ? (
    <div>
      <CreatePublication setReload = {setReload}/>
      {publication.length > 0 ? (
      <div>
      <h4>All publications:</h4>
      {publication.map(eachPubl => (
        <div key={eachPubl._id}>
          <h4>{eachPubl.owner.username} - <span>{eachPubl.createdAt}</span></h4>
          <p>{eachPubl.content}</p>
          <div>
            <button style={{width:"10px", height:"20px", display:"flex", alignItems:"center", justifyContent: "center"}} onClick={() =>{handleLike(eachPubl._id)}}><img src="../../public/icons8-zombie-hand-thumbs-up-100.png" alt="thumbUp" width={"20px"}/></button> 
            <button style={{width:"10px", height:"20px", display:"flex", alignItems:"center", justifyContent: "center"}} onClick={() =>{handleDislike(eachPubl._id)}}><img src="../../public/icons8-zombie-hand-thumbs-dow-100.png" alt="thumbUp" width={"20px"}/></button> 
            <button style={{width:"10px", height:"20px", display:"flex", alignItems:"center", justifyContent: "center"}} onClick={() =>{handleLove(eachPubl._id)}}><img src="../../public/icons8-pixel-heart-white.png" alt="thumbUp" width={"20px"}/></button>
          </div>
        </div>
      ))}
      </div>
        
      ): (<p>No publications</p>)}
    </div>
  ) : (<h4>Loading</h4>);
}
