import service from "./config.services";

const userInfoService = () => {
  return service.get("/user");
};

const friendInfoService = (friendId) => {
  return service.get(`/user/${friendId}`);
};

const friendQueryService = (queryFriend) => {
  return service.get(`/user/${queryFriend}/find`);
};

const editUserService = (editProfile) => {
  return service.put(`/user/edit`, editProfile);
};

const addFriendService = (friendId) => {
  return service.patch(`/user/add-friend/${friendId}`);
};

const deleteFriendService = (friendId) => {
  return service.patch(`/user/friends/${friendId}`);
};

export { userInfoService, friendInfoService, friendQueryService, editUserService, addFriendService, deleteFriendService};
