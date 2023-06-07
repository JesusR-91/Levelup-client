import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.services";
import { AuthContext } from "../../context/auth.context";
import icon from "../../assets/img.png"
import name from "../../assets/logo.png"



export default function Login() {
  const {authenticateUser} = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleUsername = (event) => setUsername(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      setErrorMessage("Please enter a username and password");
      return;
    }
    try {
      // Use loginService to check the data with the DB
      const response = await loginService({username, password});
      console.log(response)

      //1. Save the Token in the localStorage
      localStorage.setItem("authToken", response.data.authToken);

      //2. Token validation
      await authenticateUser();
      navigate("/");

    } catch (error) {
      console.log(error);
      if(error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      }
    }
  }

  return (
    <div>
    <img src={icon} alt="logo" />
    <img src={name} alt="web-name" />

      <h2>Login</h2>
        <form onSubmit={handleSubmitForm}>
            <div>
              <label>Username</label>
              <input type="text" name="username" value={username} onChange={handleUsername}/>
            </div>
            <br />
            <div>
              <label>Password</label>
              <input type="password" name="password" value={password} onChange={handlePassword}/>
            </div>
            <br />
            {errorMessage && <p style={{color:"red"}}>{errorMessage}</p> }
            <br />
            <br/>
            <button>Login</button>
            <p>If you don't have an account <Link to={`/auth/signup`}>click here!</Link></p>


        </form>
    </div>
  )
}
