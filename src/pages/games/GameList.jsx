import axios from "axios"
import { useEffect, useState } from "react";

export default function GameList() {
  const [gameList, setGameList] = useState([]);

  let page = 1;
  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/api/games/list/${page}`);
      setGameList(response.data);
      console.log(gameList)
    } catch (error) {
      console.log(error);
    }
        
  }

  useEffect(()=>{ getData()}, [])

  return gameList.length > 0 ?  (
    <div>
      <h2>Game list</h2>

      <div style={{display:"flex", flexWrap: "wrap", gap:"50px", justifyContent: "space-evenly", alignItems:"center"}}>
        {gameList.map((game) => 
          (
            <div key={game.id}>
            <img src={game.background_image} alt={game.name}  style={{maxWidth: "200px"}}/>
              <h5>{game.name}</h5>
              <p>Released date: {game.released}</p>
              <p>Metacritic puntuation: {game.metacritic}</p>
              <p>Rating: {game.esrb_rating.name}</p>
            </div>
          )
        )}
      </div>

    </div>
  ): (<h3>Loading...</h3>)
}

