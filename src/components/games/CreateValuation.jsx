/* eslint-disable react/prop-types */

//IMPORTS
import { useContext, useState } from "react";
import { newValuationService } from "../../services/valuation.services";
import { useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { ThemeContext } from "../../context/theme.context";

export default function CreateValuation({getData}) {

  //STATES
  const [content, setContent] = useState("");
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const {buttonTheme, cardTheme} = useContext (ThemeContext);
  const {gameId} = useParams();

  //FUNCTIONS
  const handleContentInput = ({ target }) => {
    setContent(target.value);
  };
  const handleValueInput = ({ target }) => {
    setValue(target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true);
      await newValuationService(gameId, content, value);
      getData();
      setIsLoading(false);
      setContent("");
      setValue(0)
    } catch (error) {
      console.log(error);
    }
  };
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return !isLoading ? (
    <div>
    <Button className={buttonTheme} onClick={handleOpenPopup}>New Valuation</Button>

<Modal show={showPopup} onHide={handleClosePopup}>
  <Modal.Header className={cardTheme} closeButton>
    <Modal.Title>Add User</Modal.Title>
  </Modal.Header>
  <Modal.Body className={cardTheme}>
     <form onSubmit={handleSubmit}>
      
        <div>
          <label>Note</label>
          <input
            type="number"
            name="value"
            onChange={handleValueInput}
            value={value}
            min="0" max="5"
          />
        </div>
        <br />
        <div>
          <label>Description</label>
          <input
            type="textarea"
            name="content"
            onChange={handleContentInput}
            value={content}
          />
        </div>
        <br />
        <Button className={buttonTheme} onClick={handleClosePopup} type="submit">Create!</Button>
      </form>
      </Modal.Body>
        <Modal.Footer className={cardTheme}>
          <Button className={buttonTheme} onClick={handleClosePopup}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  ) : (
    <h3>Loading...</h3>
  );
}
