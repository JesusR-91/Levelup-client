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

const handleLikeValuationService = (valuationId) => {
  return service.patch(`/valuation/${valuationId}/add-like`);
};


const handleDislikeValuationService = (valuationId) => {
  return service.patch(`/valuation/${valuationId}/handle-dislike`);
};


const handleLoveValuationService = (valuationId) => {
  return service.patch(`/valuation/${valuationId}/handle-love`);
};



  export {allValuationServices, newValuationService, deleteValuationService, handleLikeValuationService, handleDislikeValuationService, handleLoveValuationService}