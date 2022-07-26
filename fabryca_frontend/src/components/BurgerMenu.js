import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './BurgerMenu.css'
import { Link } from 'react-router-dom';

export default props => {
    return (
        <Menu>
           <Link className="menu-item" to="/home">Home</Link>
           <Link className="menu-item" to="/projects">Projects</Link>
           <Link className="menu-item" to="/faq">FAQ</Link>
           <Link className="menu-item" to="/privacy">Privacy</Link>
        </Menu>
    );
};