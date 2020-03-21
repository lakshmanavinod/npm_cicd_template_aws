import React, { Component } from 'react'
import { DirectLine } from "botframework-directlinejs";
import { WebSocketSubject } from 'rxjs/webSocket'
import $ from 'jquery'
//import $ from 'jquery'

import './css/style.css'
import './css/grid.min.css'

import OverlayScreen from './OverlayScreen'
import Header from './Header'
import Footer from './Footer'
import Messages from './Message'
import QuickReplies from './QuickReplies'
import WebView from './WebView'

const bgContainerImage = require("./images/chat_bg.png")


const channelId = Math.floor(100000000 + Math.random() * 900000)

const channel$ = new WebSocketSubject(`ws://${process.env.CHANNEL_MANAGER}/${channelId}`)


export default class HomeContainer extends Component {

  constructor() {
    super()
    this.state = {
      messages: [],
      quickReplies: [],
      showToolTip: false,
      lastMessage: "",
      //  userId: Math.floor(100000000 + Math.random() * 900000),
      showWebView: false,
      webViewUrl: ""
    }

    channel$.subscribe(botMessage => {

      let quickReplies = [];
      let newMessage;
      if (!botMessage.from.client) {
        if (botMessage.attachments) {
          if (botMessage.attachments[0].content && !botMessage.attachments[0].content.title) {
            quickReplies = botMessage.attachments[0].content.buttons.map(button => {
              return {
                title: button.title,
                value: button.value,
                type: button.type
              }
            })
            // newMessage = this.botMessageToWebMessage(botMessage);
            this.setState({ quickReplies, });
          }
          else if (botMessage.attachments[0].payload) {
            newMessage = this.botMessageToWebMessage(botMessage);
            this.setState({ messages: [newMessage, ...this.state.messages], quickReplies });
          }
        }
        if (botMessage.suggestedActions) {
          // if (botMessage.attachments) {

          // }
          quickReplies = botMessage.suggestedActions.actions.map((item, index) => {
            console.log("item-----------------", item);

            return {
              title: item.title,
              value: item.value,
              type: item.type

            }
          })
          newMessage = this.botMessageToWebMessage(botMessage);
          this.setState({ messages: [newMessage, ...this.state.messages], quickReplies, });

        }
        else {
          let toolTipVisisble = $("#chatbot_container").css("display")
          console.log(toolTipVisisble)
          let { lastMessage } = this.state;
          newMessage = this.botMessageToWebMessage(botMessage);
          if (newMessage.type == "message") {
            lastMessage = newMessage.text;
          }
          if (toolTipVisisble == "none") {
            this.setState({ showToolTip: true })
          }
          else if (toolTipVisisble == "block") {
            this.setState({ showToolTip: false })
          }

          this.setState({ messages: [newMessage, ...this.state.messages], quickReplies, lastMessage });
        }
      }
    });

    document.addEventListener("send-message", (e) => {
      this.prepareMessageAndSend(e.detail) // Prints "Example of an event"
    });
    document.addEventListener("show-tooltip", (e) => {
      this.setState({ showToolTip: e.detail }) // Prints "Example of an event"
    });
    document.addEventListener("openWebView", (event) => { this.setState({ showWebView: true, webViewUrl: event.detail }) });
    window.addEventListener("message", this.receiveMessageFromWebView, false);
  }
  // logForce() {
  //   console.log('%c May the force be with you!', 'font-weight: bold; font-size: 50px;color: #02ce9d; text-shadow: 3px 3px 0 rgb(0, 0, 0)');
  // }
  // componentDidMount() {
  //   try {
  //     //this.logForce()
  //     let url = window.location.href
  //     url = new URL(url)
  //     let metaData = atob(url.searchParams.get('q'))
  //     let { uId, refId, project, model } = JSON.parse(metaData)
  //     this.project = project
  //     this.model = model
  //     let message = {
  //       payload: {
  //         trigger: true,
  //         triggerId: refId,
  //         userId: uId
  //       }
  //     }
  //     this.prepareMessageAndSend(message)
  //   } catch (e) {
  //     console.log()
  //   }
  // }

