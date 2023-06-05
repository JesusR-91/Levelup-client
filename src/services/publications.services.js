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
  

  
  export { allPublicationsService, newPublicationService, deletePublicationService, friendsPublicationService};
  