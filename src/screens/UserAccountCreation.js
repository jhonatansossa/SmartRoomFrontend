import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "../UserAccount.css";
import openHAB from "../openHAB/openHAB";
import { token } from "./Login/Login";

const UserAccountCreation = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    user_type: "user",
    username: "",
  });

   const config = {
    headers: { Authorization: token },
  };

  //const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
  try {
    //alert(openHAB.url + "/api/v1/auth/register");
    const response = await Axios.post(openHAB.url + "/api/v1/auth/register", formData, config);
    console.log("Registration successful:", response.data);
  } catch (error) {
    if (error.response) {
      const statusCode = error.response.status;

      switch (statusCode) {
        case 400:
          alert("Fails to Register due to bad request data");
          break;
        case 403:
          alert("User not allowed to create new users");
          break;
        case 409:
          alert("Email or username are in use");
          break;
        default:
          alert(`Registration failed with status code: ${statusCode}`);
      }
    } else {
      console.error("Registration failed:", error.message);
    }
  }
};


  return (
    <div className="user-account-container">
      <h2>User Account Registration</h2>
      <form>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <button type="button" onClick={handleRegister} className="user-account-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default UserAccountCreation;