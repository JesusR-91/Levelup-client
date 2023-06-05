import service from "./config.services";

const allValuationServices = gameId => {
    return service.get(`/valuation/${gameId}`)
}

const newValuationService = (gameId, content, value) => {
    return service.post(`/valuation/${gameId}`, {content, value});
  };
  
const deleteValuationService = (valuationId) => {
  return service.delete(`/valuation/${valuationId}`);
};

const addLikeValuationService = (valuationId) => {
  return service.patch(`/valuation/${valuationId}/add-like`);
};

const deleteDislikeValuationService = (valuationId) => {
  return service.patch(`/valuation/${valuationId}/delete-like`);
};

const addDislikeValuationService = (valuationId) => {
  return service.patch(`/valuation/${valuationId}/add-dislike`);
};

const deleteLikeValuationService = (valuationId) => {
  return service.patch(`/valuation/${valuationId}/delete-dislike`);
};

const addLoveValuationService = (valuationId) => {
  return service.patch(`/valuation/${valuationId}/add-dislike`);
};

const deleteLoveValuationService = (valuationId) => {
  return service.patch(`/valuation/${valuationId}/delete-love`);
};

  export {allValuationServices, newValuationService, deleteValuationService, addLikeValuationService, deleteDislikeValuationService, addDislikeValuationService, deleteLikeValuationService, addLoveValuationService, deleteLoveValuationService}