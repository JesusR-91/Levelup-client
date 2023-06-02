import service from "./config.services";

const allPublications = () => {
    return service.get("/publications");
  };
  
  const newPublication = () => {
    return service.post("/publications");
  };
  
  const deletePublication = (deletePublicationId) => {
    return service.delete(`/publications/${deletePublicationId}`);
  };
  
  const friendsPublication = () => {
    return service.get(`/publications/friendList`);
  };
  
  export { allPublications, newPublication, deletePublication, friendsPublication };
  