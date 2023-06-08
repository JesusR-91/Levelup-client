//IMPORTS
import { useContext, useState } from "react"
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/theme.context";


export default function GameSearchBar() {

    //STATES
    const [queryValue, setQueryValue] = useState("");

    const navigate = useNavigate();
    const {buttonTheme} = useContext (ThemeContext);

    //FUNCTIONS
    const handleForm = ({target}) => {setQueryValue(target.value)};
    const handleSubmitForm = async () =>{
      try {
        navigate(`/game/found-games/${queryValue}`);
      } catch (error) {
        console.log(error);
        navigate("/error")
      }
    }
  
  return (
    <Form onSubmit={handleSubmitForm}>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", gap:"1vw", padding:"2vh"}}>
          <Form.Control type="text" name="queryValue" onChange={handleForm} value={queryValue} placeholder="What game are you looking for?" style={{width:"400px"}}/>
          <Button className={buttonTheme} type="submit">Find it!</Button>
        </div>
      </Form>
  )
}
