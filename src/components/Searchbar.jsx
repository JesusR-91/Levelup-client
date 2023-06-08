//IMPORTS
import { useContext, useState } from "react";
import { friendQueryService } from "../services/user.services";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import { ThemeContext } from "../context/theme.context";

//IMGS
import searchLogoDark from "../assets/icons8-search-64-white.png";
import searchLogoLight from "../assets/icons8-search-64-black.png"

export default function Searchbar() {
  //STATES
  const [queryValue, setQueryValue] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  
  //OTHER VARS
  const { buttonTheme, isDarkMode, cardTheme} = useContext(ThemeContext);
  const navigate = useNavigate();

  //FUNCTIONS  
  const handleForm = ({ target }) => {
    setQueryValue(target.value);
  };
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
        style={{
          display: "flex",
          marginTop: "-9.5vh",
          width: "5vw",
          height: "5vh",
          justifyContent: "center",
          paddingTop: "0vh",
          backgroundColor:"transparent",
          borderColor:"transparent"
        }}
      >
        <img src={isDarkMode ? searchLogoDark : searchLogoLight} alt="search-user" style={{height:"3vw"}}/>
      </Button>

      <Modal show={showPopup} onHide={handleClosePopup}>
        <Modal.Header closeButton className={cardTheme}>
          <Modal.Title>Search a friend!</Modal.Title>
        </Modal.Header>
        <Modal.Body className={cardTheme}>
          <Form onSubmit={handleSubmitForm} style={{display:"flex", gap:"1vw", justifyContent:"center"}}>
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
            <br />
            <Button className={buttonTheme} type="submit" disabled={!queryValue ? true : false}>
              Find it!
            </Button>
          </Form>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </Modal.Body>
        <Modal.Footer className={cardTheme}>
          <Button className={buttonTheme} onClick={handleClosePopup}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}