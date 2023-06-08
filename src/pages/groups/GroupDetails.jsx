//IMPORTS
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {groupDeleteUserService, groupDetailsService, deleteModService, addModService,} from "../../services/group.services";
import { friendInfoService } from "../../services/user.services";
import AddUserGroup from "../../components/group/AddUserGroup";
import GroupCommentList from "../../components/group/GroupCommentList";
import { AuthContext } from "../../context/auth.context";
import { Button, Card, Col } from "react-bootstrap";
import CreateGroupComment from "../../components/group/CreateGroupComment.jsx";



export default function GroupDetails() {
  //STATES
  const [group, setGroup] = useState();
  const [owner, setOwner] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false)

  //OTHER VARIABLES
  const { groupId } = useParams();
  const navigate = useNavigate();
  const {activeUser} = useContext(AuthContext)

  //FUNCTIONS
  const getData = async () => {
    try {
      setIsLoading(true);
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
  
  const handleDeleteUser = async (groupId, userId) => {
    try {
      group.mods.includes (userId) && await await deleteModService(groupId, userId)
      await groupDeleteUserService(groupId, userId);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };
  
  const handleDeleteMod = async (groupId, modId) => {
    try {
      await deleteModService(groupId, modId);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };
  
  const handleAddMod = async (groupId, modId) => {
    try {
      await addModService(groupId, modId);
      setReload(!reload);

    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };
  
  useEffect(() => {
    getData();
  }, [reload]);
  return !isLoading ? (
    <div style={{display:"flex", flexDirection:"row", gap:"20vw"}}>


      <Col md={4}>
<CreateGroupComment setReload={setReload} style={{padding:"3vh 3vw 3vh 3vw", display:"flex", justifyContent:"flex-end"}}/>
        <div style={{ maxHeight: "60vh", overflow: "auto", display:"flex", flexDirection:"row"}}>
          <Card style={{ backgroundColor: "lightgrey", padding: "5vh", margin:"0 0 0 10vh"  }}>
      <h3>{group.name}</h3>
      <p>{group.description}</p>
      <h3>Owner: {owner.username}</h3>
      <AddUserGroup setReload={setReload}/>
      <h3>Users:</h3>
      {group.participants.map((user, index) => (
        <div key={index} style={{display:"flex", gap:"10px", justifyContent: "center"}}>
          {user.username}{" "}
          {(group.mods.includes(activeUser._id) ||
            group.owner.includes(activeUser._id)) && (
              <div style={{display:"flex", gap:"1vw"}}>
                <Button onClick={() => {handleDeleteUser(group._id, user._id)}} >Delete User</Button>
                {!group.mods.includes(user._id) && <Button onClick={() => handleAddMod(groupId, user._id)}>Add Mod</Button>}
              </div>
            )}
          {group.mods.includes(user._id) && (
            <div key={user._id}>
              <p>Mod</p>
              {(group.mods.includes(activeUser._id) ||
                group.owner.includes(activeUser._id)) && (
                  <Button
                    onClick={() => {
                      handleDeleteMod(group._id, user._id);
                    }}
                  >
                    Delete Mod
                  </Button>
                )}
                
            </div>
            
          )}
        </div>
      ))}
          </Card>
          
        </div>
      </Col>
      <div style={{display:"flex", justifyContent:"flex-end"}}>
      <h3>Comments:</h3>
      <br/>
      <GroupCommentList />
      </div>
    </div>
  ) : (
    <h3>Loading...</h3>
  );
}
