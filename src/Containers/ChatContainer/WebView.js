import React, { Component } from 'react'


export default class Webview extends Component {

  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{ width: "100%", height: 50, backgroundColor: "#02ce9d", display: "flex", flexDirection: "row", justifyContent: "space-between", alignContent: "center", alignItems: "center", padding: "0px 10px" }}>
          <button onClick={() => this.props.closeWebView()} style={{border:"none" ,  backgroundColor: "#02ce9d"}}>
            <img src={require('./images/icon_cancel.png')} style={{ width: 30, height: 30 }} />
          </button>
        </div>
        <iframe id="tf-iframe" src={this.props.webViewUrl} width="100%" height="100%" style={{ border: "none" }}>
        </iframe>
      </div>
    )
  }
}
