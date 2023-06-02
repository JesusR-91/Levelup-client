import service from "./config.services";

const allPublications = () => {

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

    return service.get("/publications");
  };
  

  
  export { allPublications, newPublication, deletePublication, friendsPublication };
  