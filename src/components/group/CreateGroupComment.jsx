/* eslint-disable react/prop-types */

//IMPORTS
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createGCService } from "../../services/groupComment.services";
import { Button, Modal } from "react-bootstrap";
import { PuffLoader } from "react-spinners";
import { ThemeContext } from "../../context/theme.context";

export default function CreateGroupComment({setReload}) {
    
    //STATES
    const [content ,setContent] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    
    //OTHER VAR
    const {cardTheme, buttonTheme} = useContext(ThemeContext);
    const navigate = useNavigate();
    const {groupId} = useParams();
  
    //FUNCTIONS
    const handleContentInput = ({target}) => {setContent(target.value)}
    const handleSubmit = async (e) => {
    e.preventDefault();

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
        <Button className={buttonTheme} onClick={handleOpenPopup}>Create a New Comment</Button>

<Modal show={showPopup} onHide={handleClosePopup}>
  <Modal.Header className={cardTheme} closeButton>
    <Modal.Title>Add User</Modal.Title>
  </Modal.Header>
  <Modal.Body className={cardTheme}>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Description</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="4" name="content" onChange={handleContentInput} value={content} />
            </div>
            <br />
            <Button className={buttonTheme} type="submit">Create!</Button>
        </form>
        </Modal.Body>
        <Modal.Footer className={cardTheme}>
          <Button className={buttonTheme} onClick={handleClosePopup}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  ) : (
    <div className="spinners">
      <PuffLoader color="white" size={120} />
    </div> )
}
