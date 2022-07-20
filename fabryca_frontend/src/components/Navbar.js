import './Navbar.css'
import { Frame, Button, ThemeProvider } from '@react95/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import BurgerMenu from './BurgerMenu';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <ThemeProvider>
            <Frame className="navbar">
                <BurgerMenu pageWrapId={'page-wrap'} outerContainerId={'outer-container'}/>

                {/* <BurgerButton></BurgerButton> */}
                {/* <NavbarLogo></NavbarLogo> */}
                <div className="logo__navbar">
                    <h3>Fabryca</h3>
                </div>
                {/* Line below is to fix positioning of flexbox, subject to change for better solution */}
                {/* <div className="hidden__element"></div>  */}

                <div className="navbar__buttons">
                    <Button className="navbar__button"><Link to="/home">Home</Link></Button>
                    <Button className="navbar__button"><Link to="/faq">FAQ</Link></Button>
                    <Button className="navbar__button"><Link to="/privacy">Privacy</Link></Button>
                    <Button className="navbar__button"><Link to="/new">PHAddTicket</Link></Button>
                </div>

            </Frame>
        </ThemeProvider>
    );
}

export default Navbar;
