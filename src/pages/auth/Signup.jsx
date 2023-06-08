//IMPORTS
import { useNavigate, Link } from "react-router-dom";
import { signupService } from "../../services/auth.services";
import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ThemeContext } from "../../context/theme.context";
import name from "../../assets/logo-no-background.png"


export default function Signup() {

  //STATES
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPass: "",
    firstName: "",
    lastName: ""
  });
  const [errorMessage, setErrorMessage] = useState("")

  //OTHER VAR
  const navigate = useNavigate();
  const {buttonTheme} = useContext(ThemeContext);

  //FUNCTIONS
  const handleForm = ({target:{name, value}}) => {setFormData({...formData, [name]: value})}

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      await signupService(formData);
      navigate("/auth/login")
    } catch (error) {
      console.log(error)
      if (error.response.status === 400) {
        console.log(error.response.data.errorMessage)
        setErrorMessage(error.response.data.errorMessage)
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>

      <img src={name} alt="web-name" />

      <h1>Sign Up</h1>
      <br />
    
      <Form onSubmit={handleSignup}>
        
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" value={formData.username} onChange={handleForm}/>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} onChange={handleForm}/>
        </Form.Group>
        
        <br />
        <Form.Group>
          <Form.Label>Confirm password</Form.Label>
          <Form.Control type="password" name="confirmPass" value={formData.confirmPass} onChange={handleForm} /> 
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>First name</Form.Label>
          <Form.Control type="text"  name="firstName" value={formData.firstName} onChange={handleForm} />  
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Last name</Form.Label>
          <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleForm} />
        </Form.Group>
        <br />

        {errorMessage && <p style={{color:"red"}}>{errorMessage}</p>}
        <br/>
        <p>If you already have an account <Link to={`/auth/login`} style={{color:"black"}}>click here!</Link></p>
        <br/>
        <Button className={buttonTheme}  type="submit">Signup</Button>
      </Form>
      
    </div>
  );
}
