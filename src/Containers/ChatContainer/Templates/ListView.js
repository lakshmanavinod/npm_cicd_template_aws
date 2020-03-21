import React, { Component } from 'react'

import '../css/style.css'

export default class ListView extends Component {

  constructor(props) {
    super()
  }

  render() {
    let { title, actions, data } = this.props.props
    return (
      <div className="row text-left no_margin component_box">
        <div className="col-xs-1 align-top no_padding">
          <img src={require("../images/bot_logo.png")} alt="Bot Image" className="bot_img" />
        </div>
        <div className="col-xs-10 align-top no_padding bot_chat">

          <div className="select card">

            <div style={{ display: "inline-flex", borderBottom: "solid 1px #eeeeee", width: "100%" }}>
              <div className="meeting_icon">
                <img src={require("../images/meeting_icon.png")} alt="Meeting Icon" />
              </div>

              <div>
                <p style={{ fontWeight: 700, fontSize: 12 }}>{title}</p>
              </div>
            </div>

            <ul style={{ listStyle: "none", padding: 0, height: 250, overflowY: "scroll" }}>
              {

                data.map((item, index) => {
                  return (

                    <li key={index} style={{ padding: 5 }}>
                      <div style={{ width: "100%", padding: "0px 5px", borderBottom: index == data.length ? "none" : "solid 1px #eeeeee", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <p style={{ fontWeight: 700, fontSize: 12 }}>{item.title}</p>
                        <div style={{textAlign: "right"}}>
                        <p style={{ fontWeight: 200, fontSize: 12, color: "#02ce9d",margin:0 }}>
                          {item.subTitle}
                        </p>
                        <p style={{ fontWeight: 200, fontSize: 12, color: "#dbdbdb",margin:0  }}>{item.subTitleDetails}</p>
                        </div>
                      </div>
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
      </div >

    )
  }
}
