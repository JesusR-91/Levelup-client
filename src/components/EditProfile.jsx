import { useState, useEffect, useContext } from "react";
import { editUserService } from "../services/user.services";
import { userInfoService } from "../services/user.services";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import { uploadImageService } from "../services/upload.services";
import { ThemeContext } from "../context/theme.context";

export default function EditProfile() {
  const [editProfile, setEditProfile] = useState({
    username: "",
    pastPassword: "",
    newPassword: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    phoneNumber: "",
    profileImg: "",
  });
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { buttonTheme, cardTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const activeUser = await userInfoService();
      setEditProfile({
        username: activeUser.data.name,
        pastPassword: "",
        newPassword: "",
        firstName: activeUser.data.firstName,
        lastName: activeUser.data.lastName,
        birthDate: activeUser.data.birthDate,
        email: activeUser.data.email,
        phoneNumber: activeUser.data.phoneNumber,
        profileImg: activeUser.data.profileImg,
      });
      console.log(activeUser);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleEdit = ({ target: { name, value } }) => {
    const img = imageUrl ? imageUrl : editProfile.profileImg;
    setEditProfile({ ...editProfile, [name]: value, profileImg: img });
  };

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      await editUserService(editProfile);
      handleClosePopup();
    } catch (error) {
      if (error.response.status === 400) {
        console.log(error.response.data.errorMessage);
        setErrorMessage(error.response.data.errorMessage);
        return;
      }
      console.log(error);
      navigate("/error");
    }
  };

  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);

    try {
      const response = await uploadImageService(uploadData);

      setImageUrl(response.data.imageUrl);

      setIsUploading(false);
    } catch (error) {
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Button className={buttonTheme} onClick={handleOpenPopup}>
        Edit Info
      </Button>

      <Modal show={showPopup} onHide={handleClosePopup}>
        <Modal.Header className={cardTheme} closeButton>
          <Modal.Title>Edit Info</Modal.Title>
        </Modal.Header>
        <Modal.Body className={cardTheme}>
          <Form onSubmit={handleForm}>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </Form.Group>
            {isUploading ? <h3>... uploading image</h3> : null}
            {imageUrl ? (
              <div>
                <img src={imageUrl} alt="img" width={200} />
              </div>
            ) : null}

            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={editProfile.username}
                onChange={handleEdit}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>New Password:</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={editProfile.newPassword}
                onChange={handleEdit}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Past Password:</Form.Label>
              <Form.Control
                type="password"
                name="pastPassword"
                value={editProfile.pastPassword}
                onChange={handleEdit}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>First name:</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={editProfile.firstName}
                onChange={handleEdit}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last name:</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={editProfile.lastName}
                onChange={handleEdit}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Birth Date:</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                value={editProfile.birthDate}
                onChange={handleEdit}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>E-Mail:</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={editProfile.email}
                onChange={handleEdit}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control
                type="number"
                name="phoneNumber"
                value={editProfile.phoneNumber}
                onChange={handleEdit}
              />
            </Form.Group>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <br />
            <Button className={buttonTheme} type="submit">Submit</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className={cardTheme}>
          <Button className={buttonTheme} onClick={handleClosePopup}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}