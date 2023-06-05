import { useState } from "react"
import {newPublicationService} from "../services/publications.services"
import { useNavigate } from "react-router-dom";
export default function CreatePublication() {
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
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
      
    }
  }
  return !isLoading ? (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Description</label>
          <input type="textarea" name="content" onChange={handleContentInput} value={content}/>
        </div>
        <button>Create!</button>
      </form>
    </div>
  ) : <h3>Loading...</h3>
}
