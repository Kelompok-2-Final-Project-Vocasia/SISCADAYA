import React, { useState } from "react";
import Home from "./Hello";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
      email: "",
      password: ""
  })

  const [home, setHome] = useState(true);
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      //fetch to database
      const data = await axios.post("http://localhost:4000/login", user);
      console.log(data);
      console.log(user);
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", data.data.email);
      localStorage.setItem("isAdmin", data.data.isAdmin);
      if (data.data.isAdmin == 1) {
        navigate("/admin/cagar-budaya");
      } else {
        navigate("/cagar-budaya");
      }
      localStorage.setItem("userId", data.data.user);
      setUser({ email: "", password: "" });
    } catch (error) {
      // Tangani kesalahan saat login gagal
      swal({
        title: "Gagal!",
        text: "Email atau password salah. Silakan coba lagi.",
        icon: "error",
        button: "Ok",
      });
      console.error("Login error:", error);
    }
  };
  return (
    <div>
      {home ? (
        <form onSubmit={handleLogin}>
          <h3>LogIn</h3>
//email
          <div className="form-group">
            <label>Email</label>
            <input
              type="text" 
              name="email" 
              id="email"
              className="form-control"
              placeholder="Enter email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
//password
          <div className="form-group">
            <label>Password</label>
            <input
              type="password" 
              name="pass" 
              id="pass"
              className="form-control"
              placeholder="Enter password"
              value={user.password} 
              onChange={(e) => setUser({...user,password:e.target.value})}
            />
          </div>
//submit button
          <button type="submit" className="buton mb-4">
            Login
          </button>
//register
          Don't have an account? <a href="/register" className="mt-5">Register</a>
        </form>
      ) : (
        <Home />
      )}
    </div>
  );
}

export default Login;
