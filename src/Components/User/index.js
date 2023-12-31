import React from 'react';
import './style.css';
//import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Registration from './Register';


function User() {
  return (
    <div className="App">
      <div className="outer">
        <div className="inner">
          <Registration />
        </div>
      </div>
    </div>
  );
}

export default User;