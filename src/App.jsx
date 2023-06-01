import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />

        <Route path="/admin" element={<Admin />} />

        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/:userId" element={<UserInfo />} />

        <Route path="/group/list" element={<GroupList />} />
        <Route path="/group/:groupId" element={<GroupDetails />} />

        <Route path="/game/list" element={<GameList />} />
        <Route path="/game/:gameId/details" element={<GameDetails />} />

        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
