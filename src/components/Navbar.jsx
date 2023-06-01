import {Link} from "react-router-dom"

export default function Navbar() {
  return (
    <div>
        <Link to="/auth/login">Login</Link>
        <Link to="/auth/signup">Signup</Link>
    </div>
  )
}
