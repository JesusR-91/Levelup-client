import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createGCService } from "../services/groupComment.services";
import { Button, Modal } from "react-bootstrap";

export default function CreateGroupComment({setReload}) {
    
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
        setReload(currentValue => {!currentValue})
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        navigate("/error");
        
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
        <Button onClick={handleOpenPopup}>Create a New Comment</Button>

<Modal show={showPopup} onHide={handleClosePopup}>
  <Modal.Header closeButton>
    <Modal.Title>Add User</Modal.Title>
  </Modal.Header>
  <Modal.Body>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Description</label>
                <input type="textarea" name="content" onChange={handleContentInput} value={content}/>
            </div>
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
