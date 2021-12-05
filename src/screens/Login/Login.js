import { React, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, generatePath } from "react-router-dom";
import user from "./users";

const Login = () => {
  var [usernameValue, setUsernameValue] = useState();
  var [passwordValue, setPasswordValue] = useState();  
  let navigate = useNavigate();


  // Initialize a boolean state
  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const authenticateUser = (usernameValue, passwordValue) => {
    let isCorrect = false;
    user.login.map((eachUser) =>{
      if(usernameValue === eachUser.username && passwordValue === eachUser.password){
        isCorrect = true;
        // setCookies(eachUser.name);
        navigate("/overview");
      }
    });
    if(!isCorrect)
      alert("Wrong username or password, please try again");
  }

  return (
    <div className="login-container">
      <h1 className="huge-header">Log in</h1>
      <form name="login-form" >
        <input
          id="username"
          placeholder="Username"
          className="form-control form-control-input"
          required
          value={usernameValue}
          onChange={e => setUsernameValue(e.target.value)}
        />
        <input
          type={passwordShown ? "text" : "password"}
          id="pass"
          placeholder="Password"
          className="form-control form-control-input"
          required
          value={passwordValue}
          onChange={e => setPasswordValue(e.target.value)}
        />
        <label className="form-control form-control-input-password">
          <input
            type="checkbox"
            onClick={togglePassword}
            className="checkbox-icon"
          />
          Show password
        </label>
        <button type="submit" className="form-control btn-primary"
          onClick={() =>
            authenticateUser(usernameValue, passwordValue)
          }
          >
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
