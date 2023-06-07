/* eslint-disable react/prop-types */

//IMPORTS
import { useState } from "react"
import {newPublicationService} from "../services/publications.services"
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";


export default function CreatePublication({getData}) {
  //STATES
  const [content ,setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  //FUNCTIONS
  const handleContentInput = ({target}) => {setContent(target.value)}
  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      await newPublicationService(content);
      getData();
      setContent("");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
      
    }
  }
  return !isLoading ? (
    <div style={{padding:"5vh"}}>
      <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"row", justifyContent:"center", gap:"2vh"}}>
        <div>
          <input type="textarea" name="content" onChange={handleContentInput} value={content} placeholder="What are you thinking about?" style={{width:"50vw", height:"6vh"}}/>
        </div>
        <Button type="submit">Create!</Button>
      </form>
    </div>
  ) : <h3>Loading...</h3>
}
