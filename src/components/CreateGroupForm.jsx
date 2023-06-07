import { useState } from "react"
import { createGroupService } from "../services/group.services";
import {useNavigate } from "react-router-dom";

export default function CreateGroupForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
const navigate = useNavigate()
  const handleNameInput = ({target}) => {setName(target.value)};
  const handleDescriptionInput = ({target}) => {setDescription(target.value)};


  const handleSubmit = async () => {
    try {
    
      await createGroupService({name, description});
      setIsLoading(true); 
    } catch (error) {
      if (error.response.status === 404) {
        setErrorMessage(error.response.data.errorMessage)
        return;
      }
      console.log(error); 
      navigate("/error")
    }
  }

  return !isLoading ? (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" onChange={handleNameInput} value={name}/>
        </div>
        <br />
        <div>
          <label>Description</label>
          <input type="textarea" name="description" onChange={handleDescriptionInput} value={description}/>
        </div>
        {errorMessage && <p style={{color:"red"}}>{errorMessage}</p>}

        <button>Create!</button>
      </form>
    </div>
  ) : <h3>Loading...</h3>
}
