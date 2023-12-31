import React from "react";
import { BsTwitter } from "react-icons/bs"; //logo twitter
import { SiLinkedin } from "react-icons/si"; //logo linkedin
import { BsYoutube } from "react-icons/bs"; //logo youtube
import { FaFacebookF } from "react-icons/fa"; //logo facebook

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
    //deklarasi logo
        <div className="footer-icons">
          <BsTwitter />
          <SiLinkedin />
          <BsYoutube />
          <FaFacebookF />
        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
          <span>Qualtiy</span>
          <span>Help</span>
          <span>Share</span>
          <span>Carrers</span>
          <span>Testimonials</span>
          <span>Work</span>
        </div>
        <div className="footer-section-columns">
          <span>244-5333-7783</span>
          <span>siscadaya@gmail.com</span>
          <span>minsis@gmail.com</span>
          <span>helper@gmail.com</span>
        </div>
        <div className="footer-section-columns">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
