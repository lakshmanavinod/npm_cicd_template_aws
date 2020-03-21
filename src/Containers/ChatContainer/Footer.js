import React, { Component } from 'react'

import './css/style.css'

export default class Footer extends Component {

  constructor(props) {
    super()
    this.state = {
      currentMessageText: ""
    }
  }

  componentDidMount()
  {
    //document.getElementById('cancel-dialog').style.display = "none"
  }


  cancelDialog=()=>{
    document.getElementById('inputText').disabled = false
    localStorage.setItem("conversation", "true")
    var conversationStatus = localStorage.getItem("conversation")
    if (conversationStatus == "true") {
      window.imBack({ "text": "cancel", payload: { hide: true } })
    }
  }



  sendMessage = (e) => {
    let { currentMessageText } = this.state;
    this.props.prepareMessageAndSend({ text: currentMessageText })
    this.setState({ currentMessageText: "" })
  }

  handleChange = (event) => {
    debugger;
    let file = event.target.files[0]
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(e.target.result);
      
    }
  }

  render() {

    let { currentMessageText } = this.state;

    return (
      <div className="chatbot_footer" id="footer_Input">
        <div className="footer_box">

    <div class="more" >
        <button id="more-btn" class="more-btn" onClick={this.cancelDialog} chatbot-menu-tooltip="Menu">
          <div class="men-btn">
            <span class="more-dot"></span>
            <span class="more-dot"></span>
            <span class="more-dot"></span>
            </div>
          <div class="men-btn">
              <span class="more-dot one"></span>
            <span class="more-dot"></span>
            <span class="more-dot"></span>
          </div>
          <div class="men-btn">

                      <span class="more-dot"></span>
            <span class="more-dot"></span>
            <span class="more-dot"></span>
          </div>
        </button>
    </div>



          <div className="icon_attach">
            <div className="image-upload">
              <label htmlFor="file-input">
                <img src={require("./images/Attachement%402x.png")} alt="Attach" />
              </label>
              <input id="file-input" type="file" style = {{"display": "none"}}
                onInput={(e)=> {
                  this.handleChange(e)
                }}
                />
            </div>
          </div>
          <div className="type_here">
            <input id="inputText" type="text"
              name="type_here"
              placeholder="Type here..."
              value={currentMessageText}
              placeholder="Type something..."
              onChange={(e) => this.setState({ currentMessageText: e.target.value })}
              onKeyPress={(e) => { if (e.key === "Enter") { this.sendMessage() } }} />
          </div>
          <div className="icon_send">
            <a onClick={() => { this.sendMessage() }}>
              <img src={require("./images/icon_send.png")} alt="Send" />
            </a>
          </div>
          <div className="icon_smily">
            <a href="#">
              <img src={require("./images/smile%402x.png")} alt="Smiley" />
            </a>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>

    )
  }
}
