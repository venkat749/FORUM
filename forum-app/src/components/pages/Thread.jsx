import React, { Component } from 'react';
import './Thread.css';
import Welcome from './Welcome';
import Threads from './Threads'
import {Redirect} from 'react-router-dom'

class Thread extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    borderRadius = {
        borderRadius: 23,
        right: 600,
        width: 1644,
        top : 30
      }

    searchTag = (e) =>{
      this.sendTagRequest(e.target.value)
    }
    sendTagRequest = async (value) =>{
      console.log(value)
      const rawResponse = await fetch('/threads/searchTag/'+value,{
        method : 'GET',
        headers : {
          'Authorization': 'Bearer ' + localStorage.getItem("jwtToken")
        },
      });
      const response = await rawResponse.json();
      console.log(response);
        debugger
        this.props.search(response)
    }

    render() {
        return (
            <div className="loginPage" style={{position : "relative"}}>
                   <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"></link>
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
                <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <body-form>
  <div className="container">
    <div style = {{marginTop : 20}}>
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto" style={{marginTop : 30}}>
        <div className="card card-signin my-5" style={this.borderRadius}>
                      <div className="card-body" style={{background: "antiquewhite"}}>
            <form >
              <div >
                            <label htmlFor="title">Title</label>
                            <p className="form-control" style={{ marginBottom: 20, background: "lightgray" }}>{this.props.title}</p>
              </div>

              <div >
                            <label htmlFor="description">Description</label>
                            <p className="form-control" style={{ marginBottom: 20, background: "lightgray" }}>{this.props.description} </p>
              </div>

                          <label htmlFor="tag">Tag</label>
                {this.props.tags.map((tag,i) => {
                      return  <div key = {i} >
                        <input type="button" onClick = {this.searchTag} value={tag} style={{ outline: "none", marginLeft: 20, float: "left", borderRadius: 20, background: "lightgray", padding : 7 }}/>
                      </div>
                })}

                <div>
                  <p style={{float:"right",marginBottom:0}}>{this.props.username}</p>
                </div>
                <br></br>
                <div>
                            <p style={{ float: "right"}}>{this.props.date}</p>
                </div>
            
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</body-form>
 </div>
        );
    }
}

export default Thread;