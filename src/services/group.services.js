import service from "./config.services";

const groupListService = () =>{
    return service.get("/group");
};

const ownGroupListService = () =>{
    return service.get("/group/own");
};

const groupDetailsService = (groupId) =>{
    return service.get(`/group/${groupId}/details`);
};

const createGroupService = (groupDetails) =>{
    return service.post("/group/create", groupDetails);
};

const groupAddUserService = (groupId, userId) =>{
    return service.patch(`/group/${groupId}/${userId}/add-user`);
};

const groupDeleteUserService = (groupId, userId) =>{
    return service.patch(`/group/${groupId}/${userId}/delete-user`);
};

const addModService = (groupId, modId) =>{
    return service.patch(`/group/${groupId}/${modId}/add-mod)`)
};

const deleteModService = (groupId, modId) =>{
    return service.patch(`/group/${groupId}/${modId}/delete-mod)`)
};

export {groupListService, ownGroupListService, groupDetailsService, groupAddUserService, groupDeleteUserService, createGroupService, addModService, deleteModService};