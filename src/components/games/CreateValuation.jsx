/* eslint-disable react/prop-types */

//IMPORTS
import { useContext, useState } from "react";
import { newValuationService } from "../../services/valuation.services";
import { useParams } from "react-router-dom";
import { Button, Modal,Form } from "react-bootstrap";
import { ThemeContext } from "../../context/theme.context";
import { PuffLoader } from "react-spinners";
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
      <Button className={buttonTheme} onClick={handleOpenPopup}>
        New Valuation
      </Button>

      <Modal show={showPopup} onHide={handleClosePopup}>
        <Modal.Header className={cardTheme} closeButton>
          <Modal.Title>Add Valuation</Modal.Title>
        </Modal.Header>
        <Modal.Body className={cardTheme}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Note</Form.Label>
              <Form.Control
                type="number"
                name="value"
                onChange={handleValueInput}
                value={value}
                min="0"
                max="5"
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                onChange={handleContentInput}
                value={content}
              />
            </Form.Group>
            <br />
            <Button className={buttonTheme} onClick={handleClosePopup} type="submit">
              Create!
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className={cardTheme}>
          <Button className={buttonTheme} onClick={handleClosePopup}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  ) : (
    <div className="spinners">
      <PuffLoader color="white" size={120} />
    </div>
  );
}