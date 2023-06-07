import { useState, useEffect } from "react";
import { editUserService } from "../services/user.services";
import { userInfoService } from "../services/user.services";
import { useNavigate } from "react-router-dom";
import { uploadImageService } from "../services/upload.services";

export default function EditProfile() {
  //STATES
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

  const navigate = useNavigate();

  //FUNCTIONS
  const getData = async () => {
    try {
      const activeUser = await userInfoService();
      setEditProfile({
        username: activeUser.data.name,
        pastPassword: activeUser.data.password,
        newPassword: activeUser.data.password,
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
    const img = imageUrl  ? imageUrl : editProfile.profileImg;
    setEditProfile({ ...editProfile, [name]: value,  profileImg: img });
  };

  const handleForm = async (e) => {
    e.preventDefault();
   
    try {
      await editUserService(editProfile);
    } catch (error) {
      if (error.response.status === 400) {
        console.log(error.response.data.errorMessage)
        setErrorMessage(error.response.data.errorMessage)
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

  //USE EFFECT:
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h3>Edit Profile</h3>

      <form onSubmit={handleForm}>
        <div>
          <label>Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </div>
        {isUploading ? <h3>... uploading image</h3> : null}
        {imageUrl ? (
          <div>
            <img src={imageUrl} alt="img" width={200} />
          </div>
        ) : null}

        <br />
        <label>Username: </label>
        <input
          type="text"
          name="username"
          value={editProfile.username}
          onChange={handleEdit}
        />
        <br />
        <label>New Password: </label>
        <input
          type="password"
          name="newPassword"
          value={editProfile.newPassword}
          onChange={handleEdit}
        />
        <br />
        <label>Past Password: </label>
        <input
          type="password"
          name="pastPassword"
          value={editProfile.pastPassword}
          onChange={handleEdit}
        />
        <br />
        <label>First name: </label>
        <input
          type="text"
          name="firstName"
          value={editProfile.firstName}
          onChange={handleEdit}
        />
        <br />
        <label>Last name: </label>
        <input
          type="text"
          name="lastName"
          value={editProfile.lastName}
          onChange={handleEdit}
        />
        <br />
        <label>Birth Date: </label>
        <input
          type="date"
          name="birthDate"
          value={editProfile.birthDate}
          onChange={handleEdit}
        />
        <br />
        <label>E-Mail: </label>
        <input
          type="text"
          name="email"
          value={editProfile.email}
          onChange={handleEdit}
        />
        <br />
        <label>Phone Number: </label>
        <input
          type="number"
          name="phoneNumber"
          value={editProfile.phoneNumber}
          onChange={handleEdit}
        />
        <br />
        {errorMessage && <p style={{color:"red"}}>{errorMessage}</p> }

        <button type="submit">Edit</button>
      </form>
    </div>
  );
}
