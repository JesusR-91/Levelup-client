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

  export {allValuationServices, newValuationService, deleteValuationService}