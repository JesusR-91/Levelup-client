//IMPORTS
import { useContext, useState } from "react"
import { createGroupService } from "../../services/group.services";
import {useNavigate } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";
import { PuffLoader } from "react-spinners";
import { ThemeContext } from "../../context/theme.context"

export default function CreateGroupForm() {
  //STATES
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //OTHER VAR
  const navigate = useNavigate();
  const {buttonTheme, cardTheme} = useContext(ThemeContext);



  //FUNCTIONS
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
    <div style={{padding:"3vh 3vh 3vh 3vh", display:"flex", justifyContent:"flex-end"}}>

            <Button className={buttonTheme} onClick={handleOpenPopup}>Create Group</Button>

<Modal show={showPopup} onHide={handleClosePopup}>
  <Modal.Header closeButton className={cardTheme}>
    <Modal.Title>Create a new group</Modal.Title>
  </Modal.Header>
  <Modal.Body className={cardTheme}>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" onChange={handleNameInput} value={name}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control type="textarea" name="description" onChange={handleDescriptionInput} value={description}/>
        </Form.Group>
        <br />
        {errorMessage && <p style={{color:"red"}}>{errorMessage}</p>}
        <br />
        <Button className={buttonTheme} type="submit">Create!</Button>
      </Form>
      </Modal.Body>
        <Modal.Footer className={cardTheme}>
          <Button className={buttonTheme} onClick={handleClosePopup}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  ) :             <div className="spinners">
  <PuffLoader color="white" size={120} />
</div>
}
