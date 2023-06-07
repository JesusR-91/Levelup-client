import { useNavigate, Link } from "react-router-dom";
import { signupService } from "../../services/auth.services";
import { useState } from "react";

export default function Signup() {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPass: "",
    firstName: "",
    lastName: ""
  });

  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();

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
    <div>

      <h1>Sign Up</h1>
    
      <form onSubmit={handleSignup}>
        
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleForm}
        />

        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleForm}
        />
        <br />
        <label>Confirm password:</label>
        <input
          type="password"
          name="confirmPass"
          value={formData.confirmPass}
          onChange={handleForm}
        />
        <br />
        <label>First name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleForm}
        />
        <br />
        <label>Last name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleForm}
        />
        <br />

        {errorMessage && <p style={{color:"red"}}>{errorMessage}</p>}
        <br/>
        <p>If you already have an account <Link to={`/auth/login`}>click here!</Link></p>
        <br/>
        <button type="submit">Signup</button>
      </form>
      
    </div>
  );
}
