import service from "./config.services";

const allPublicationsService = () => {

    return service.get("/publication");
  };
  
  const newPublicationService = () => {
    return service.post("/publication");
  };
  
  const deletePublicationService = (deletePubli) => {
    return service.delete(`/publication/${deletePubli}`);
  };
  
  const friendsPublicationService = () => {
    return service.get(`/publication/friendList`);
  };
  

  
  export { allPublicationsService, newPublicationService, deletePublicationService, friendsPublicationService};
  