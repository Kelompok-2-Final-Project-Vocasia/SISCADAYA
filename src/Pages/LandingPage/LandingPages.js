import "./style.css";
import Home from "../../Components/Landing/Home"
import About from "../../Components/Landing/About";
import Work from "../../Components/Landing/Work";
import Footer from "../../Components/Landing/Footer";
import Type from "../../Components/Landing/Type";


function LandingPages() {
  return (
    <div className="App">
      <Home />
      <About />
      <Work />
      <Type />
      <Footer />
    </div>
  );
}

export default LandingPages;
