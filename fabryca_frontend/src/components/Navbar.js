import './Navbar.css'
import { Frame, Button, ThemeProvider } from '@react95/core';
import { useState } from 'react';
import BurgerButton from './BurgerButton';
// import NavbarLogo from './NavbarLogo';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <ThemeProvider>
            <Frame className="navbar">
                <BurgerButton></BurgerButton>
                {/* <NavbarLogo></NavbarLogo> */}
                <div className="logo__navbar">
                    <h3>Fabryca</h3>
                </div>
                {/* Line below is to fix positioning of flexbox, subject to change for better solution */}
                <div className="hidden__element"></div> 

                <div className="navbar__buttons">
                    <Button className="navbar__button">Home</Button>
                    <Button className="navbar__button">Teams</Button>
                    <Button className="navbar__button">Projects</Button>
                </div>

            </Frame>
        </ThemeProvider>
    );
}

export default Navbar;
