import React, { Component } from 'react';
import Thread from './Thread';
import {Redirect} from 'react-router-dom'
import Forum from './Forum'

class Threads extends Component {
    constructor(props){
        super(props);
        this.state = {
            apiValue : {},
            success : 0,
            username : '',
            createNewForum : false,
            searchArray : []
        }
    }

    logout = () => {
        localStorage.removeItem("jwtToken");
        this.setState({
            success : 2
        })
    }

    searchResults = array =>{
        this.setState({
            searchArray : array,
            success : 3
        })
    }

    createNewForum = () =>{
        this.setState({
            createNewForum : true,
            success : 0
        })
    }

    searchItem = (e) =>{
        const value = document.getElementById('search').value;
        const option = e.target.value;

        this.searchRequest(value,option);
    }

    clear = () =>{
        document.getElementById("search").value = null
        this.setState({
            success : 1
        })
    }

    searchRequest = async (value,option) =>{
        const rawResponse = await fetch('threads/search/'+option+'/'+value,{
        method : 'GET',
        headers : {
            Authorization : 'Bearer ' + localStorage.getItem("jwtToken")
        }
        })
        const response = await rawResponse.json()
        if(response.length > 0){
            this.setState({
                searchArray : response,
                success : 3
            })
        }
    }

    componentDidMount(){
        fetch ("/threads",{
            method : "GET",
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem("jwtToken")
            }
        })
        .then(response => {
           if (response.status !== 200) {
               console.log('Looks like there was a problem. Status Code: ' +
                 response.status);
                 throw new Error("An error has occured in Buggy component!");
             }
             console.log(localStorage.getItem("jwtToken"))
            response.json()
            .then(data => {
                this.setState({
                    apiValue : data
                },() => this.setState({
                    success : 1
                },()=> {
                  console.log("Threads fetched successfully :",this.state.apiValue)
                }))
            })
           })
        .catch(error => {
            console.log(error.message);
            this.setState({
                success : 2
            })
        })
   }

    render() {
        return (
            <div>
                <div id="threads">
                <link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.7.0/css/all.css' integrity='sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ' crossOrigin='anonymous'></link>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                    <div id="menuToggle" style={{width:40}}>
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
            {this.state.success !== 0 ? 
                    <div> <input type="text" id="search" placeholder="Search.." style={{ marginLeft: 500, width: 500 }}></input>
                    <div className="fa fa-close" style={{position: "absolute", left: 980,top: 53}} onClick = {this.clear}/>
                    <select name="cars" style={{ width: 200, height: 50, marginLeft: 1, marginTop: 9 }} defaultValue = "none" onChange = {this.searchItem}>
                        <option disabled hidden value="none"> -- select an option -- </option>
                        <option value="title">Title</option>
                        <option value="description">Description</option>
                        <option value="username">Username</option>
                        </select> </div>: null}

                <button style={{
                    fontSize: 24, float: "right", marginRight: 25, marginTop : 10, paddingTop: 5, paddingRight: 10, paddingBottom: 5, paddingLeft:10}}
                    onClick={() => 
                        { if (window.confirm('Are you sure you wish to logout?')) this.logout() } }>
                        <i className='fas fa-user-shield' style= {{paddingRight : 5}}></i>
                        {localStorage.getItem("jwtToken") ? JSON.parse(atob(localStorage.getItem("jwtToken").split('.')[1])).username : null}
                </button>
                        
                      {this.state.success ===1 ? this.state.apiValue.map((json,i) => {
                      return  <Thread key = {i} email = {json.email} description = {json.description} title = {json.title} tags = {json.tags} date = {json.date} username = {json.username} search ={this.searchResults}></Thread>
                    }) : null}

                    {this.state.success === 3 ? this.state.searchArray.map((json, i) => {
                        return <Thread key={i} email={json.email} description={json.description} title={json.title} tags={json.tags} date={json.date} username={json.username} search={this.searchResults}></Thread>
                    }) : null}

                     {this.state.success === 2 ? <Redirect to="/welcome"></Redirect> : null} 
                    <div onClick={this.createNewForum} className="float" style={{ position: "fixed" }}>
                        <i className="fa fa-plus my-float"></i>
                    </div>
                </div>
                     {this.state.createNewForum === true ? <Forum></Forum> : null}
                
            </div>
        );
    }
}
export default Threads;