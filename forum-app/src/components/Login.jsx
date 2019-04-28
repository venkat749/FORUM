import React, { Component } from 'react';
import Welcome from './pages/Welcome';
import {Redirect} from 'react-router-dom';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginSuccess : false,
      password : '',
      email : '',
      username : ''
    }
  }

   borderRadius = {
    borderRadius : '23px'
  }

  formStyle = {
    position: 'fixed',
    marginTop: 100,
    width: 600,
    left: 500
  }

  login = () => {
    this.setState({
        password : document.getElementById('password').value,
        email : document.getElementById('email').value
    },() => this.fetchRequest())
}

fetchRequest = async () => {
   let rawResponse = await fetch('/users/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email : this.state.email,
        password : this.state.password
    })
  });
  const content = await rawResponse;
  if(content.status === 404){
    alert("Auth Failed")
  }else{
  await content.json().then((response) =>{
    console.log("Response :", response)
    localStorage.setItem('jwtToken',response.token);
  })
  this.setState({
      loginSuccess : true
  },()=>{
      console.log("Going to Threads Page")
  })
}
}
   
    render() {
        return (
            <div className="loginPage">
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"></link>
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
                <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

<div className="container register-form" style={{position: 'absolute',top: 100,left: 250}}>
            <div className="form">
                <div className="note">
                    <p>LOGIN FORM</p>
                </div>
                <div className="form-content">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="text" className="form-control" id="email" placeholder="Email Address *" onKeyUp={this.handleKeyUp} required/>
                                <p>Email must be a valid address, e.g. k.venkat.1996@gmail.com</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                        <input type="password" className="form-control" id="password" placeholder="Your Password *" onKeyUp={this.handleKeyUp} required style={{height: 50,marginTop: 6}}/>
                                <p>Password must alphanumeric (@, _ and - are also allowed) and be 8 - 20 characters</p>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="btnSubmit" onClick={this.login.bind(this)}>Submit</button>
                </div>
            </div>
        </div>

        {this.state.loginSuccess ? (<Redirect to = {
                         {
                             pathname : "/threads",
                             state : {
                                 email : this.state.email,
                                 username : this.state.username
                                }
                            }}/>) : null}
<Welcome></Welcome>
            </div>
        );
    }
}
export default Login;