import service from "./config.services";

const getAllUserService = () =>{
    return service.get("/admin/users");
};

const deleteUserService = (userId) =>{
    return service.delete(`/admin/${userId}`);
};


const getAllGroupsService = () =>{
    return service.get("/admin/groups");
};

const deleteGroupService = (groupId) =>{
    return service.delete(`/admin/group/${groupId}`);
};




export {getAllUserService, deleteUserService, getAllGroupsService, deleteGroupService};
