import service from "./config.services";

const groupListService = () =>{
    return service.get("/group");
};

const ownGroupListService = () =>{
    return service.get("/group/own");
};

const groupDetailsService = (groupId) =>{
    return service.get(`/group/${groupId}/details`, groupId);
};

const createGroupService = () =>{
    return service.post("/group/create");
};

const groupAddUserService = (groupId, userId) =>{
    return service.patch(`/group/${groupId}/${userId}/add-use`, {groupId, userId});
};

const groupDeleteUserService = (groupId, userId) =>{
    return service.patch(`/group/${groupId}/${userId}/delete-use`, {groupId, userId});
};



const addModService = (groupId, modId) =>{
    return service.patch(`/group/${groupId}/${modId}/add-mod)`, {groupId, modId})
};

const deleteModService = (groupId, modId) =>{
    return service.patch(`/group/${groupId}/${modId}/delete-mod)`, {groupId, modId})
};

export {groupListService, ownGroupListService, groupDetailsService, groupAddUserService, groupDeleteUserService, createGroupService, addModService, deleteModService};