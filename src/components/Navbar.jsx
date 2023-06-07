import {Link} from "react-router-dom"

export default function Navbar() {
  return (
    <div>
        <Link to="/auth/login">Login</Link>
        <Link to="/auth/signup">Signup</Link>

        <Link to="/admin">Admin</Link>

        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>

        <Link to="/group/list">Group list</Link>

        <Link to="/game/list">Games list</Link>
    </div>
  )
}
