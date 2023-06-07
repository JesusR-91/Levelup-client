/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { groupAddUserService, groupDetailsService } from "../services/group.services";
import { getAllUserService } from "../services/admin.services";
import { Button, Modal } from "react-bootstrap";

export default function AddUserGroup({ setReload }) {
  const [users, setUsers] = useState([]);
  const [group, setGroup] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { groupId } = useParams();
  const navigate = useNavigate();

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
      <Button onClick={handleOpenPopup}>Add Users</Button>

      <Modal show={showPopup} onHide={handleClosePopup}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSearch}>
            <input type="text" name="queryValue" onChange={handleSearch} value={search} placeholder="Find a user" />
            <button type="submit">Search</button>
          </form>

          {!isLoading ? (
            filteredUsers.map((eachUser) => (
              !group.participants.map((e) => e._id).includes(eachUser._id) && (
                <div key={eachUser._id}>
                  <h4>
                    {eachUser.username}{" "}
                    <button onClick={() => handleAddUser(groupId, eachUser._id)}>
                      Add User
                    </button>
                  </h4>
                </div>
              )
            ))
          ) : (
            <h3>Loading...</h3>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClosePopup}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}