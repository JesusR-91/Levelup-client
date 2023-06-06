import { useEffect, useState } from "react";
import { getAllGCService, handleDislikeGCService, handleLikeGCService, handleLoveGCService } from "../services/groupComment.services";
import { useNavigate, useParams } from "react-router-dom";
import CreateGroupComment from "./CreateGroupComment";

export default function GroupCommentList() {

    //STATES
  const [groupComment, setGroupComment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const {groupId} = useParams();

  //FUNCTIONS
  const getData = async () => {
    try {
      const allResponse = await getAllGCService(groupId);
      const gcUpdated = allResponse.data;
      gcUpdated.forEach((gc) => {
        const gcDate = gc.createdAt;
        gc.createdAt =
          new Date(gcDate).toTimeString().slice(0, 8) +
          " - " +
          new Date(gcDate).toDateString();
      });
      setGroupComment(gcUpdated);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleLike = async (valId) => {
    try {
      await handleLikeGCService(valId);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleDislike = async (valId) => {
    try {
      await handleDislikeGCService(valId);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleLove = async (valId) => {
    try {
      await handleLoveGCService(valId);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };


  useEffect(() => {
    getData();
  }, []);

  return !isLoading ? (
    <div>
        <CreateGroupComment/>

        <h3>Comments:</h3>
      {groupComment.map((groupComment) => (
        <div key={groupComment._id}>
          <h4>
            {groupComment.owner.username} - <span>{groupComment.createdAt}</span>
          </h4>
          <p>{groupComment.content}</p>
          <div>
            <button
              style={{
                width: "10px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                handleLike(groupComment._id);
              }}
            >
              <img
                src="../../public/icons8-zombie-hand-thumbs-up-100.png"
                alt="thumbUp"
                width={"20px"}
              />
            </button>
            <button
              style={{
                width: "10px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                handleDislike(groupComment._id);
              }}
            >
              <img
                src="../../public/icons8-zombie-hand-thumbs-dow-100.png"
                alt="thumbUp"
                width={"20px"}
              />
            </button>
            <button
              style={{
                width: "10px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                handleLove(groupComment._id);
              }}
            >
              <img
                src="../../public/icons8-pixel-heart-white.png"
                alt="thumbUp"
                width={"20px"}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <h4>Loading</h4>
  );
}
