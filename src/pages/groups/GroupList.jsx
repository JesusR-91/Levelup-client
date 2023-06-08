import { useEffect, useState } from "react"
import CreateGroupForm from "../../components/group/CreateGroupForm"
import { Link, useNavigate } from "react-router-dom";
import { groupListService, ownGroupListService } from "../../services/group.services";

export default function GroupList() {

  const [ownGroups, setOwnGroups] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const ownResponse = await ownGroupListService();
      const groupResponse = await groupListService();
      setOwnGroups(ownResponse.data);
      setGroups(groupResponse.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  }

  useEffect(()=>{getData()},[]);

  return !isLoading ? (
    <div>
      <CreateGroupForm />

      <div>
        <h3>Your groups</h3>
        <div>
        {ownGroups.map((group, index) =>(
          <div key={index}>
            <h3><Link to={`/group/${group._id}/details`}>{group.name}</Link></h3>
            <div>
              {group.participants.map(user => (<Link to= {`/user/${user._id}`} key={user._id}>{user.username}</Link>))}
            </div>
          </div>
        ))}
        </div>
      </div>

      <div>
        <h3>Other groups</h3>
        <div>
        {groups.map((group, index) =>(
          <div key={index}>
            <h3><Link to={`/group/${group._id}/details`}>{group.name}</Link></h3>
            <div>
              {group.participants.map(user => (<Link to= {`/user/${user._id}`} key={user._id}>{user.username}</Link>))}
            </div>
          </div>
        ))}
        </div>
      </div>
      <br />

     
    </div>
  ) : <h3>Loading...</h3>
}
