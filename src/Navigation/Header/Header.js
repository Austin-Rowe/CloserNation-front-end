import React, { Component } from 'react';

import './Header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuVisible: false,
            watchDropDownVisible: false
        }

        this.menuToggle = this.menuToggle.bind(this);
        this.toggleWatchDropDown = this.toggleWatchDropDown.bind(this);
    }

    menuToggle(){
        this.setState(state => ({menuVisible: !state.menuVisible}))
    }

    toggleWatchDropDown(){
        this.setState(state => ({watchDropDownVisible: !state.watchDropDownVisible}));
    }

    render() {
        return ( 
            <div id="header-container">
                <div id="drop-down-toggle" onClick={this.menuToggle}>
                    <div className="hamburger-bar" ></div>
                    <div className="hamburger-bar" ></div>
                    <div className="hamburger-bar" ></div>
                </div>
                <a href="/" ><img id="mobile-logo" src="/Nav-Images/neon-logo-transparent.png" alt="logo" /></a>
                <ul id="nav-items-container" className={this.state.menuVisible? 'show-nav' : 'hidden'}>
                    <li className="logo-container hidden" >
                        <a href="/" ><img id="logo" src="/Nav-Images/neon-logo-transparent.png" alt="logo" /></a>
                    </li>
                    <a href="/SIGNUP"><li className="nav-option" >SIGNUP/SIGNIN</li></a>
                    <a href="https://indictmentclothing.com" target="_blank" rel="noopener noreferrer"><li className="nav-option" >SHOP</li></a>
                    <li className="nav-option" onMouseEnter={this.toggleWatchDropDown} onMouseLeave={this.toggleWatchDropDown} >
                        WATCH
                        <ul className="nav-drop-down" >
                            <a href="/STREAM"><li className={this.state.watchDropDownVisible? "nav-drop-down-item show" : "nav-drop-down-item"} >LIVE</li></a>
                            <a href="/ARCHIVES"><li className={this.state.watchDropDownVisible? "nav-drop-down-item show" : "nav-drop-down-item"} >ARCHIVES</li></a>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}
 
export default Header;