import React, { useEffect, useState } from 'react';
import CloseIcon from '../../Assets/close-icon.png';
import MenuIcon from '../../Assets/menu-icon.png'
// import { userLogout } from '../../../utils/UserHandler';
import "./navbar.css";
import logoutHandler from '../../utils/logoutHandler';

const Navbar = () => {
    
    const [isMobile, setIsMobile] = useState(false);
    const [colorChange, setColorChange] = useState(false);
    const [isLogin, setIsLogin] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if(!localStorage.getItem("token")) {
            return setIsLogin(false)
        }
        return setIsLogin(true)

        if (!localStorage.getItem("isAdmin")){
            return setIsAdmin(false)
        }
        return setIsAdmin(true)
    }, [])
    
    const navbarColorChange = () => {
        if(window.scrollY >= 50){
            setColorChange(true);
        } else {
            setColorChange(false);
        }
    };
    window.addEventListener("scroll", navbarColorChange);

    return (
        <nav className={colorChange ? "navbar-color-change fixed-top" : "navbar fixed-top"}>
            {/* <a href="/"><img src={LogoHomepage} alt="Logo SiGayantara" className="logo"/></a> */}
            <button className="mobile-menu"
            onClick={() => setIsMobile(!isMobile)}>
                {isMobile ? ( 
                    <img src={CloseIcon} alt="close icon" />
                ) : (
                    <img src={MenuIcon} alt="menu icon" />
                )}
            </button>
            
            <ul className={isMobile ? "nav-menus-mobile": "nav-menus"}
            onClick={() => setIsMobile(false)}>
                <li><a className="nav-link" href="/home">Beranda</a></li>
                <li><a className="nav-link" href="/cagar-budaya">Cagar Budaya</a></li>


{
    isAdmin ? (
        <>
        <li><a className="nav-link" href='/admin'>Admin</a></li>
        </>
    ) : (
        <li></li>
    )
}
                {



 

                    isLogin ? (
                        <>
                           
                            <li><button className="nav-link" onClick={logoutHandler}>Logout</button></li>
                        </>
                    ) : (
                        <li><a className="nav-link" href='/login'>Login</a></li>
                    )
                }
                <li className="divider my-2"></li>
            </ul>
        </nav>
    )
}

export default Navbar