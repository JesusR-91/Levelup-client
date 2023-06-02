import { groupListService } from "../services/group.services";
import { userInfoService } from "../services/user.services";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Admin() {
  const [users, setUsers] = useState(null);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
console.log(users)
  const getData = async () => {
    try {
      const users = await userInfoService();
      const groups = await groupListService();
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

  return !isLoading ? (
    <div>
      <div>
        {users.map((eachUser)=>(
          <h4>{eachUser.name} <button>Delete</button></h4>
      ))}
      </div>
      <br/>
      <div>
      {groups.map((eachGroup)=>{
          <h4>{eachGroup.name} <button>Delete</button></h4>
      })}
      </div>
    </div>
  ):(
    <h4>Loading</h4>
  )
}
