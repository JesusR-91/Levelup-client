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
  
  const handleLikePublicationService = (publicationID) => {
    return service.patch(`/publication/${publicationID}/handle-like`);
  };
  
  const handleDislikePublicationService = (publicationID) => {
    return service.patch(`/publication/${publicationID}/handle-dislike`);
  };
  
  const handleLovePublicationService = (publicationID) => {
    return service.patch(`/publication/${publicationID}/handle-love`);
  };
  

  
  export { allPublicationsService, newPublicationService, deletePublicationService, friendsPublicationService, handleLikePublicationService, handleDislikePublicationService, handleLovePublicationService};
  