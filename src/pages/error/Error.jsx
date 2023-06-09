//IMPORTS
import { Link } from "react-router-dom";
import image from "../../assets/itsatrap.png";

export default function Error() {
  return (
    <div style={{display:"flex", justifyContent:"center", justifyItems:"center"}}>
     <Link to={"/"} ><img src={image} alt="Error 400"/></Link>
    </div>
  )
}
