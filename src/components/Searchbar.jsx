import { useState } from "react"
import { friendQueryService } from "../services/user.services";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
  const [queryValue, setQueryValue] = useState("");
  const handleForm = ({target}) => {setQueryValue(target.value)};

  const navigate = useNavigate();

  const handleSubmitForm = async () =>{
    try {
      const response = await friendQueryService(queryValue);
      navigate(`/user/${response.data._id}/details`);
    } catch (error) {
      console.log(error);
      navigate("/error")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        <input type="text" name="queryValue" onChange={handleForm} value={queryValue} placeholder="Put your friends username"/>
        <button>Find it!</button>
      </form>
    </div>
  )
}
