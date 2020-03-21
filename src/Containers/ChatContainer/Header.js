import React, { Component } from 'react'

import './css/style.css'


export default class Header extends Component {
  render() {
    let data  = this.props

    let bgcolor = data.data ? data.data.header_bgcolor || "white" :"white"

    return (
      <div className="chatbot_header">
        <div className="profile_box">
        <div className="profile_image">
                <img style={{height:"105%", objectfit: "contain"}} src={require("./images/NayaraLogo.png")} alt="freddit" />
           </div>
        <div className="profile_content" >
            <p style={{color: 'white', fontSize:'15px', marginLeft:'7px', marginTop:'7px', textAlign:'-webkit-center'}}>NAYARA DIGITAL ASSISTANT</p>
        </div>
        
          <div className="profile_cancel" id="profile_cancel"  style={{backgroundColor:"#4d79ff" , borderRadius:"50%"}}>
            <img src={require("./images/icon_cancel.png")} alt="Cancel" />
          </div>
        </div>
      </div>
    )
  }
}
