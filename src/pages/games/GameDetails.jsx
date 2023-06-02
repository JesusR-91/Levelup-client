import { useEffect, useState } from "react"
import { gameDetailsService } from "../../services/games.services";
import { useParams } from "react-router-dom";

export default function GameDetails() {
  const [game, setGame] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const {gameId} = useParams();

  const getData = async () => {
    try {
      const response = await gameDetailsService(gameId);
      setGame(response.data);
      setIsLoading(false)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{getData()},[]);

  return !isLoading ? (
    <div>
      <br />
      <img src={game.background_image} alt={game.name} style={{width:"300px"}}/>
      <h3>{game.name}</h3>
      <p>{game.description_raw}</p>
     
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-evenly"}}>
      <div>
        <div>
          <p><b>Genre: </b>{game.genres.map(genre =>(<span key={genre.id}>{genre.name} | </span>))}</p>
           <p><b>Developers: </b>{game.developers.map(dev => (dev.name))}</p>
           <p><b>Publisher: </b>{game.publishers.map(pub => (pub.name))}</p>

           {game.esrb_rating?.name && (<p>Rating: {game.esrb_rating.name}</p>)}
          <p>Metacritic: {game.metacritic}</p>
        </div>
      </div>
        <table>
          <tr> 
          <th>Platforms</th> 
          </tr>
            {game.platforms.map(plat =>(<tr key={plat.platform.id}><th>{plat.platform.name}</th></tr>))}
        </table>
      </div>
      <br />

      <a href={game.website}>Oficial website</a>

    </div>
  ) : <h3>Loading...</h3>
}
