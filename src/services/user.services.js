import service from "./config.services";

const userInfo = () => {
  return service.get("/user");
};

const friendInfo = (friendId) => {
  return service.get(`/user/friend/${friendId}`, friendId);
};

const editUser = () => {
  return service.put(`/user/edit`);
};

const addFriend = (friendId) => {
  return service.patch(`/user/add-friend/${friendId}`, friendId);
};

const deleteFriend = (friendId) => {
  return service.patch(`/user/friends/${friendId}`);
};

export { userInfo, friendInfo, editUser, addFriend, deleteFriend };
