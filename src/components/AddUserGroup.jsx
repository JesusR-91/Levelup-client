/* eslint-disable react/prop-types */

//IMPORTS
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { groupAddUserService, groupDetailsService } from "../services/group.services";
import { getAllUserService } from "../services/admin.services";

export default function AddUserGroup({setReload}) {
  //STATES
  const [users, setUsers] = useState();
  const [group, setGroup] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("")
  const[filteredUsers, setFilteredUsers] = useState([])
  
  //OTHER VARIABLES
  const { groupId } = useParams();
  const navigate = useNavigate();

  //FUNCTIONS
  const getData = async () => {
    try {
      setIsLoading(true);
      const groups = await groupDetailsService(groupId)
      const response = await getAllUserService();
      setGroup(groups.data);
      setUsers(response.data);
      setFilteredUsers(response.data)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };
  
  const handleFilter = async () => {setFilteredUsers([...users].filter(e => e.username.includes(search)))};

  const handleSearch =({target}) => {
    setSearch(target.value);
    handleFilter();
  } 
  
  const handleAddUser = async (groupId, userId) => {
    try {
      await groupAddUserService(groupId, userId);
      setReload(currentValue => {!currentValue})
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };
  

  useEffect(() => {
    getData();
  }, []);


  return !isLoading ? (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" name="queryValue" onChange={handleSearch} value={search} placeholder="Find an user"/>
        <button>Search</button>
      </form>
      <h3>All users:</h3>

      {filteredUsers.map((eachUser) => (
  !group.participants.map(e => e._id).includes(eachUser._id) && (
    <div key={eachUser._id}>
      <h4>
        {eachUser.username}{" "}
        <button onClick={() => handleAddUser(groupId, eachUser._id)}>
          Add User
        </button>
      </h4>
    </div>
  )
))}
    </div>
  ) : (
    <h3>Loading...</h3>
  );
}
