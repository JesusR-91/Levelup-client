import { useEffect, useState } from "react"
import CreateGroupForm from "../../components/group/CreateGroupForm"
import { Link, useNavigate } from "react-router-dom";
import { groupListService, ownGroupListService } from "../../services/group.services";
import { Card, CardGroup } from "react-bootstrap";

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
    <CreateGroupForm/>
      

    <CardGroup style={{display:"flex", flexWrap: "wrap", gap:"50px", justifyContent: "space-evenly", alignItems:"center"}}>
        <div>
        <h3>Your groups</h3>
        {ownGroups.map((group, index) =>(
                <Card style={{display: "flex",flexWrap: "wrap", flexDirection: "row", justifyContent: "center", backgroundColor: "lightgrey", padding:"3vw", margin:"3vw"}}>
          <div key={index}>
            <h3><Link to={`/group/${group._id}/details`}>{group.name}</Link></h3>
            <div>
              {group.participants.map(user => (<Link to= {`/user/${user._id}`} key={user._id} style={{ textDecoration: "none" }}>{user.username}</Link>))}
            </div>
          </div>
        </Card>
        ))}
        </div>
        <div>
        <h3>Other groups</h3>
        {groups.map((group, index) =>(
                <Card style={{display: "flex",flexWrap: "wrap", flexDirection: "row", justifyContent: "center", backgroundColor: "lightgrey", padding:"3vw", margin:"3vw"}}>

          <div key={index}>
            <h3><Link to={`/group/${group._id}/details`}>{group.name}</Link></h3>
            <div>
              {group.participants.map(user => (<Link to= {`/user/${user._id}`} key={user._id} style={{ textDecoration: "none" }}>{user.username}</Link>))}
            </div>
          </div>
        </Card>
        ))}
        </div>
      <br />

      </CardGroup>
    </div>
  ) : <h3>Loading...</h3>
}
