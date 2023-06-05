import { useEffect, useState } from "react";
import { findAGameService } from "../../services/games.services";
import { Link, useParams } from "react-router-dom";

export default function FoundGame() {
  const [gameList, setGameList] = useState([]);
  const {queryValue} = useParams()

  const getData = async () => {
    try {
      const response = await findAGameService(queryValue);
      setGameList(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }    
  }

  useEffect(()=>{ getData()}, []);

  return (
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
          <Link to={`/game/${game.id}/details`} key={game.id}>
            <img
              src={game.background_image}
              alt={game.name}
              style={{ maxWidth: "200px" }}
            />
            <h5>{game.name}</h5>
            <p>Released date: {game.released}</p>
            <p>Metacritic: {game.metacritic}</p>
            {game.esrb_rating?.name && <p>Rating: {game.esrb_rating.name}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}
