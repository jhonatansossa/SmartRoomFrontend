import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import openHAB from "../../openHAB/openHAB";

export var token;
export var isUserAdmin = false;

// Callback function for notifying Header.js of isUserAdmin changes
let isUserAdminCallback = null;

export const setIsUserAdminCallback = (callback) => {
  isUserAdminCallback = callback;
};

const Login = () => {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Initialize a boolean state
  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    sessionStorage.removeItem("auth");
    document.title = "SmartRoom – Login";
  }, []);

  const CheckIfUserIsAdmin = async () => {
    try {
      const meResponse = await Axios.get(
        openHAB.url + "/api/v1/auth/me",
        { headers: { Authorization: token } }
      );

      // Set isUserAdmin based on the response
      isUserAdmin = meResponse.data.user_type === "1" || meResponse.data.user_type === 1;

      // Notify the callback function (if available)
      if (isUserAdminCallback) {
        isUserAdminCallback(isUserAdmin);
      }

      // ... (rest of the code)
    } catch (error) {
      console.log("Error fetching user data:", error.message);
    }
  };

  const authenticateUser = async (e, usernameValue, passwordValue) => {
    e.preventDefault();

    try {
      const response = await Axios.post(
        openHAB.url + "/api/v1/auth/login",
        {
          email: usernameValue,
          password: passwordValue,
        }
      );

      if (response.status === 200) {
        // Authentication successful
        const accessToken = response.data.user.access;
        token = "Bearer " + accessToken;
        sessionStorage.setItem("auth", "true");
        navigate("/overview");

        // Check if the user is an admin and set formData values
        await CheckIfUserIsAdmin();
      } else {
        setErrorMessage("Wrong username or password, please try again");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setErrorMessage("An error occurred during authentication");
    }
  };

  return (
    <div className="login-container">
      <img
        src="smart-room-logo-orange.svg"
        width="130"
        height="130"
        className="center logo"
        alt="SmartRoom Logo"
      />
      <h1 className="login-header">SmartRoom</h1>
      <form name="login-form">
        <input
          id="username"
          placeholder="Username"
          className="form-control form-control-input"
          required
          value={usernameValue}
          onChange={(e) => setUsernameValue(e.target.value)}
        />
        <input
          type={passwordShown ? "text" : "password"}
          id="pass"
          placeholder="Password"
          className="form-control form-control-input"
          required
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
        />

        {errorMessage && (
          <div className="text-danger form-control input-error">
            {errorMessage}
          </div>
        )}

        <label className="form-control form-control-input-password">
          <input
            type="checkbox"
            onClick={togglePassword}
            className="checkbox-icon"
          />
          Show password
        </label>
        <button
          type="submit"
          className="form-control btn-primary"
          onClick={(e) => authenticateUser(e, usernameValue, passwordValue)}
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
