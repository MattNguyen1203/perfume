import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Admin } from "../../Context/Admin";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import productAPI from "../../../api/user/productAPI";

const Login = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState(localStorage.getItem("user") || "");
  const navigate = useNavigate();
  //Handle Route when click Log out Log in
  function handleLogInLogOut(token, user) {
    setToken(token);
    setUsername(user);
    localStorage.setItem("token", token);
  }

  // Declare state variables for username, password, and notification
  const [password, setPassword] = useState("");
  const [noti, setNoti] = useState("");
  // const redirect = useNavigate();

  // Handle submit event for login form
  const handleSubmit = async (event) => {
    event.preventDefault();
    //Get Account input from user
    const account = { user: username, password: password };
    //Call API to compare account input to account List
    try {
      const res = await productAPI.login(account);

      //In case status is good, login successfully, then set Noti to "", set Token, and username based on accessToken received from server, and finally redirect to homepage
      setNoti("");
      handleLogInLogOut(`Bearer ${res.accessToken}`, res.username);
      // Save the token to localstorage with the key 'token'
      localStorage.setItem("token", `Bearer ${res.accessToken}`);
      localStorage.setItem("refreshToken", `Bearer ${res.refreshToken}`);
      localStorage.setItem("name", res.username);

      if (res.roles.find((item) => Number(item) === 1)) {
        localStorage.setItem("role", 1);
      }

      navigate(-1);
    } catch (error) {
      const msg = error.response.data;
      setNoti(msg);
    }
  };

  // Return the JSX code for the login component
  return (
    <div className="login">
      <div className="log-in">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            {/* <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button> */}
          </div>
          {noti && <p className="error">{noti}</p>}
        </form>
        {/* {token && (
          <div className="logout">
            <p>Welcome, {username}!</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Login;
