import { useContext, useState } from "react";
import { friendQueryService } from "../services/user.services";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import { ThemeContext } from "../context/theme.context";

export default function Searchbar() {
  const [queryValue, setQueryValue] = useState("");
  const handleForm = ({ target }) => {
    setQueryValue(target.value);
  };
  const [errorMessage, setErrorMessage] = useState();
  const { buttonTheme, cardTheme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await friendQueryService(queryValue);
      navigate(`/user/${response.data._id}`);
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        console.log(error.response.data.errorMessage);
        setErrorMessage(error.response.data.errorMessage);
        return;
      }
      navigate("/error");
    }
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div style={{ padding: "2vh" }}>
      <Button
        onClick={handleOpenPopup}
        className={buttonTheme}
        style={{
          display: "flex",
          marginTop: "-9.5vh",
          width: "5vw",
          height: "5vh",
          justifyContent: "center",
          paddingTop: "0vh",
        }}
      >
        Search User
      </Button>

      <Modal show={showPopup} onHide={handleClosePopup}>
        <Modal.Header closeButton>
          <Modal.Title>SearchUser</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitForm}>
            <Form.Group>
              <Form.Control
                type="text"
                name="queryValue"
                onChange={handleForm}
                value={queryValue}
                placeholder="Put your friends username"
                style={{ width: "20vw", height: "6vh" }}
              />
            </Form.Group>
            <Button
              className={buttonTheme}
              type="submit"
              disabled={!queryValue ? true : false}
            >
              Find it!
            </Button>
          </Form>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClosePopup}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}