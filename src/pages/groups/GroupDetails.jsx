//IMPORTS
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {groupDeleteUserService, groupDetailsService, deleteModService, addModService,} from "../../services/group.services";
import { friendInfoService } from "../../services/user.services";
import { AuthContext } from "../../context/auth.context";
import { Button, Card, CardGroup, Col } from "react-bootstrap";
import { PuffLoader } from "react-spinners";
import { ThemeContext } from "../../context/theme.context";

//COMPONENTS AND PAGES
import AddUserGroup from "../../components/group/AddUserGroup";
import GroupCommentList from "../../components/group/GroupCommentList";
import CreateGroupComment from "../../components/group/CreateGroupComment.jsx";

//IMG
import modLogo from "../../assets/icons8-corporal-cpl-light50.png";



export default function GroupDetails() {
  //STATES
  const [group, setGroup] = useState();
  const [owner, setOwner] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false)

  //OTHER VARIABLES
  const { groupId } = useParams();
  const navigate = useNavigate();
  const {activeUser} = useContext(AuthContext);
  const {cardTheme, buttonTheme} = useContext(ThemeContext);


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
    <div style={{display:"flex", flexDirection:"column", gap:"5vw", flexWrap:"wrap", justifyContent:"center", alignItems:"center"}}>

      <CreateGroupComment setReload={setReload}/>

        <CardGroup>
          <Col md={4}>
            <div style={{ maxHeight: "100vh", display:"flex", flexDirection:"row"}}>
              <Card className={cardTheme} style={{  display: "flex", flexDirection: "column",  justifyContent: "center", padding: "3vw", minWidth:"35vw", maxWidth:"35vw", minHeight:"50vh", maxHeight: "100vh", gap:"1vh"}}>
                <h3>{group.name}</h3>
                <br />
                <p>{group.description}</p>
                <h3>Owner: {owner.username}</h3>
                <AddUserGroup setReload={setReload}/>
                <h3>Users:</h3>
                {group.participants.map((user, index) => (
                  <div key={index} style={{display:"flex", gap:"1vw", justifyContent: "center"}}>
                    <Link to={`/user/${user._id}`} style={{textDecoration:"none"}}>{user.username}</Link>
                    <p> <img src={modLogo} alt="mod" /> </p>
                    {(group.mods.includes(activeUser._id) ||
                      group.owner.includes(activeUser._id)) && (
                        <div style={{display:"flex", gap:"1vw"}}>
                          <Button className={buttonTheme} onClick={() => {handleDeleteUser(group._id, user._id)}}>Delete User</Button>
                          {!group.mods.includes(user._id) && <Button className={buttonTheme} onClick={() => handleAddMod(groupId, user._id)}>Add Mod</Button>}
                        </div>
                      )}
                    {group.mods.includes(user._id) && (
                      <div key={user._id}>
                        {(group.mods.includes(activeUser._id) ||
                          group.owner.includes(activeUser._id)) && (
                          <Button className={buttonTheme} onClick={() => {handleDeleteMod(group._id, user._id)}}>Delete Mod</Button>)}
                      </div>)}
                  </div>
                ))}
              </Card>
              
            </div>
          </Col>
        </CardGroup>
        <div style={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center", padding:"3vh"}}>
          <h3>Comments:</h3>
          <br/>
          <GroupCommentList />
        </div>
    </div>
  ) : (
    <div className="spinners">
      <PuffLoader color="white" size={120} />
    </div>
  );
}
