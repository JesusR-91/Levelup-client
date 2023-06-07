import { useState } from "react"
import { createGroupService } from "../services/group.services";
import {useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

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
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return !isLoading ? (
    <div>
            <Button onClick={handleOpenPopup}>Create Group</Button>

<Modal show={showPopup} onHide={handleClosePopup}>
  <Modal.Header closeButton>
    <Modal.Title>Add User</Modal.Title>
  </Modal.Header>
  <Modal.Body>
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
      </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClosePopup}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  ) : <h3>Loading...</h3>
}
