import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './BurgerMenu.css'
import { Link } from 'react-router-dom';

export default props => {
    return (
        <Menu>
           <a className="menu-item"><Link to="">Home</Link></a>
           <a className="menu-item"><Link to="/faq">FAQ</Link></a>
           <a className="menu-item"><Link to="/privacy">Privacy</Link></a>
           <a className="menu-item"><Link to="/new">+ Ticket</Link></a>
        </Menu>
    );
};