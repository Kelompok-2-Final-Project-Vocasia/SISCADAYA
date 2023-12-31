import React from "react";
import AboutBackground from "../../Assets/about-background.png";
import AboutBackgroundImage from "../../Assets/aboutu-background.png";
import { BsFillPlayCircleFill } from "react-icons/bs"; //button play video
import { Link } from "react-router-dom"; //navigate


const About = ({type, onClick}) => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
          Sistem Informasi Cagar Budaya Indonesia
        </h1>
        <p className="primary-text">
        bertujuan untuk memberikan pemahaman mendalam, meningkatkan kesadaran, dan mendorong partisipasi aktif dalam pelestarian cagar budaya.
        </p>
        <p className="primary-text">
        Tech Stack yang akan digunakan dalam pembuatan sistem ini adalah Node JS, React JS,  UI Component Chakra UI & Github.
        </p>
    //navigasi ke page video
        <Link to='/video' className="about-buttons-container">
          <button className="watch-video-button" onClick={onClick} type={type}>
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
