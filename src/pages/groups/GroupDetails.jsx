import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { groupDeleteUserService, groupDetailsService } from "../../services/group.services";
import { friendInfoService} from "../../services/user.services";
import AddUserGroup from "../../components/AddUserGroup";
import GroupCommentList from "../../components/GroupCommentList";

export default function GroupDetails() {
  const [group, setGroup] = useState();
  const [owner, setOwner] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { groupId} = useParams();
  const navigate = useNavigate();
  const getData = async () => {
    try {
      const response = await groupDetailsService(groupId);
      setGroup(response.data);
      const ownerResponse = await friendInfoService(response.data.owner);
      setOwner(ownerResponse.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDeleteUser = async (groupId, userId)=> {
    try {
      await groupDeleteUserService(groupId, userId)
    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  }

 
  return !isLoading ? (
    <div>
      <h3>{group.name}</h3>

      <p>{group.description}</p>

      <h3>Owner: {owner.username}</h3>
      <AddUserGroup/>
      <h3>Users:</h3>
      {group.participants.map((user) => (
        <Link to={`/user/${user._id}/details`} key={user._id}>
          {user.username} <button onClick={()=>{handleDeleteUser(groupId, user._id)}}>Delete</button>
        </Link> 
      ))}

      <br />
      <GroupCommentList/>
    </div>
  ) : (
    <h3>Loading...</h3>
  );
}
