import { useState } from "react"
import {newPublicationService} from "../services/publications.services"
export default function CreatePublication() {
  const [owner, setOwner] = useState("")
  const [content ,setConent] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const handleNameInput = ({target}) => {setOwner(target.value)}
  const handleContentInput = ({target}) => {setConent(target.value)}

  const handleSubmit = async () => {
    try {
      await newPublicationService({owner, content})
    } catch (error) {
      console.log(error)
    }
  }
  return !isLoading ? (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" onChange={handleNameInput} value={owner}/>
        </div>
        <br />
        <div>
          <label>Description</label>
          <input type="textarea" name="description" onChange={handleContentInput} value={content}/>
        </div>
        <button>Create!</button>
      </form>
    </div>
  ) : <h3>Loading...</h3>
}
