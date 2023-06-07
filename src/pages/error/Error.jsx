import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div>
     <Link to={"/"} ><img src={"../public/itsatrap.png"} alt="Error 400"/></Link>
    </div>
  )
}
