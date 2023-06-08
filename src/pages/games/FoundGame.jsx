//IMPORTS
import { useEffect, useState, useContext } from "react";
import { findAGameService } from "../../services/games.services";
import { Link, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import { ThemeContext } from "../../context/theme.context";
import { PuffLoader } from "react-spinners";

export default function FoundGame() {
  //STATES
  const [gameList, setGameList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //OTHER VARIABLES
  const {queryValue} = useParams()
  const {cardTheme} = useContext (ThemeContext);

  //FUNCTIONS
  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await findAGameService(queryValue);
      setGameList(response.data);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }    
  }

  useEffect(()=>{ getData()}, []);

  return !isLoading ? (
    <div>
      <h2>Game list</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "50px",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {gameList.map((game) => (
          <Card className={cardTheme} key={game.id}>
          <Link to={`/game/${game.id}/details`} style={{ textDecoration: "none" }}>
            <img
              src={game.background_image}
              alt={game.name}
              style={{ maxWidth: "200px" }}
            />
            <h5>{game.name}</h5>
          </Link>
            <p>Released date: {game.released}</p>
            <p>Metacritic: {game.metacritic}</p>
            {game.esrb_rating?.name && <p>Rating: {game.esrb_rating.name}</p>}
          </Card>
        ))}
      </div>
    </div>
  ): (
    <div className="spinners">
      <PuffLoader color="white" size={120} />
    </div>
  )
}
