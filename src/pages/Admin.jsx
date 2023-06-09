//IMPORTS
import { getAllGroupsService, getAllUserService, deleteUserService, deleteGroupService } from "../services/admin.services";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Card, CardGroup } from "react-bootstrap";
import { PuffLoader } from "react-spinners";

export default function Admin() {
  //STATES
  const [users, setUsers] = useState(null);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(true);

  //OTHER VARS
  const navigate = useNavigate();

  //FUNCTIONS
  const getData = async () => {
    try {
      setIsLoading(true);
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

  const handleDeleteGroup = async (id)=> {
    try {
      await deleteGroupService(id);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  }
  
  const handleDeleteUser = async (id)=> {
    try {
      await deleteUserService(id);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  }

  useEffect(() => {
    getData();
  }, [reload]);

  
  return !isLoading ? (
    <div>
      <CardGroup className="publication-distribution">
        <Card className="publication-card">
      <h3>All users:</h3>
        {users.map((eachUser)=>(
      <div key={eachUser._id}>
          <h4>{eachUser.username} <Button onClick={()=>{handleDeleteUser(eachUser._id)}}>Delete</Button></h4>
      </div>
      ))}
      </Card>
      <br/>
      <Card className="publication-card">
      <h3>All groups:</h3>
      {groups.map((eachGroup)=>
      <div key={eachGroup._id}>
          <h4>{eachGroup.name} <Button onClick={()=>{handleDeleteGroup(eachGroup._id)}}>Delete</Button></h4>
      </div>
      )}
      </Card>
      </CardGroup>
      </div>
  ):(
    <div className="spinners">
    <PuffLoader color="white" size={120} />
  </div>
  )
}
