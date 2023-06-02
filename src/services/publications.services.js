import service from "./config.services";

const allPublications = () => {
<<<<<<< HEAD
    return service.get("/publication");
  };
  
  const newPublication = () => {
    return service.post("/publication");
  };
  
  const deletePublication = (deletePubli) => {
    return service.delete(`/publication/${deletePubli}`);
  };
  
  const friendsPublication = () => {
    return service.get(`/publication/friendList`);
=======
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
>>>>>>> b0e798b7d176730146897d4af15839bef6ad4930
  };
  
  export { allPublications, newPublication, deletePublication, friendsPublication };
  