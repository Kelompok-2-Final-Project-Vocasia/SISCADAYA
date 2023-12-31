import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./Components/Welcome/Welcome";
import LandingPages from "./Pages/LandingPage/LandingPages";
import Video from "./Components/Landing/Video";
import { AuthProvider } from './AuthContext';
import Type from "./Components/Landing/Type";
import RegisPage from "./Pages/UserPage/RegisPage";
import LoginPage from "./Pages/UserPage/LoginPage";
import AdminCategoryPage from "./Pages/admin/kategori";
import AdminCagarBudayaPage from "./Pages/admin/cagarBudaya";
import AdminInsertCagarBudayaPage from "./Pages/admin/cagarBudaya/insert";
import AdminUpdateCagarBudayaPage from "./Pages/admin/cagarBudaya/update";
import CagarBudaya from "./Pages/CagarBudaya";
import DetailCagar from "./Pages/DetailCagar";



function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' exact Component={WelcomePage}/>
          <Route path='/home' exact Component={LandingPages}/>
          <Route path='/cagar-budaya' exact Component={CagarBudaya}/>
          <Route path='/cagar-budaya/:id' exact Component={DetailCagar}/>
          <Route path='/video' exact Component={Video}/>
          <Route path='/type' exact Component={Type}/>
          <Route path='/register' exact Component={RegisPage}/>
          <Route path='/login' exact Component={LoginPage}/>
          <Route path='/admin' exact Component={AdminCagarBudayaPage}/>
          <Route path='/admin/kategori' exact Component={AdminCategoryPage}/>
          <Route path='/admin/cagar-budaya' exact Component={AdminCagarBudayaPage}/>
          <Route path='/admin/cagar-budaya/tambah' exact Component={AdminInsertCagarBudayaPage}/>
          <Route path='/admin/cagar-budaya/edit/:id' exact Component={AdminUpdateCagarBudayaPage}/>
        </Routes>
    </Router>
  );
}

export default App;
