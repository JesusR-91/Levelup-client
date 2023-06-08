//IMPORTS
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.services";
import { AuthContext } from "../../context/auth.context";
import name from "../../assets/logo-no-background.png"
import { Button, Form } from "react-bootstrap";
import { ThemeContext } from "../../context/theme.context";



export default function Login() {
  //STATES
  const {authenticateUser} = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //OTHER VAR
  const {buttonTheme} = useContext(ThemeContext);
  const navigate = useNavigate();

  //FUNCTIONS
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
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
    
    <img src={name} alt="web-name" />

      <h2>Login</h2>
        <Form onSubmit={handleSubmitForm} style={{maxWidth:"50vw"}}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" value={username} onChange={handleUsername}/>
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={password} onChange={handlePassword}/>
            </Form.Group>
            <br />
            {errorMessage && <p style={{color:"red"}}>{errorMessage}</p> }
            <br />
            <br/>
            <p>If you don't have an account<Link to={`/auth/signup`} style={{color:"black"}}>click here!</Link></p>
            <Button className={buttonTheme} type="submit">Login</Button>
        </Form>
    </div>
  )
}
