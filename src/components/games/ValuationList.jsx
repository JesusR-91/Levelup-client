import { useNavigate, useParams } from "react-router-dom";
import {
  handleLikeValuationService,
  allValuationServices,
  handleDislikeValuationService,
  handleLoveValuationService,
  deleteValuationService,
} from "../../services/valuation.services";
import { useContext, useEffect, useState } from "react";
import CreateValuation from "./CreateValuation";
import { AuthContext } from "../../context/auth.context";
import likeImg from "../../assets/icons8-zombie-hand-thumbs-up-100.png";
import dislikeImg from "../../assets/icons8-zombie-hand-thumbs-dow-100.png";
import loveImg from "../../assets/icons8-pixel-heart-white.png";
import { Button, Card, Col, CardGroup } from "react-bootstrap";

export default function ValuationsList() {
  //STATES
  const [valuation, setValuations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [average, setAverage] = useState(0);
  const [reload, setReload] = useState(false);

  //OTHER VARIABLE
  const { activeUser } = useContext(AuthContext);
  const { gameId } = useParams();

  //FUNCTIONS
  const navigate = useNavigate();
  const getData = async () => {
    try {
      const response = await allValuationServices(gameId);
      const allValuations = response.data;
      setIsLoading(true);
      setValuations(allValuations);
      setIsLoading(false);

      //making the average rating
      let values = 0;
      allValuations.forEach((val) => (values += val.value));
      values = values / allValuations.length;
      setAverage(values);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  //REACTION HANDLERS
  const handleLike = async (valId) => {
    try {
      await handleLikeValuationService(valId);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleDislike = async (valId) => {
    try {
      await handleDislikeValuationService(valId);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleLove = async (valId) => {
    try {
      await handleLoveValuationService(valId);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  //DELETE THE COMMENT
  const handleValuation = async (valId) => {
    try {
      await deleteValuationService(valId);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  useEffect(() => {
    getData();
  }, [reload]);

  return !isLoading ? (
    <div>

      <CreateValuation getData={getData} />
    
      <div md={4} className="overflow-auto" style={{ maxHeight: "65vh" }}>

      <h4>
        Valuation List - Average: {"★".repeat(Math.floor(average))}
        {"☆".repeat(5 - Math.floor(average))}{" "}
      </h4>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "5rem 30rem",
        }}
      >
        {valuation.map((eachValue) => (
          <div key={eachValue._id}>
            <Card
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "lightgrey",
                margin: "2rem 3rem 0 3rem",
                maxWidth: "30vw",
              }}
            >
              <Card.Body>
                <Card.Title>
                  <span>{eachValue.createdAt}</span> -{" "}
                  {eachValue.owner.username} -{" "}
                  {"★".repeat(Math.floor(eachValue.value))}
                  {"☆".repeat(5 - Math.floor(eachValue.value))}
                </Card.Title>
                <Card.Text>{eachValue.content}</Card.Text>
                <Card.Text>{eachValue.updateAt}</Card.Text>
                <div>
                  {eachValue.likes.length > 0 &&
                    (eachValue.likes.length > 1 ? (
                      <p>{eachValue.likes.length} Likes</p>
                    ) : (
                      <p>{eachValue.likes.length} Like</p>
                    ))}
                  {eachValue.loves.length > 0 &&
                    (eachValue.loves.length > 1 ? (
                      <p>{eachValue.loves.length} Loves</p> 
                    ) : (
                      <p>{eachValue.loves.length} Love</p>
                    ))}
                  {eachValue.dislikes.length > 0 &&
                    (eachValue.dislikes.length > 1 ? (
                      <p>{eachValue.dislikes.length} Dislikes</p>
                    ) : (
                      <p>{eachValue.dislikes.length} Dislike</p> 
                    ))}
                </div>
                <div>
                  <Button
                    style={{
                      width: "10px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      handleLike(eachValue._id);
                    }}
                  >
                    <img src={likeImg} alt="thumbUp" width={"20px"} />
                  </Button>
                  <Button
                    style={{
                      width: "10px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      handleDislike(eachValue._id);
                    }}
                  >
                    <img src={dislikeImg} alt="thumbUp" width={"20px"} />
                  </Button>
                  <Button
                    style={{
                      width: "10px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      handleLove(eachValue._id);
                    }}
                  >
                    <img src={loveImg} alt="thumbUp" width={"20px"} />
                  </Button>
                </div>
                {eachValue.owner._id === activeUser._id && (
                  <Button
                    onClick={() => {
                      handleValuation(eachValue._id); 
                    }}
                  >
                    Delete valuation
                  </Button>
                )}
              </Card.Body>
            </Card>
          </div>
        ))}
        </div >
      </div>
    </div>
  ) : (
    <h3>Loading...</h3>
  );
}