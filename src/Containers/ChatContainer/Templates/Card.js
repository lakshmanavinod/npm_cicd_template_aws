import React, { Component } from 'react'

import '../css/style.css'

export default class Card extends Component {

  constructor(props) {
    super()
  }

  render() {
    let { title, actions } = this.props.props
    return (
      <div className="row text-left no_margin component_box">
        <div className="col-xs-1 align-top no_padding">
          <img src={require("../images/bot_logo.png")} alt="Bot Image" className="bot_img" />
        </div>
        <div className="col-xs-10 align-top no_padding bot_chat">
          <div className="bubble card">
            {title}
          </div>
          <div className="select card">
            <ul className="list-group list-group-flush text-center">
              {
                actions.map((action, index) => {
                  return (
                    <li className="list-group-item" key={index}>
                      <a href="#" onClick={() => window.imBack({ text: action.reply, payload: null })}>{action.text}</a>
                    </li>
                  )
                })
              }

            </ul>
          </div>
          <div className="select smiley text-right">
            <img src={require("../images/smiley_heart_eyes.png")} alt="Smiley" />
          </div>
        </div>
      </div>
    )
  }
}





