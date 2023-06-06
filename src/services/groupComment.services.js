import service from "./config.services";

const getAllGCService = (gcId) => {
  return service.get(`/group-comment/${gcId}`);
};

const createGCService = (gcId, content) => {
  return service.post(`/group-comment/${gcId}`, {content});
};

const deleteGCService = (gcId) => {
  return service.delete(`/group-comment/${gcId}`);
};

const handleLikeGCService = (gcId) => {
  return service.patch(`/group-comment/${gcId}/handle-like`);
};

const handleDislikeGCService = (gcId) => {
  return service.patch(`/group-comment/${gcId}/handle-dislike`);
};

const handleLoveGCService = (gcId) => {
  return service.patch(`/group-comment/${gcId}/handle-dislike`);
};


export {
  getAllGCService,
  createGCService,
  deleteGCService,
  handleLikeGCService,
  handleDislikeGCService,
  handleLoveGCService,
};
