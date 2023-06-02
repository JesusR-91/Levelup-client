import { useState } from "react"
import { createGroupService } from "../services/group.services";

export default function CreateGroupForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const handleNameInput = ({target}) => {setName(target.value)};
  const handleDescriptionInput = ({target}) => {setDescription(target.value)};


  const handleSubmit = async () => {
    try {
      // setIsLoading(true)
      await createGroupService({name, description});
      // setIsLoading(false); 
    } catch (error) {
      console.log(error);   
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
        <button>Create!</button>
      </form>
    </div>
  ) : <h3>Loading...</h3>
}
