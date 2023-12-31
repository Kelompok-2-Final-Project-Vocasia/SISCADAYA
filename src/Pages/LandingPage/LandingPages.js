import "./style.css";
import Home from "../../Components/Landing/Home"
import About from "../../Components/Landing/About";
import Work from "../../Components/Landing/Work";
import Testimonial from "../../Components/Landing/Testimonial";
// import Contact from "../../Components/Landing/Contact";
import Footer from "../../Components/Landing/Footer";
import Type from "../../Components/Landing/Type";


function LandingPages() {
  return (
    <div className="App">
      <Home />
      <About />
      <Work />
      <Type />
      {/* <Testimonial /> */}
      {/* <Contact /> */}
      <Footer />
    </div>
  );
}

export default LandingPages;
