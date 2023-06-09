//IMPORTS
import { Button } from "react-bootstrap";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/auth.context";
import { ThemeContext } from "./context/theme.context";

//COMPONENTS AND PAGES
import MyNavbar from "./components/MyNavbar";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Error from "./pages/error/Error";
import NotFound from "./pages/error/NotFound";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import UserInfo from "./pages/UserInfo";
import GroupList from "./pages/groups/GroupList";
import GroupDetails from "./pages/groups/GroupDetails";
import GameList from "./pages/games/GameList";
import GameDetails from "./pages/games/GameDetails";
import FoundGame from "./pages/games/FoundGame";
import IsLogged from "./components/auth/IsLogged";
import IsAdmin from "./components/auth/IsAdmin";

//IMG
import darkThemeLogo from "./assets/icons8-dark-24.png";
import lightThemeLogo from "./assets/icons8-sun-50.png";


function App() {
  //STATE
  const {activeUser} = useContext(AuthContext);
  const {isDarkMode, toggleTheme} = useContext (ThemeContext);

  return (
    <div className = {isDarkMode ? "app-dark" : "app-light"}>
      {activeUser && (<MyNavbar/>)}
      <div style={{display:"flex", justifyContent:"flex-end", padding:"2vh"}}>
        <Button onClick={toggleTheme} style={{backgroundColor:"transparent", borderColor:"transparent"}}><img src={isDarkMode ? darkThemeLogo: lightThemeLogo} alt="theme" width={"35px"}/></Button>
      </div>
      

      <Routes>
        <Route path="/auth/signup" element={<Signup/>} />
        <Route path="/auth/login" element={<Login/>} />


        <Route path="/admin" element={<IsLogged> <IsAdmin><Admin/></IsAdmin></IsLogged>} />

        <Route path="/" element={<IsLogged><Home/></IsLogged>} />
        <Route path="/profile" element={<IsLogged><Profile/></IsLogged>} />
        <Route path="/user/:userId" element={<IsLogged><UserInfo/></IsLogged>} />

        <Route path="/group/list" element={<IsLogged><GroupList/></IsLogged>} />
        <Route path="/group/:groupId/details" element={<IsLogged><GroupDetails/></IsLogged>} />

        <Route path="/game/list" element={<IsLogged><GameList/></IsLogged>} />
        <Route path="/game/:gameId/details" element={<IsLogged><GameDetails /></IsLogged>} />
        <Route path="/game/found-games/:queryValue" element={<IsLogged><FoundGame/></IsLogged>}/>

        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
