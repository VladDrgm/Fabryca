import Navbar from './Navbar';
import './LandingPage.css';
import '../index.css';
import { Frame, ThemeProvider } from '@react95/core';
import { Link } from 'react-router-dom';
import CursorButton from './CursorButton';
import Logo from '../images/FabrycaV2.jpg';
import LoadingComponent from './LoadingComponent'

const LandingPage = () => {


    return (
        <ThemeProvider>
        <div className="App" id="outer-container">
            <div id="page-wrap">
                <Navbar></Navbar>
                <LoadingComponent></LoadingComponent>
                <Frame padding={4} className='outer__frame'>
                    <Frame boxShadow="in" className='inner__frame'>
                        <img src={Logo} className="landing__logo" alt="Fabryca logo, gray and black square with Fabryca written centered in the middle"/>
                        <header > <h2>Welcome to the easy way of ticketing.</h2> </header>
                        <hr className="landing__page__hr"/>
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
                        <hr className="landing__page__hr"/>
                        <h3>For questions go to FAQ or contact us at contact@backendboyz.com</h3>
                    </Frame>
                </Frame>
            </div>
        </div>
        </ThemeProvider>
    );
}

export default LandingPage;