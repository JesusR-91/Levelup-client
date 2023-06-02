import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  allPublications,
  friendsPublication,
} from "../services/publications.services.js";

export default function PublicationList() {
  const [publication, setPublication] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const getData = async () => {
    try {
      const allResponse = await allPublications();
      const friendResponse = await friendsPublication();

      const publicationUpdated = [...allResponse.data, ...friendResponse.data];
      publicationUpdated.forEach((publication) => {
        const publicationDate = publication.createdAt;
        publication.createdAt = new Date(publicationDate).toTimeString().slice(0,8) + " - " + new Date(publicationDate).toDateString();
      });
      setPublication(publicationUpdated);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };


  console.log(publication);
  useEffect(() => {
    getData();
  }, []);

  return !isLoading ? (
    <div>
      {publication.map((eachPubl) => (
        <div key={eachPubl._id}>
          <h4>{eachPubl.owner.username} - <span>{eachPubl.createdAt}</span></h4>
          <p>{eachPubl.content}</p>
        </div>
      ))}
    </div>
  ) : (
    <h4>Loading</h4>
  );
}
