import React, { Component } from 'react'

import '../css/style.css'

export default class InputCard extends Component {

  constructor(props) {
    super()
  }

  render() {

    let { title, actions, fields } = this.props.props

    return (
      <div className="row text-left no_margin component_box">
        <div className="col-xs-1 align-top no_padding">
          <img src={require("../images/bot_logo.png")} alt="Bot Image" className="bot_img" />
        </div>
        <div className="col-xs-10 align-top no_padding bot_chat">
          <div className="bubble card">
            {title}
          </div>
          <div className="input card">
            <ul className="list-group list-group-flush text-center">
              <li className="list-group-item">
                <form action="#" method="post" className="form_box text-left">
                  {
                    fields.map((field, index) => {
                      return (
                        <div className="form-group">
                          <label >{field.text}</label>
                          <input type={field.type} className="form-control" id="username" placeholder={field.text} />
                        </div>
                      )
                    })
                  }

                </form>
              </li>

              {
                actions.map((action, index) => {
                  return (
                    <li className="list-group-item">
                      <a onClick={() => { window.imBack((action.text)) }}>Reset</a>
                    </li>
                  )
                })
              }
              <li className="list-group-item">
                <a href="#">Cancel</a>
              </li>
              <li className="list-group-item filled">
                <a href="#">Submit</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}





