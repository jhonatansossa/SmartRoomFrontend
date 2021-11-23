import { React, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, generatePath } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();

  const redirectToDevices = () => {
    navigate("/overview");
  };

  // Initialize a boolean state
  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="login-container">
      <h1 className="huge-header">Log in</h1>
      <form name="login-form" onSubmit={redirectToDevices}>
        <input
          id="username"
          placeholder="Username"
          className="form-control form-control-input"
          required
        />
        <input
          type={passwordShown ? "text" : "password"}
          id="pass"
          placeholder="Password"
          className="form-control form-control-input"
          required
        />
        <label className="form-control form-control-input">
          <input
            type="checkbox"
            onClick={togglePassword}
            className="checkbox-icon"
          />
          Show password
        </label>
        <button type="submit" className="form-control btn-primary">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
