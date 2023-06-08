import IsAdmin from "./auth/IsAdmin"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SearchBar from "./Searchbar.jsx";


export default function MyNavbar() {

  return (
    <Navbar style={{border:"white solid 1px", borderRadius:"10px"}} variant="dark">
      <Container>

        <IsAdmin><Nav.Link href="/admin">Admin</Nav.Link></IsAdmin> 

        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/profile">Profile</Nav.Link>

        <Nav.Link href="/group/list">Group list</Nav.Link>

        <Nav.Link href="/game/list">Games list</Nav.Link>

      <SearchBar/>

      </Container>
    </Navbar>
  )
}
