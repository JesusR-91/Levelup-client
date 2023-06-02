import { useEffect, useState } from "react";
import { gameListService } from "../../services/games.services";
import { Link } from "react-router-dom";

export default function GameList() {
  const [gameList, setGameList] = useState([]);
  const [page, setPage] = useState(1)

  const getData = async () => {
    try {
      const response = await gameListService(page);
      setGameList(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
        
  }

  const handleLeftArrow = () => page > 1 && setPage(page - 1);
  const handleRightArrow = () => setPage(page + 1);


  useEffect(()=>{ getData()}, [page]);

  return gameList.length > 0 ?  (
    <div>
      <h2>Game list</h2>

      <div style={{display:"flex", flexWrap: "wrap", gap:"50px", justifyContent: "space-evenly", alignItems:"center"}}>
        {gameList.map((game) => 
          (
            <Link to={`/game/${game.id}/details`} key={game.id}>
              <img src={game.background_image} alt={game.name}  style={{maxWidth: "200px"}}/>
                <h5>{game.name}</h5>
                <p>Released date: {game.released}</p>
                <p>Metacritic: {game.metacritic}</p>
                {game.esrb_rating?.name && (<p>Rating: {game.esrb_rating.name}</p>)}
            </Link>
          )
        )}
      </div>

      <div style={{display: "flex", flexDirection:"row", justifyContent:"space-between"}}>
        <button onClick={handleLeftArrow}> <img src="../../../public/icons8-back-arrow-60-left.png" alt="left-arrow" /> </button>
        <button onClick={handleRightArrow} > <img src="../../../public/icons8-back-arrow-60-rigth.png" alt="right-arrow" /> </button>
      </div>

    </div>
  ): (<h3>Loading...</h3>)
}

