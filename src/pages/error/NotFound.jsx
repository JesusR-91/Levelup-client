//IMPORT
import { Link } from "react-router-dom";
import image from "../../assets/gandalf.jpg";

export default function NotFound() {
  return (
    <div style={{display:"flex", justifyContent:"center", justifyItems:"center"}}>
     <Link to={"/"} ><img src={image} alt="Error 400"/></Link>
    </div>
  )
}
