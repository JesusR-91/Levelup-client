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

const createGroupService = (name) =>{
    return service.post("/group/create", name);
};

const groupAddUserService = (groupId, userId) =>{
    return service.patch(`/group/${groupId}/${userId}/add-use`);
};

const groupDeleteUserService = (groupId, userId) =>{
    return service.patch(`/group/${groupId}/${userId}/delete-use`);
};

const addModService = (groupId, modId) =>{
    return service.patch(`/group/${groupId}/${modId}/add-mod)`)
};

const deleteModService = (groupId, modId) =>{
    return service.patch(`/group/${groupId}/${modId}/delete-mod)`)
};

export {groupListService, ownGroupListService, groupDetailsService, groupAddUserService, groupDeleteUserService, createGroupService, addModService, deleteModService};