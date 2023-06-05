import service from "./config.services";

const allPublicationsService = () => {

    return service.get("/publication");
  };
  
  const newPublicationService = (content) => {
    return service.post("/publication", {content});
  };
  
  const deletePublicationService = (deletePublication) => {
    return service.delete(`/publication/${deletePublication}`);
  };
  
  const friendsPublicationService = () => {
    return service.get(`/publication/friendList`);
  };
  
  const addLikePublicationService = (publicationID) => {
    return service.patch(`/publication/${publicationID}/add-like`);
  };
  
  const deleteDislikePublicationService = (publicationID) => {
    return service.patch(`/publication/${publicationID}/delete-like`);
  };
  
  const adDislikePublicationService = (publicationID) => {
    return service.patch(`/publication/${publicationID}/add-dislike`);
  };
  
  const deleteLikePublicationService = (publicationID) => {
    return service.patch(`/publication/${publicationID}/delete-dislike`);
  };
  
  const addLovePublicationService = (publicationID) => {
    return service.patch(`/publication/${publicationID}/add-dislike`);
  };
  
  const deleteLovePublicationService = (publicationID) => {
    return service.patch(`/publication/${publicationID}/delete-love`);
  };

  
  export { allPublicationsService, newPublicationService, deletePublicationService, friendsPublicationService, addLikePublicationService, deleteDislikePublicationService, adDislikePublicationService, deleteLikePublicationService, addLovePublicationService, deleteLovePublicationService};
  