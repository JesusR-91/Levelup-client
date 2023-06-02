import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { groupDetailsService } from "../../services/group.services";

export default function GroupDetails() {
  const [group, setGroup] = useState();
  const [owner, setOwner] = useState();
  const {groupId} = useParams();

  const navigate = useNavigate()
  const getData = async () => {
    try {
      const response = await groupDetailsService(groupId);
      const ownerResponse = await us
      setGroup(response.data)
    } catch (error) {
      console.log(error);
      navigate("/error");           
    }
  }

  useEffect(() => {getData()}, [])
  
  return (
    <div>
      <h3>{group.name}</h3>

      <p>{group.description}</p>

      <h3>Owner</h3>


      <h3>Users:</h3>
      {group.participants.map(user => (<Link to={`/user/${user._id}/details`} key={user._id}>{user.username}</Link>))}
    </div>
    
  )
}
