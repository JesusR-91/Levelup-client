import { getAllGroupsService, getAllUserService, deleteUserService, deleteGroupService } from "../services/admin.services";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Admin() {
  const [users, setUsers] = useState(null);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams()
console.log(groups)
  const getData = async () => {
    try {
      const users = await getAllUserService();
      const groups = await getAllGroupsService();

      setUsers(users.data);
      setGroups(groups.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleDeleteGroup = async (id)=> {
    try {
      await deleteGroupService(id)
      navigate("/admin")
    } catch (error) {
      console.log(error)
      navigate("/admin")
    }
  }
  const handleDeleteUser = async (id)=> {
    try {
      await deleteUserService(id)
      navigate("/admin")
    } catch (error) {
      console.log(error)
      navigate("/admin")
    }
  }
  
  return !isLoading ? (
    <div>
      <h3>All users:</h3>
        {users.map((eachUser)=>(
      <div key={eachUser._id}>
          <h4>{eachUser.username} <button onClick={()=>{handleDeleteUser(eachUser._id)}}>Delete</button></h4>
      </div>
      ))}
      <br/>
      <h3>All groups:</h3>
      {groups.map((eachGroup)=>
      <div key={eachGroup._id}>
          <h4>{eachGroup.name} <button onClick={()=>{handleDeleteGroup(eachGroup._id)}}>Delete</button></h4>
      </div>
      )}
      </div>
  ):(
    <h4>Loading</h4>
  )
}
