import service from "./config.services";

const getAllGPService = (gpId) => {
  return service.get(`/group-comment/${gpId}`);
};

const createGPService = (gpId) => {
  return service.post(`/group-comment/${gpId}`);
};

const deleteGPService = (gpId) => {
  return service.delete(`/group-comment/${gpId}`);
};

const handleLikeGPService = (gpId) => {
  return service.patch(`/group-comment/${gpId}/handle-like`);
};

const handleDislikeGPService = (gpId) => {
  return service.patch(`/group-comment/${gpId}/handle-dislike`);
};

const handleLoveGPService = (gpId) => {
  return service.patch(`/group-comment/${gpId}/handle-dislike`);
};


export {
  getAllGPService,
  createGPService,
  deleteGPService,
  handleLikeGPService,
  handleDislikeGPService,
  handleLoveGPService,
};
