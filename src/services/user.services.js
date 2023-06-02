import service from "./config.services";

const userInfoService = () => {
  return service.get("/user");
};

const friendInfoService = (friendId) => {
  return service.get(`/user/${friendId}`);
};

const editUserService = () => {
  return service.put(`/user/edit`);
};

const addFriendService = (friendId) => {
  return service.patch(`/user/add-friend/${friendId}`);
};

const deleteFriendService = (friendId) => {
  return service.patch(`/user/friends/${friendId}`);
};

export { userInfoService, friendInfoService, editUserService, addFriendService, deleteFriendService};
