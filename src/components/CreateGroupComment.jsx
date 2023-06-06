import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createGCService } from "../services/groupComment.services";

export default function CreateGroupComment() {
    
    //STATES
    const [content ,setContent] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const {groupId} = useParams();
  
    //FUNCTIONS
    const handleContentInput = ({target}) => {setContent(target.value)}
    const handleSubmit = async () => {
      try {
        setIsLoading(true)
        await createGCService(groupId, content);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        navigate("/error");
        
      }
    }

  return !isLoading ? (
    <div>
        <h2>Create new comment</h2>
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
