import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './BurgerMenu.css'

export default props => {
    return (
        <Menu>
            <a className="menu-item" href="https://www.google.com">Home</a>
            <a className="menu-item" href="https://www.google.com">Teams</a>
            <a className="menu-item" href="https://www.google.com">Projects</a>
            <a className="menu-item" href="https://www.google.com">Q and A</a>
            <a className="menu-item" href="https://www.google.com">Privacy</a>
        </Menu>
    );
};