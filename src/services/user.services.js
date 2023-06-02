import service from "./config.services";

const userInfo = (user) => {
  return service.get("/user", user);
};

const friendInfo = (friend) => {
  return service.get(`/user/friend/${friend}`, friend);
};

const editUser = (user) => {
  return service.put(`/user/edit`, user);
};

const addFriend = (friend) => {
  return service.patch(`/user/addfriend/${friend}`, friend);
};

const deleteFriend = (friend) => {
  return service.patch(`/user/friends/${friend}`);
};

export { userInfo, friendInfo, editUser, addFriend, deleteFriend };
