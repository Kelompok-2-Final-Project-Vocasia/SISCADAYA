import React from 'react';
import './style.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Registration from '../../Components/User/Register';
import HomeButton from '../../Components/ButtonHome';


function RegisPage() {
  return (
    <div className="App">
      <HomeButton />
      <div className="outer">
        <div className="inner">
          <Registration />
        </div>
      </div>
    </div>
  );
}

export default RegisPage;