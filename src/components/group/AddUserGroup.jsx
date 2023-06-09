/* eslint-disable react/prop-types */

//IMPORTS
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { groupAddUserService, groupDetailsService } from "../../services/group.services";
import { getAllUserService } from "../../services/admin.services";
import { Button, Form, Modal } from "react-bootstrap";
import { PuffLoader } from "react-spinners";
import { ThemeContext } from "../../context/theme.context";

//IMGS
import addUserLogoDark from "../../assets/icons8-add-user-dark-64.png";
import addUserLogoLight from "../../assets/icons8-add-user-64 -light.png";

export default function AddUserGroup({ setReload }) {
  //STATES
  const [users, setUsers] = useState([]);
  const [group, setGroup] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  //OTHER VAR
  const {isDarkMode, cardTheme, buttonTheme} = useContext(ThemeContext);
  const { groupId } = useParams();
  const navigate = useNavigate();

  //FUNCTIONS
  const getData = async () => {
    try {
      setIsLoading(true);
      const groups = await groupDetailsService(groupId);
      const response = await getAllUserService();
      setGroup(groups.data);
      setUsers(response.data);
      setFilteredUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleSearch = ({ target }) => {
    setSearch(target.value);
    setFilteredUsers(users.filter((e) => e.username.includes(target.value)));
  };

  const handleAddUser = async (groupId, userId) => {
    try {
      await groupAddUserService(groupId, userId);
      setReload((currentValue) => !currentValue);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <Button onClick={handleOpenPopup} style={{backgroundColor:"transparent", borderColor:"transparent"}}><img src={isDarkMode ? addUserLogoDark : addUserLogoLight} alt="add-user" /></Button>

      <Modal show={showPopup} onHide={handleClosePopup}>
        <Modal.Header closeButton className={cardTheme}>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>

        <Modal.Body className={cardTheme} style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
          <Form onSubmit={handleSearch}>
            <Form.Control type="text" name="queryValue" onChange={handleSearch} value={search} placeholder="Find an specific user" />
            <br />
          </Form>
          <br />
          {!isLoading ? (
            filteredUsers.map((eachUser) => (
              !group.participants.map((e) => e._id).includes(eachUser._id) && (
                <div key={eachUser._id}>
                  <h4>
                    {eachUser.username}{" "}
                    <Button className={buttonTheme} onClick={() => handleAddUser(groupId, eachUser._id)}>Add User</Button>
                  </h4>
                </div>
              )
            ))
          ) : (
            <div className="spinners">
            <PuffLoader color="white" size={120} />
          </div>
          )}
        </Modal.Body>

        <Modal.Footer className={cardTheme}>
          <Button className={buttonTheme} onClick={handleClosePopup}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}