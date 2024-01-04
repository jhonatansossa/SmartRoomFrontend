import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import openHAB from "../../openHAB/openHAB";

export var token;
export var isUserAdmin = false;
let isUserAdminCallback = null;

export const setIsUserAdminCallback = (callback) => {
  isUserAdminCallback = callback;
};

const Login = () => {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const CheckIfUserIsAdmin = async () => {
    console.log("CheckIfUserIsAdmin called");
    try {
      const meResponse = await Axios.get(
        openHAB.url + "/api/v1/auth/me",
        { headers: { Authorization: sessionStorage.getItem("token") } }
      );

      const isAdmin =
        meResponse.data.user_type === "1" || meResponse.data.user_type === 1;

      sessionStorage.setItem("isAdmin", isAdmin);

      isUserAdmin = isAdmin;

      if (isUserAdminCallback) {
        isUserAdminCallback(isUserAdmin);
      }
    } catch (error) {
      console.log("Error fetching user data:", error.message);
    }
  };

  useEffect(() => {
    console.log("Login component useEffect called");

    const isAuthenticated = sessionStorage.getItem("auth") === "true";

    if (isAuthenticated) {
      CheckIfUserIsAdmin();
    }

    document.title = "SmartRoom – Login";
  }, []);

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
        const accessToken = response.data.user.access;
        token = "Bearer " + accessToken;
        sessionStorage.setItem("auth", "true");
        sessionStorage.setItem("token", token);
        navigate("/overview");

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
