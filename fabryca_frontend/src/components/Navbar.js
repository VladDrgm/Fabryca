import './Navbar.css'
import { Frame, ThemeProvider } from '@react95/core';
import { Link } from 'react-router-dom';
import BurgerMenu from './BurgerMenu';
import CursorButton from './CursorButton';


const Navbar = () => {
    return (
        <ThemeProvider>
            <Frame className="navbar">

                <BurgerMenu pageWrapId={'page-wrap'} outerContainerId={'outer-container'}/>

                <div className="logo__navbar">
                    <h3 className='logo__text'>Fabryca</h3>
                </div>

                <div className="navbar__buttons">
                    <Link to="/home"> 
                        <CursorButton type={'Pointer'} text={'Home'} className="navbar__button" /> 
                    </Link>
                    <Link to="/projects">
                        <CursorButton type={'Pointer'} text={'Projects'} className="navbar__button" />
                    </Link>                                        
                    <Link to="/faq">
                        <CursorButton type={'Pointer'} text={'FAQ'} className="navbar__button" /> 
                    </Link>
                    <Link to="/privacy">
                        <CursorButton type={'Pointer'} text={'Privacy'} className="navbar__button" /> 
                    </Link>
                    {/* <Button className="navbar__button"><Link to="/new">PHAddTicket</Link></Button> */}        

                </div>
            </Frame>
        </ThemeProvider>
    );
}

export default Navbar;
