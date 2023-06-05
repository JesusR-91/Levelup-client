import { useState, useEffect } from "react";
import { editUserService } from "../services/user.services";
import { userInfoService } from "../services/user.services";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const getData = async () => {
    try {
      const activeUser = await userInfoService();
      console.log(activeUser);
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
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleEdit = ({ target: { name, value } }) => {
    setEditProfile({ ...editProfile, [name]: value });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      await editUserService(editProfile);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <div>
      <h3>Edit Profile</h3>

      <form onSubmit={handleForm}>
        <label>Profile Image </label>
        <input
          type="string"
          name="profileImg"
          value={editProfile.profileImg}
          onChange={handleEdit}
        />
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
        <button type="submit">Edit</button>
      </form>
      {/*         <button onClick={navigate("/profile")}>Cancel</button> */}
    </div>
  );
}
