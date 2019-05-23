import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuVisible: false,
            watchDropDownVisible: false,
            mobile: true
        }

        this.menuToggle = this.menuToggle.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
        this.toggleWatchDropDown = this.toggleWatchDropDown.bind(this);
        this.hideWatchDropDown = this.hideWatchDropDown.bind(this);
        this.checkWidth = this.checkWidth.bind(this);
    }

    checkWidth(){
        this.setState({
            mobile: window.innerWidth < 600,
            menuVisible: window.innerWidth > 600
        })
    }

    componentDidMount(){
        this.checkWidth();
        window.addEventListener('resize', () => {
            this.setState({
                mobile: window.innerWidth < 600,
                menuVisible: window.innerWidth > 600
            })
        });
    }

    menuToggle(e){
        e.stopPropagation();
        this.setState(state => ({menuVisible: !state.menuVisible}))
    }

    hideMenu(){
        this.setState({menuVisible: false});
    }

    toggleWatchDropDown(){
        this.setState(state => ({watchDropDownVisible: !state.watchDropDownVisible}));
    }
    
    hideWatchDropDown(){
        this.setState({watchDropDownVisible: false});
    }

    render() {
        return ( 
            <div id="header-container" onMouseLeave={this.state.mobile? this.hideMenu : null} >
                <div id="drop-down-toggle" className={this.state.mobile? null : 'hidden'} onClick={this.menuToggle}>
                    <div className="hamburger-bar" ></div>
                    <div className="hamburger-bar" ></div>
                    <div className="hamburger-bar" ></div>
                </div>
                <img id="header-image" src={this.state.mobile? "/Nav-Images/HeaderMobile.jpg" : "Nav-Images/LightHeader.jpg"} alt="CLOSER NATION SHOW"/>
                <Link to="/SIGNUP" onClick={this.state.mobile? this.hideMenu : null}>
                    <div className={this.state.menuVisible? "header-option" : "header-option hidden"} >
                        <h1>SIGNUP/SIGNIN</h1>
                    </div>
                </Link>
                <a href="https://indictmentclothing.com" target="_blank" rel="noopener noreferrer" onClick={this.state.mobile? this.hideMenu : null}>
                    <div className={this.state.menuVisible? "header-option" : "header-option hidden"} >
                        <h1>SHOP</h1>    
                    </div>  
                </a>
                
                <div onMouseLeave={this.state.mobile? null : this.hideWatchDropDown} onMouseEnter={this.state.mobile? null : this.toggleWatchDropDown} onClick={this.toggleWatchDropDown}>
                    <div className={this.state.menuVisible? "header-option" : "header-option hidden"}>
                        <h1>WATCH</h1>
                    </div>
                    <div className={this.state.watchDropDownVisible? null : 'hidden'} onClick={this.state.mobile? this.hideMenu : null}>
                        <Link to="/STREAM">
                            <div className="header-option"  >
                                <h1>LIVE</h1>
                            </div>
                        </Link>
                        <Link to="/ARCHIVES">
                            <div className="header-option" >
                                <h1>ARCHIVES</h1>
                            </div>
                        </Link>
                    </div>
                </div>         
                
                
            </div>
        );
    }
}
 
export default Header;

{/* <div id="header-container">
    <div id="drop-down-toggle" onClick={this.menuToggle}>
        <div className="hamburger-bar" ></div>
        <div className="hamburger-bar" ></div>
        <div className="hamburger-bar" ></div>
    </div>
    <img id="header" src={this.state.mobile? "/Nav-Images/HeaderMobile.jpg" : "Nav-Images/Header.png"} alt="CLOSER NATION SHOW"/>
    <div id="nav-items-container" className={this.state.menuVisible? 'show-nav' : 'hidden'}>
        <a href="/SIGNUP"><div className="nav-option" >SIGNUP/SIGNIN</div></a>
        <a href="https://indictmentclothing.com" target="_blank" rel="noopener noreferrer"><div className="nav-option" >SHOP</div></a>
        <div className="nav-option" onMouseEnter={this.toggleWatchDropDown} onMouseLeave={this.toggleWatchDropDown} >
            WATCH
            <div className="nav-drop-down" >
                <a href="/STREAM"><div className={this.state.watchDropDownVisible? "nav-drop-down-item show" : "nav-drop-down-item"} >LIVE</div></a>
                <a href="/ARCHIVES"><div className={this.state.watchDropDownVisible? "nav-drop-down-item show" : "nav-drop-down-item"} >ARCHIVES</div></a>
            </div>
        </div>
    </div>
</div> */}