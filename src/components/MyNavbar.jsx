import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchBar from "./Searchbar.jsx";
import { useContext, useEffect, useState} from 'react';
import { AuthContext } from '../context/auth.context.jsx';
import { useNavigate } from 'react-router-dom';


export default function MyNavbar() {

    const [reload, setReload] = useState(false);
  //VARIABLES
    const {isAdmin, activeUser} = useContext(AuthContext);
    const navigate = useNavigate();

  //FUNCTIONS
  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/auth/login");
    setReload(!reload);
  }


  useEffect(()=>{}, [reload])

  return activeUser && (
    <Navbar style={{border:"white solid 1px", borderRadius:"10px"}} variant="dark">
      <Container>

        {isAdmin && <Nav.Link href="/admin">Admin</Nav.Link>}

        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/profile">Profile</Nav.Link>

        <Nav.Link href="/group/list">Group list</Nav.Link>

        <Nav.Link href="/game/list">Games list</Nav.Link>

        <Nav.Link onClick={logout}>Logout</Nav.Link>

      <SearchBar/>

      </Container>
    </Navbar>
  )
}
