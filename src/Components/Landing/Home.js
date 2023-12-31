import React from "react";
import BannerBackground from "../../Assets/Untitlednew.png";
import BannerImage from "../../Assets/home-background.png";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            SISCADAYA
          </h1>
          <p className="primary-text">
          Website Sistem Informasi Cagar Budaya Indonesia (SISCADAYA) merupakan sebuah platform inovatif yang menghubungkan masyarakat dengan kekayaan sejarah, seni, dan budaya Indonesia melalui teknologi informasi.
          </p>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
