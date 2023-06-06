import {groupAddUserService} from "../../services/group.services";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AddUserGroup() {

    const getData = async () => {
        try {
          const users = await groupAddUserService();
          setUsers(users.data);
        } catch (error) {
          console.log(error);
          navigate("/error");
        }
      };
      useEffect(() => {
        getData();
      }, []);
    const handleAddUser = async (id) => {
        try {
          await groupAddUserService(id)
        } catch (error) {
          console.log(error)
          navigate("/error")
        }
      }
  return (
    <div><button onClick={()=>{handleAddUser(eachUser._id)}}>Add User</button></div>
  )
}