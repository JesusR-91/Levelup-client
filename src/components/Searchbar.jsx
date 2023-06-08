import { useState } from "react"
import { friendQueryService } from "../services/user.services";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";


export default function Searchbar() {
  const [queryValue, setQueryValue] = useState("");
  const handleForm = ({target}) => {setQueryValue(target.value)};
  const [errorMessage, setErrorMessage] = useState()

  const navigate = useNavigate();

  const handleSubmitForm = async (e) =>{
    e.preventDefault();

    try {
      const response = await friendQueryService(queryValue);
      navigate(`/user/${response.data._id}`);
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        console.log(error.response.data.errorMessage)
        setErrorMessage(error.response.data.errorMessage)
        return;
      }
      navigate("/error")
    }
  }

  return (
    <div style={{padding:"2vh"}}>
      <form onSubmit={handleSubmitForm} style={{display:"flex", flexDirection:"row", justifyContent:"center", gap:"2vh"}}>
        <input type="text" name="queryValue" onChange={handleForm} value={queryValue} placeholder="Put your friends username" style={{width:"20vw", height:"6vh"}}/>
        <Button type="submit" disabled = {!queryValue ? true : false}>Find it!</Button>
      </form>
      {errorMessage && <p style={{color:"red"}}>{errorMessage}</p> }
    </div>
  )
}
