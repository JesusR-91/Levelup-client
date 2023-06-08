//IMPORTS
import { useContext, useEffect, useState } from "react";
import { gameListService } from "../../services/games.services";
import { Link } from "react-router-dom";
import GameSearchBar from "../../components/games/GameSearchBar";
import { Card, Button } from "react-bootstrap";
import { ThemeContext } from "../../context/theme.context";
import { PuffLoader } from "react-spinners";


//IMGS
import lefArrowDark from "../../assets/icons8-arrow-64-left-dark.png";
import rightArrowDark from "../../assets/icons8-arrow-64-right-dark.png";
import lefArrowLight from "../../assets/icons8-arrow-64-left-light.png";
import rightArrowLight from "../../assets/icons8-arrow-64-right-light.png";

export default function GameList() {

  //STATES
  const [gameList, setGameList] = useState([]);
  const [page, setPage] = useState(1);

  //OTHER VARS
  const {isDarkMode, cardTheme} = useContext (ThemeContext);

  //FUNCTIONS
  const getData = async () => {
    try {
      const response = await gameListService(page);
      setGameList(response.data);
    } catch (error) {
      console.log(error);
    }  
  }

  const handleLeftArrow = () => page > 1 && setPage(page - 1);
  const handleRightArrow = () => setPage(page + 1);

  useEffect(() => {
    getData();
  }, [page]);

  return gameList.length > 0 ? (
    <div>
      <GameSearchBar/>

      <h2>Game list</h2>

      <div style={{display: "flex", flexDirection:"row", justifyContent:"space-between"}}>
        <Button onClick={handleLeftArrow} style={{backgroundColor:"transparent", borderColor:"transparent"}}> <img src={isDarkMode ? lefArrowDark : lefArrowLight} alt="left-arrow"/> </Button>
        <Button onClick={handleRightArrow} style={{backgroundColor:"transparent", borderColor:"transparent"}} > <img src={isDarkMode ? rightArrowDark : rightArrowLight} alt="right-arrow" /> </Button>
      </div>
      
      <br />

      <div style={{display:"flex", flexWrap: "wrap", gap:"50px", justifyContent: "space-evenly", alignItems:"center"}}>
        {gameList.map((game) => (
          <Card className={cardTheme} key={game.id}>
            <Link to={`/game/${game.id}/details`} style={{ textDecoration: "none" }}>
              <Card.Img variant="top" src={game.background_image} alt={game.name} style={{ maxWidth: "200px", maxHeight: "100px" }}/>
              <Card.Body>
                <Card.Title>
                  <h5>{game.name}</h5>
                  </Card.Title>
              </Card.Body>
            </Link>
            <p>Released date: {game.released}</p>
            <p>Metacritic: {game.metacritic}</p>
            {game.esrb_rating?.name && (<p>Rating: {game.esrb_rating.name}</p>)}
          </Card>
        ))}
      </div>

      <div style={{display: "flex", flexDirection:"row", justifyContent:"space-between"}}>
        <Button onClick={handleLeftArrow} style={{backgroundColor:"transparent", borderColor:"transparent"}}> <img src={isDarkMode ? lefArrowDark : lefArrowLight} alt="left-arrow"/> </Button>
        <Button onClick={handleRightArrow} style={{backgroundColor:"transparent", borderColor:"transparent"}} > <img src={isDarkMode ? rightArrowDark : rightArrowLight} alt="right-arrow" /> </Button>
      </div>
    </div>
  ) : (<div className="spinners">
          <PuffLoader color="white" size={120} />
      </div>)
}