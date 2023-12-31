import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import swal from "sweetalert"
import { Link } from "react-router-dom";

function Registration() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    username: "",
    nama: "",
    email: "",
    password: ""
})

  const [flag, setFlag] = useState(false);
  const [login, setLogin] = useState(true);

  //fetch to database
  const handleRegister = async (event) => {
    event.preventDefault()
    await axios.post("http://localhost:4000/register", user)
    .then((response) => {
      if (response.status === 201) {
        swal({
          title: "Selamat!",
          text: `${response.data.message}`,
          icon: "success",
          button: "Ok",
        })
          .then((result) => {
            window.location.href = `/login`;
          });
      }
    })
    .catch((error) => {
      swal({
        title: "Gagal!",
        text: `${error.response.data.message}`,
        icon: "error",
        button: "Ok",
      });
    });
}
  return (
    <>
        <div>
          {" "}
          {login ? (
            <form action="">
              <h3>Register</h3>

              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="form-control"
                  placeholder="Enter Username"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })} 
                />
              </div>

               {/* input nama */}
              <div className="form-group">
                <label>Nama</label>
                <input
                  type="text"
                  name="nama"
                  id="nama"
                  className="form-control"
                  placeholder="Enter Full Name"
                  value={user.nama}
                  onChange={(e) => setUser({ ...user, nama: e.target.value })} 
                />
              </div>

              {/* input email */}
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

              {/* input password */}
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="pass" 
                  id="pass"
                  className="form-control"
                  placeholder="Enter password"
                  value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
              </div>

              {/* tombol submit */}
              <button type="submit" className="buton" onClick={handleRegister}>
                Register
              </button>

              <Link to='/login' className="forgot-password text-right">Already registered?</Link>

              {/* <p onClick={handleClick} className="forgot-password text-right">
                Already registered{" "}log in?
              </p> */}
              {/* {flag && (
                <Alert color="primary" variant="danger">
                  I got it you are in hurry! But every Field is important!
                </Alert>
              )} */}
            </form>
          ) : (
            <Login />
          )}
        </div>
    </>
  );
}

export default Registration;
