import service from "./config.services";

const allPublications = (allPubli) => {
    return service.get("/publications", allPubli);
  };
  
  const newPublication = (newPubli) => {
    return service.post("/publications", newPubli);
  };
  
  const deletePublication = (deletePubli) => {
    return service.delete(`/publications/${deletePubli}`);
  };
  
  const friendsPublication = (friendsPubli) => {
    return service.get(`/publications/friendList`, friendsPubli);
  };
  
  export { allPublications, newPublication, deletePublication, friendsPublication };
  