  receiveMessageFromWebView = (event) => {
    if (event.data == 'closewebview') {
      this.closeWebView()
    }
  }

  closeWebView = () => {
    this.setState({ showWebView: false })
  }


  botMessageToWebMessage = (botMessage) => {
    return {
      ...botMessage,
      isBot: true,
      id: channelId,
      createdAt: botMessage.timestamp,
      from: {
        _id: "Bot",
        avatar: ""
      }
    }
  }

  webMessageToBotMessage = (message, self) => {
    // let { userName, userId } = self.props.userReducer
    //let userId = message.payload && message.payload.userId || this.state.userId
    return {
      from: { id: channelId, name: channelId, client: true, user_id: sessionStorage.getItem('userId'), },
      type: "message",
      text: message.text,
      payload: message.payload || null
    };
  };

  prepareMessageAndSend = (message) => {
    this.setState({ quickReplies: [], showMenuOption: false })
    let msg = {
      isBot: false,
      user: {
        _id: channelId,
        avatar: ""
      },
      text: message.text,
      payload: message.payload,
      type: "message"
    }
    this.setState({ currentMessageText: "" })
    if (message.text !== "") { this.onSend([msg]) }
  }

  //
  // onSend = (messages) => {
  //   let self = this;
  //   this.setState({ messages: [...messages, ...this.state.messages] })
  //   messages.forEach(message => {
  //     channel$
  //       .postActivity(this.webMessageToBotMessage(message, self))
  //       .subscribe(() => { },
  //         () => console.log("failed"));
  //   });
  // }

  onSend = (messages) => {
    let self = this;
    this.setState({ messages: [...messages, ...this.state.messages] })
    messages.forEach(message => {
      channel$
        .next(this.webMessageToBotMessage(message, self))
    });
  }

  componentCleanup = () => {
    sessionStorage.clear()
  }
  componentWillMount = () => {
    this.componentCleanup()
  }



  render() {
    let { showWebView, webViewUrl, showToolTip, lastMessage } = this.state
    return (
      <div>
        {
          showWebView ?
            <div className="chatbot_container card" id="chatbot_container" >
              <WebView closeWebView={this.closeWebView} webViewUrl={webViewUrl} />
            </div> :
            <div className="chatbot_container card" id="chatbot_container">
              <Header {...this.state} />
              <Messages {...this.state} messages={this.state.messages} quickReplies={this.state.quickReplies} prepareMessageAndSend={(e) => { this.prepareMessageAndSend(e) }} />
              <Footer prepareMessageAndSend={(e) => { this.prepareMessageAndSend(e) }} />
            </div>
        }


        {
          showToolTip && lastMessage && lastMessage.length > 0 ?
            <div className="chat-tool-tip">
              <div
                onClick={() => { this.setState({ showToolTip: false }) }}
                style={{ width: 15, height: 15, backgroundColor: "#9e9e9e", borderRadius: "50%", display: "flex", flexDirection: "row", justifyContent: "center", alignContent: "center", alignItems: "center", marginLeft: "auto" }}>
                <img src={require('./images/close.png')} style={{ width: 5, height: 5 }} />
              </div>
              {/* <div className="chat-tool-tip-bot">
                <img src={require("./images/bot_logo_white.png")} alt="Bot White Image" id="bot_white_image" />
              </div> */}
              <p>{lastMessage}</p>
            </div> : null

        }


        <div className="bot_initiator" id="bot_initiator">
          <img src={require("./images/bot_logo_white.png")} alt="Bot White Image" id="bot_white_image" />
          <img src={require("./images/icon_cancel.png")} alt="Cancel" id="cancel_icon" />
        </div>
      </div>

    )
  }

}
