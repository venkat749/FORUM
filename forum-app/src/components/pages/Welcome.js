import React, { Component } from 'react';

class Welcome extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            IsClicked : false
        }
    }

    showMenu(){
        this.setState({
            IsClicked :  this.state.IsClicked === false ? true : false 
        })
    }

    Background = "bg1.jpg"

    bgImage = {
        backgroundImage: `url(${this.Background})`,
        height: 1000,
        width:1700
    }

    render() {
        return (
            <div style={this.bgImage}>
                <div style={{ fontSize: 35, float: "right", marginTop: 35, marginRight: 1450 }}><span style={{ color: "chartreuse" }}>D</span><span style={{ color: "deeppink" }}>C</span><span style={{ color: "yellow" }}>O</span><span style={{ color: "#017ff3" }}>D</span><span style={{ color: "#18d4ab" }}>E</span><span style={{ color: "pink" }}>R</span></div>
                <nav role="navigation" style={{marginTop : -30 }}>
                    <div id="menuToggle">
                        <input type="checkbox" />
                        <span></span>
                        <span></span>
                        <span></span>
                        <ul id="menu">
                            <a href="/Welcome"><li>Home</li></a>
                            <a href="/register"><li>Register</li></a>
                            <a href="/threads"><li>Threads</li></a>
                            <a href="https://github.com/venkat749"><li>Info</li></a>
                            <a href="https://www.linkedin.com/in/venkateswaran-k-6441a138/"><li>Contact</li></a>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}
export default Welcome;