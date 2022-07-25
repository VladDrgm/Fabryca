import Navbar from './Navbar';
import './LandingPage.css';
import '../index.css';
import { Frame, ThemeProvider, Button } from '@react95/core';
import { Link } from 'react-router-dom';
import CursorButton from './CursorButton';
import Logo from '../images/FabrycaV2.jpg';

const LandingPage = () => {


    return (
        <ThemeProvider>
        <div className="App" id="outer-container">
            <div id="page-wrap">
                <Navbar></Navbar>
                <Frame padding={4} className='outer__frame'>
                    <Frame boxShadow="in" className='inner__frame'>
                        <header > <h2>Welcome to the easy way of ticketing.</h2> </header>
                    </Frame>
                </Frame>

                <Frame padding={4} className='outer__frame'>
                    <Frame boxShadow="in" className='inner__frame landing__body'>
                        <img src={Logo} alt="fabryca logo" className="landing__logo__img"/>
                        <div className="landing__page__body__inner">
                        <h3>Would you like to..</h3>
                        <Link to='/newProject'>
                            <CursorButton type={'Pointer'} text={'Start a New Project'}/>
                        </Link>
                        <h3>or go to..</h3>
                        <Link to='/projects'>
                            <CursorButton type={'Pointer'} text={'Existing Projects'}/>
                        </Link>
                        </div>
                        <img src={Logo} alt="fabryca logo" className="landing__logo__img"/>

                    </Frame>
                </Frame>

                <Frame padding={4} className='outer__frame'>
                    <Frame boxShadow="in" className='inner__frame'>
                        <footer > <h4>For questions, go to FAQ or contact us at: contact@backendboyz.com</h4> </footer>
                    </Frame>
                </Frame>
            </div>
        </div>
        </ThemeProvider>
    );
}

export default LandingPage;