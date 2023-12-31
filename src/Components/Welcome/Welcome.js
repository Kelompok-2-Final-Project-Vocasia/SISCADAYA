import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Background from "./Background";
import { FaAnglesRight } from "react-icons/fa6";

const WelcomePage = ({type, onClick}) => {
  return (
    <>
    <Background />

      <Link to='/home' className="button">
          <button className="gobutton" onClick={onClick} type={type}>
          <FaAnglesRight />
          </button>
        </Link>
    </>
  );
}


export default WelcomePage
