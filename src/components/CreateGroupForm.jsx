import { useState } from "react"
import { createGroupService } from "../services/group.services";

export default function CreateGroupForm() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const handleNemInput = ({target}) => {setName(target.value)};

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      await createGroupService(name);
      setIsLoading(false); 
    } catch (error) {
      console.log(error);   
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" onChange={handleNemInput} value={name}/>
        </div>
        <br />
        <button>Create!</button>
      </form>
    </div>
  )
}
