import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { friendQueryService } from "../services/user.services";
import { groupAddUserService, addModService, groupDetailsService } from "../services/group.services";
import { getAllUserService } from "../services/admin.services";

export default function AddUserGroup() {
  //STATES
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  const [group, setGroup] = useState();
  const [queryValue, setQueryValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);


  const { groupId } = useParams();

  //FUNCTIONS
  const getData = async () => {
    try {
      const groups = await groupDetailsService(groupId)
      const response = await getAllUserService();
      setGroup(groups.data)
      setUsers(response.data);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  
  const handleForm = ({ target }) => {
    setQueryValue(target.value);
  };
  const handleSubmitForm = async () => {
    try {
      await friendQueryService(queryValue);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };
  const handleAddUser = async (groupId, userId) => {
    try {
      await groupAddUserService(groupId, userId);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };
    const handleAddMod = async (groupId, modId) => {
try {
  await addModService(groupId, modId);
} catch (error) {
  console.log(error);
  navigate("/error");
}
};
  return !isLoading ? (
    <div>
      <form onSubmit={handleSubmitForm}>
        <input
          type="text"
          name="queryValue"
          onChange={handleForm}
          value={queryValue}
          placeholder="Put your members here"
        />
        <button>Search</button>
      </form>
      <h3>All users:</h3>

      {users.map((eachUser) => (
  !group.participants.map(e => e._id).includes(eachUser._id) && (
    <div key={eachUser._id}>
      <h4>
        {eachUser.username}{" "}
        <button onClick={() => handleAddUser(groupId, eachUser._id)}>
          Add User
        </button>
        <button onClick={() => handleAddMod(groupId, eachUser._id)}>
          Add Mod
        </button>
      </h4>
    </div>
  )
))}
    </div>
  ) : (
    <h3>Loading...</h3>
  );
}
