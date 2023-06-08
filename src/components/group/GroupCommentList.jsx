import { useContext, useEffect, useState } from "react";
import { deleteGCService, getAllGCService, handleDislikeGCService, handleLikeGCService, handleLoveGCService } from "../../services/groupComment.services";
import { useNavigate, useParams } from "react-router-dom";
import CreateGroupComment from "./CreateGroupComment";
import { AuthContext } from "../../context/auth.context";
import likeImg from "../../assets/icons8-zombie-hand-thumbs-up-100.png";
import dislikeImg from "../../assets/icons8-zombie-hand-thumbs-dow-100.png";
import loveImg from "../../assets/icons8-pixel-heart-white.png";

export default function GroupCommentList() {

    //STATES
  const [groupComment, setGroupComment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);

  //OTHER VARIABLES
  const {activeUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const {groupId} = useParams();

  //FUNCTIONS
  const getData = async () => {
    try {
      setIsLoading(true)
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

  //REACTIONS HANDLERS
  const handleLike = async (valId) => {
    try {
      await handleLikeGCService(valId);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleDislike = async (valId) => {
    try {
      await handleDislikeGCService(valId);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleLove = async (valId) => {
    try {
      await handleLoveGCService(valId);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };
  //DELETE DE COMMENT
  const handleValuation = async (valId) =>{
    try {
      await deleteGCService(valId);
      setReload(!reload)
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  }


  useEffect(() => {
    getData();
  }, [reload]);

  return !isLoading ? (
    <div>
        <CreateGroupComment setReload={setReload}/>

        <h3>Comments:</h3>
      {groupComment.map((groupComment) => (
        <div key={groupComment._id}>
          <h4>
            {groupComment.owner.username} - <span>{groupComment.createdAt}</span>
          </h4>
          <p>{groupComment.content}</p>
          <div>
            {groupComment.likes.length > 0 && (groupComment.likes.length > 1 ? (<p>{groupComment.likes.length} Likes</p>): (<p>{groupComment.likes.length} Like</p>))}
            {groupComment.loves.length > 0 &&  (groupComment.loves.length > 1 ? (<p>{groupComment.loves.length} Likes</p>): (<p>{groupComment.loves.length} Love</p>))}
            {groupComment.dislikes.length > 0 && (groupComment.dislikes.length > 1 ? (<p>{groupComment.dislikes.length} Likes</p>): (<p>{groupComment.dislikes.length} Dislikes</p>))}
          </div>
          <div>
            <button
              style={{width: "10px",height: "20px", display: "flex", alignItems: "center", justifyContent: "center",}} 
              onClick={() => {
                handleLike(groupComment._id);
              }}>
              <img src={likeImg} alt="thumbUp" width={"20px"}/>
            </button>
            <button
              style={{width: "10px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center",}}
              onClick={() => {
                handleDislike(groupComment._id);
              }}>
              <img src={dislikeImg} alt="thumbUp" width={"20px"}/>
            </button>
            <button
              style={{width: "10px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center",}}
              onClick={() => {
                handleLove(groupComment._id);
              }}>
              <img src={loveImg} width={"20px"}/>
            </button>
          </div>
        {(groupComment.owner._id === activeUser._id) && (<button onClick={()=>{handleValuation(groupComment._id)}}>Delete valuation</button>)}
        </div>
      ))}
    </div>
  ) : (
    <h4>Loading</h4>
  );
}
