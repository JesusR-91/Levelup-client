//IMPORTS
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {groupDeleteUserService, groupDetailsService, deleteModService, addModService,} from "../../services/group.services";
import { friendInfoService } from "../../services/user.services";
import AddUserGroup from "../../components/AddUserGroup";
import GroupCommentList from "../../components/GroupCommentList";
import { AuthContext } from "../../context/auth.context";


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
    <div>
      <h3>{group.name}</h3>

      <p>{group.description}</p>

      <h3>Owner: {owner.username}</h3>

      <AddUserGroup setReload={setReload}/>

      <h3>Users:</h3>
      {group.participants.map((user, index) => (
        <div key={index}>
          {user.username}{" "}
          {(group.mods.includes(activeUser._id) ||
            group.owner.includes(activeUser._id)) && (
              <div>
                <button onClick={() => {handleDeleteUser(group._id, user._id)}}>Delete User</button>
                {!group.mods.includes(user._id) && <button onClick={() => handleAddMod(groupId, user._id)}>Add Mod</button>}
              </div>
            )}
          {group.mods.includes(user._id) && (
            <div key={user._id}>
              <p>Mod</p>
              {(group.mods.includes(activeUser._id) ||
                group.owner.includes(activeUser._id)) && (
                  <button
                    onClick={() => {
                      handleDeleteMod(group._id, user._id);
                    }}
                  >
                    Delete Mod
                  </button>
                )}
            </div>
          )}
        </div>
      ))}

      <br />
          <GroupCommentList/>
   
    </div>
  ) : (
    <h3>Loading...</h3>
  );
}
