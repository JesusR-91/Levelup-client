import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
     <Link to={"/"} ><img src={"../public/gandalf.jpg"} alt="Error 400"/></Link>
    </div>
  )
}
