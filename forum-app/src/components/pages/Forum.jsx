import React from 'react';
import './Forum.css'
import {Redirect} from 'react-router-dom'

const cancelNewForm = () => {
    return <Redirect to = "/"></Redirect>
}

const addThread = () =>{
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    let tags = document.getElementById('tag').value.split(',');
    tags = tags.map(tag => tag.trim())
    const username = JSON.parse(atob(localStorage.getItem("jwtToken").split('.')[1])).username;
    const email = JSON.parse(atob(localStorage.getItem("jwtToken").split('.')[1])).email;
    sendCreateRequest(title,description,tags,username,email);
}

const sendCreateRequest = async (title, description, tags, username, email) =>{
        const rawResponse = await fetch('/threads/createNew', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("jwtToken")
            },
            body: JSON.stringify({
                title : title,
                description : description,
                tags : tags,
                username : username,
                email : email
            })
        })
        const content = await rawResponse.json();
        console.log(content);
}

const forum = (props) => {

    return (
        <div style={{ position: "absolute", zIndex: 10,marginLeft : 350, marginTop : 150}}>
            <h3><center>New Thread</center></h3>
            <div className="containers" style={{margin : 20}}>
                <form>
                    <label htmlFor="fname">Title</label>
                    <input type="text" id="title" placeholder="Your Title.."/>

                    <label htmlFor="subject">Description</label>
                    <textarea id="description" placeholder="Write something.." style={{ height: 200 }}></textarea>

                        <label htmlFor="lname">Tags</label>
                        <input type="text" id="tag" placeholder="Every tags should be followed by commas.."/>

                        

                            <input type="submit" value="Submit" onClick = {addThread}/>
                    <input type="submit" value="Cancel" onClick = {cancelNewForm} style={{ backgroundColor : "red",float : "right"}}/>
                         </form>
                </div>
        </div>
    )};

export default forum;