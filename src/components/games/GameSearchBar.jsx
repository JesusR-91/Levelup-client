import { useState } from "react"
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function GameSearchBar() {

    const [queryValue, setQueryValue] = useState("");
    const handleForm = ({target}) => {setQueryValue(target.value)};
  
    const navigate = useNavigate();
  
    const handleSubmitForm = async () =>{
      try {
        navigate(`/game/found-games/${queryValue}`);
      } catch (error) {
        console.log(error);
        navigate("/error")
      }
    }
  
  return (
    <div>
    <form onSubmit={handleSubmitForm}>
        <input type="text" name="queryValue" onChange={handleForm} value={queryValue} placeholder="What game are you looking for?" style={{width:"400px"}}/>
        <Button>Find it!</Button>
    </form>
    </div>
  )
}
