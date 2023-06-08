//IMPORTS
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchBar from "./Searchbar.jsx";
import { useContext, useEffect} from 'react';
import { AuthContext } from '../context/auth.context.jsx';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/theme.context.jsx';

//IMG
import homeLogo from "../assets/icons8-home-white-64.png";
import homeLogoBlack from "../assets/icons8-home-64.png";
import adminLogo from "../assets/icons8-gear-white-64.png";
import adminLogoBlack from "../assets/icons8-gear-64.png";
import userLogo from "../assets/icons8-male-user-white-64.png";
import userLogoBlack from "../assets/icons8-male-user-64.png";
import groupLogo from "../assets/icons8-group-white-50.png";
import groupLogoBlack from "../assets/icons8-group-50.png";
import gameLogo from "../assets/icons8-games-white-50.png";
import gameLogoBlack from "../assets/icons8-games-50.png";
import logoutLogo from "../assets/icons8-logout-50-white.png";
import logoutLogoBlack from "../assets/icons8-logout-50.png";


export default function MyNavbar() {

  //VARIABLES
    const {isAdmin, activeUser, setActiveUser} = useContext(AuthContext);
    const {isDarkMode} = useContext(ThemeContext)
    const navigate = useNavigate();

  //FUNCTIONS
  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/auth/login");
    setActiveUser()
  }


  useEffect(()=>{}, [])

  return activeUser && (
    <Navbar style={{border:"solid 1px", borderRadius:"10px"}} variant="dark">
      <Container>

        {isAdmin && <Nav.Link href="/admin"><img src={isDarkMode ? adminLogo : adminLogoBlack} alt="admin" width={"50vh"}/></Nav.Link>}

        <Nav.Link href="/"><img src={isDarkMode ? homeLogo : homeLogoBlack} alt="home" width={"50vw"}/></Nav.Link>
        <Nav.Link href="/profile"><img src={isDarkMode ? userLogo : userLogoBlack} alt="user" width={"40vw"}/></Nav.Link>

        <Nav.Link href="/group/list"><img src={isDarkMode ? groupLogo : groupLogoBlack}  alt="groups" width={"40vw"}/></Nav.Link>

        <Nav.Link href="/game/list"><img src={isDarkMode ? gameLogo : gameLogoBlack} alt="games" width={"40vw"}/></Nav.Link>

        <Nav.Link onClick={logout}> <img src={isDarkMode ? logoutLogo : logoutLogoBlack} alt="logout" width={"40vw"}/> </Nav.Link>

      <SearchBar/>

      </Container>
    </Navbar>
  )
}
