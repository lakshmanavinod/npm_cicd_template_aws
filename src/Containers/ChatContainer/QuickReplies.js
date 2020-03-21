import React, { Component } from 'react'

import './css/style.css'

export default class QuickReplies extends Component {

  render() {
    return (

      <div className="button_component_box">
        <div className="row text-left no_margin component_box button_component">
          <div className="col-xs-10 col-xs-offset-1 align-top no_padding bot_chat">
            <div className="button_box">
              <button type="button" className="btn btn-outline-dark">Search Properties</button>
              <button type="button" className="btn btn-outline-dark">Get Help</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

