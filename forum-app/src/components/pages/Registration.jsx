import React, { Component } from 'react';
import Welcome from './Welcome'
import {Redirect} from 'react-router-dom'

class Registration extends Component {
    constructor(props){
        super(props);
        this.state = {
            userExists : false,
            registrationSuccess : false,
            username : '',
            password : '',
            email : ''
    }
    }

    register(){
        const arr = []
        const input = Array.from(document.getElementsByTagName('input'))
        input.map(element => {
            const criteria = element.classList.contains('invalid')
            arr.push(criteria)
        })

        if(arr.includes(true)){
            return
        }else{
            this.sendRequest()
        }
    }

        sendRequest = () => {
        this.setState({
            username : document.getElementById('username').value,
            password : document.getElementById('password').value,
            email : document.getElementById('email').value
        },() => {this.fetchRequest()})
    }
        
        fetchRequest = async () => {
            if(this.state.username === '' || this.state.email === '' || this.state.password === '')
            return

             let rawResponse = await fetch('/users/register', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  username : this.state.username,
                  email : this.state.email,
                  password : this.state.password
              })
            });
            const content = await rawResponse;
            if(content.status === 500){
                this.setState({
                    userExists : true
                })
            }else{
            console.log(content)
            this.setState({
                registrationSuccess : true
            },()=>{
                console.log("Going to Threads Page")
            })
        }
          }


    validate = (field,regex)=>{
        let regexes = {
            username : new RegExp("^[a-zA-Z\\d_]{1,}$"),
            email : new RegExp("^([a-z\\d\\.+-]+)@([a-z\\d-]+)\\.([a-z]{2,8})(\\.[a-z]{2,8})?$"),
            password : new RegExp("^[a-zA-Z\\d-@_]{8,20}$"),
            confirm : new RegExp("^[a-zA-Z\\d-@_]{8,20}$"),
        }
            
        if(regexes[regex].test(field.value)){
            if(field.id === 'confirm'){
                if(field.value !== document.getElementById('password').value){
                    field.classList.add('invalid')
                    return
                }else{
                    field.classList.add('valid') 
                    field.classList.remove('invalid')
                }
            }else{
            field.classList.add('valid') 
            field.classList.remove('invalid')
            }
        }else{
              field.classList.add('invalid')
        }
    }

    handleKeyUp = (e)=>{
            this.validate(e.target,e.target.id)
    }

    render() {
        return (
            <div>
                <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"></link>
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
                <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                
<div className="container register-form" style={{position: 'absolute',
    top: 100,
    left: 250}}>
            <div className="form">
                <div className="note">
                    <p>Registration Form</p>
                </div>
                <div className="form-content">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <input type="text" className="form-control" id="username" placeholder="Your Name *" onKeyUp={this.handleKeyUp} required/>
                                <p>Enter your name (No space allowed)</p>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" id="email" placeholder="Email Address *" onKeyUp={this.handleKeyUp} required/>
                                <p>Email must be a valid address, e.g. k.venkat.1996@gmail.com</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                        <input type="password" className="form-control" id="password" placeholder="Your Password *" onKeyUp={this.handleKeyUp} required style={{ height: 50, marginTop: 6 }}/>
                                <p>Password must alphanumeric (@, _ and - are also allowed) and be 8 - 20 characters</p>
                            </div>
                            <div className="form-group">
                                        <input type="password" className="form-control" id="confirm" placeholder="Confirm Password *" onKeyUp={this.handleKeyUp} required style={{ height: 50, marginTop: 32 }}/>
                                <p>Re-enter the same password</p>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="btnSubmit" onClick={this.register.bind(this)}>Submit</button>
                     {this.state.registrationSuccess ? (<Redirect to = {
                         {
                             pathname : "/threads",
                             state : {
                                 email : this.state.email
                                }
                            }}/>) : null}
                            {this.state.userExists ? (
                            alert("User account already exixts"),
                            <Redirect to="/welcome"/>) : null}
                </div>
            </div>
        </div>
        <Welcome/>
            </div>
        );
    }
}

export default Registration;