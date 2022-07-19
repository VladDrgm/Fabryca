import './Navbar.css'
import { Frame, Button, ThemeProvider } from '@react95/core';
import BurgerButton from './BurgerButton';
import NavbarLogo from './NavbarLogo';

const Navbar = () => {
    return (
        <ThemeProvider>
            <Frame className="navbar">
                
                <BurgerButton></BurgerButton>
                <NavbarLogo></NavbarLogo>

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
