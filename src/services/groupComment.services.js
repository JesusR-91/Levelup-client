import service from "./config.services";

const getAllGPService = (gpId) => {
    return service.get(`/group-comment/${gpId}`);
}

const createGPService = (gpId) =>{
    return service.post(`/group-comment/${gpId}`);
}

const deleteGPService = (gpId) =>{
    return service.delete(`/group-comment/${gpId}`);
}

const addLikeGPService = (gpId) =>{
    return service.patch(`/group-comment/${gpId}/add-like`);
}

const deleteDislikeGPService = (gpId) =>{
    return service.patch(`/group-comment/${gpId}/delete-like`);
}

const adDislikeGPService = (gpId) =>{
    return service.patch(`/group-comment/${gpId}/add-dislike`);
}

const deleteLikeGPService = (gpId) =>{
    return service.patch(`/group-comment/${gpId}/delete-dislike`);
}

const addLoveGPService = (gpId) =>{
    return service.patch(`/group-comment/${gpId}/add-dislike`);
}

const deleteLoveGPService = (gpId) =>{
    return service.patch(`/group-comment/${gpId}/delete-love`);
}

export {getAllGPService, createGPService, deleteGPService, addLikeGPService, deleteLikeGPService, deleteDislikeGPService, adDislikeGPService, addLoveGPService, deleteLoveGPService};