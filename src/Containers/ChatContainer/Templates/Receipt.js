import React, { Component } from 'react'

import '../css/style.css'

export default class Receipt extends Component {

  constructor(props) {
    super()
  }

  render() {

    let { title, fields } = this.props.props;

    return (
      <div className="row text-left no_margin component_box">
        <div className="col-xs-1 align-top no_padding">
          <img src={require("../images/bot_logo.png")} alt="Bot Image" className="bot_img" />
        </div>
        <div className="col-xs-10 align-top no_padding bot_chat">
          <div className="select card">

            <div style={{ textAlign: "center", borderBottom: "solid 1px #eeeeee" }}>
              <img src={require("../images/meeting_icon.png")} style={{ width: "30%" }} alt="Icon" />
              <h4 style={{ fontWeight: 700 }}>{title}</h4>
            </div>


            <div style={{ padding: 10 }}>
              {
                fields.map((item, index) => {
                  return (
                    <div key={index} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                      <p style={{ margin: 1 }}>{item.key}</p>
                      <p style={{ margin: 1 ,width:"50%" }}>{item.value}</p>
                    </div>
                  )
                })
              }
            </div>



          </div>
          <div className="select smiley text-right">
            <img src={require("../images/smiley_heart_eyes.png")} alt="Smiley" />
          </div>
        </div>
      </div>
    )
  }
}





