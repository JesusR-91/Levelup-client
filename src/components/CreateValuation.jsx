/* eslint-disable react/prop-types */

import { useState } from "react";
import { newValuationService } from "../services/valuation.services";
import { useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

export default function CreateValuation({setReload}) {

  //STATES
  const [content, setContent] = useState("");
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const {gameId} = useParams();

  const handleContentInput = ({ target }) => {
    setContent(target.value);
  };
  const handleValueInput = ({ target }) => {
    setValue(target.value);
  };
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await newValuationService(gameId, content, value);
      setReload(currentValue => {!currentValue})
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
    <Button onClick={handleOpenPopup}>New Valuation</Button>

<Modal show={showPopup} onHide={handleClosePopup}>
  <Modal.Header closeButton>
    <Modal.Title>Add User</Modal.Title>
  </Modal.Header>
  <Modal.Body>
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
        <button>Create!</button>
      </form>
      </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClosePopup}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  ) : (
    <h3>Loading...</h3>
  );
}
