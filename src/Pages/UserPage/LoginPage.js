import React from 'react';
import './style.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from '../../Components/User/Login';


function LoginPage() {
  return (
    <div className="App">
      <div className="outer">
        <div className="inner">
          <Login />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;