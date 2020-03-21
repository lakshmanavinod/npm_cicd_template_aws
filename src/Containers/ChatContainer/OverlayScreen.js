import React, { Component } from 'react'

import './css/style.css'

export default class OverlayScreen extends Component {

  render() {
    return (

      <div className="overlay_section" id="overlay_section">
        <div className="overlay_image">
          <img src={require("./images/getstarted_img.png")} alt="Bot Image" className="get_bot_image" />
        </div>
        <div className="overlay_card text-center">
          <div className="techforce_logo">
            <img src={require("./images/chat_logo.png")} alt="TechForce" />
          </div>
          <div className="techforce_heading">
            <h6>Hi, we're Techforce</h6>
            <img src={require("./images/smiley_waving_hand.png")} alt="TechForce" />
          </div>
          <div className="techforce_content">
            <p>We help your business grow by connecting you to your customers.</p>
          </div>
          <div className="techforce_button">
            <button type="button" className="btn" id="get_started">GET STARTED</button>
          </div>
        </div>
        <div className="overlay_footer">
          <p>Copyright 2017 - 2018 Digitamize Inc | All Rights Reserved</p>
        </div>
      </div>

    )
  }
}