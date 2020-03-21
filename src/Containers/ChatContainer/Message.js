

import React, { Component } from 'react'

import Card from './Templates/Card'
import InputCard from './Templates/InputCard'
import Carousel from './Templates/Carousel'
import DatePicker from './Templates/DatePicker'
import ListView from './Templates/ListView'
import Receipt from './Templates/Receipt'
import MyLeaves from "./Templates/MyLeaves"
import Invoice from "./Templates/Invoice"
import QandA from "./Templates/Q&A"
import FormWidget from "./Templates/Form/Form"
import ContactUS from "./Templates/ContactUS"
import Login from "./Templates/Login"
import Upload from "./Templates/Upload"
import Download from './Templates/Download'
import Location from './Templates/Location'
import Table from './Templates/Table'
import LikeAndDislike from "./Templates/LikeAndDislike"
import HRDetails from "./Templates/HRDetails"
import TextFields from "./Templates/TextFields"
import { Markup } from 'interweave'

import './css/style.css'
import axios from 'axios'

const bot_Icon = require("./images/bot_logo.png")


export default class extends Component {


  constructor(props) {
    super()
    this.state = {

      showWebView: false,
      webViewUrl: ""

    }
    //window.addEventListener("message", this.receiveMessage, false);


  }
  receiveMessage = (event) => {
    if (event.data == 'closewebview') {
      this.closeWebView()
    }
  }






  download=(value)=>{
      if(value=="downloadatte"){
        let URL = "http://172.25.131.168/v1/chatbot/download?id=attendancePolicy";
        axios({
          url: URL,
          method: 'GET',
          responseType: 'blob',
      }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', "attendancePolicy.pdf");
          document.body.appendChild(link);
          link.click();
      });
      }
  }


  openUrl = (url) => {
    var event = new CustomEvent("openWebView", { detail: url });
    document.dispatchEvent(event);
  }

  closeWebView = () => {
    this.setState({ showWebView: false })
  }

  sendMessage = (message) => {
    this.props.prepareMessageAndSend(message)
  }



  renderTemplates = (message, index) => {
    switch (message.attachmentLayout) {

      case "card":
        return <Card key={index} props={message.attachments[0].payload} />

      case "inputcard":
        return <InputCard key={index} props={message.attachments[0].payload} />

      case "listview":
        return <ListView key={index} props={message.attachments[0].payload} />

      case "Calender":
        return <DatePicker key={index} props={message.attachments[0].payload} />

      case "receipt":
        return <Receipt key={index} props={message.attachments[0].payload} />

      case "carousel":
        return <Carousel key={index} props={message.attachments} isLast = {message.isLast}/>

      case "MyLeaves":
        return <MyLeaves props={message.attachments[0].payload.leaves} />

      case "invoice":
        return <Invoice key={index} props={message.attachments[0]} />

      case "contactus":
        return <ContactUS key={index} props={message.attachments[0]} />

      case "Q&A":
        return <QandA key={index} props={message.attachments} isLast = {message.isLast}/>

      case "form":
        return <FormWidget key={index} props={message.attachments} isLast = {message.isLast}/>

      case "login":
        return <Login key={index} props={message.attachments}  isLast = {message.isLast} />

      case "upload":
        return <Upload key={index} props={message.attachments} />

      case "download":
          return <Download key={index} props={message.attachments[0].content.items} />

      case "Location":
        return <Location key={index} props={message.attachments[0].content} />
	
      case "table":
	      return <Table key={index} props={message.attachments[0].content} />

      case "likeanddislike":
        return <LikeAndDislike key={index} props={message.attachments[0]} />;
      
      case "hrdetails":
        return <HRDetails key={index} props={message.attachments[0]} />;
      
      case "textfields":
        return <TextFields key={index} props={message.attachments[0]} />;


      default: return this.renderTextMessages(message, index)
    }
  }

  textModify = (text) => {
    var urlRegex = /(https?:\/\/[^\s]+)|(http?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
      return `<a href=${url} target="_blank">${url}</a>`
    })
  }

  renderTextMessages = (message, index) => {
	
    let data123 =  message.text ?  message.text : ""
    let thumpsValue = data123.split(" ").splice(-1)
    
    let lastIndex = data123.lastIndexOf(" ");
    let textMessage = data123.substring(0, lastIndex);
   
   
    let data = this.props
    let botIcon = data.data ? data.data.chat_logo || bot_Icon : bot_Icon
    let textColor = data.data ? data.data.bottext_color || "#163666" : "#163666"
    let textbgColor = data.data ? data.data.bottext_bgcolor || "white" : "white"

    if (message.isBot) {
      if(thumpsValue == "[A]\n" || thumpsValue == "[A]"){
         return (
          textMessage ?
            <div key={index} className="bot">
              <div className="row text-left no_margin component_box">
                <div className="col-xs-1 align-top no_padding overlay-logo">
                  <img src={require("./images/bot_logo.png")} alt="Bot Image" className="bot_img" />
                </div>
                <div className="col-xs-10 align-top no_padding bot_chat" style={{ position: "relative" }}>
                  <div className="bubble card" >
                    <Markup content={this.textModify(textMessage)} />
                  </div>
                  <div>
                  <section className="rating-area align-center">
                    <div className="thumbs-up-circle align-center transition-fast">
                        <span className="thumbs-up transition-fast"><i className="icon fa fa-thumbs-up thumb "></i></span>
                    </div> &nbsp; &nbsp;
                    <div className="thumbs-up-circle align-center transition-fast">
                        <span className="thumbs-down transition-fast"><i className="icon fa fa-thumbs-down thumb "></i></span>
                    </div>
                  </section>
  
                  </div>
                </div>
              </div>
            </div> : null
        )
      }else{
        return (
          message.text ?
            <div key={index} className="bot">
              <div className="row text-left no_margin component_box">
                <div className="col-xs-1 align-top no_padding overlay-logo">
                  <img src={require("./images/bot_logo.png")} alt="Bot Image" className="bot_img" />
                </div>
                <div className="col-xs-10 align-top no_padding bot_chat" style={{ position: "relative" }}>
                  <div className="bubble card" >
                    <Markup content={this.textModify(message.text)} />
                  </div>
                </div>
              </div>
            </div> : null
        )
      }
      
    }
    else {
      return (
        <div key={index} className="user">
          <div className="row text-right no_margin component_box">
            <div className="col-xs-10 align-top no_padding col-xs-offset-2 user_chat">

              {

                message.payload && message.payload.showTitle ?
                <div>
                    <img style={{float:'right', marginTop:'-8px', marginBottom:'-25px', width:'13%'}}
                            src={require("./images/NayaraLogo.png")} alt="Bot Image" className="bot_img"  />
                    <div className="bubble card">
                        {message.payload.title}
                    </div>
                 </div>  :
                  message.payload && message.payload.hide ?
                    null :
                    <div>
                        <img style={{float:'right', marginTop:'-8px', marginBottom:'-25px', width:'13%'}}
                                src={require("./images/NayaraLogo.png")} alt="Bot Image" className="bot_img"  />
                        <div className="bubble card">
                        {message.text}
                        </div>
                    </div>
              }
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    let { showWebView, webViewUrl } = this.state;
    let { messages, quickReplies } = this.props;
    return (
      <div className="container-fluid content_box">
        <div className="row no_margin" style={{ height: "100%" }}>
          <div className="col-xs-12 no_padding" style={{ height: "100%" }}>

            <div className="component_container">
              <div className="various_component_box">
                
                    
              <div className="">
                {
              <div className="row text-left no_margin component_box button_component">
                <div className="col-xs-10 align-top no_padding bot_chat menucard" >
                  <div className="button_box">
                    {
                      quickReplies.map((item, index) => {
                        if (item.type == "openUrl") {
                          return (
                            <button
                              key={index}
                              type="button"
                              onClick={() => { this.openUrl(item.value); }}
                              className="btn btn-outline-dark">{item.title}</button>
                          )
                        }
                        else {
                          return (
                            <button
                              key={index}
                              type="button"
                              onClick={() => {  window.imBack({ text: item.value, payload: { showTitle: true, title: item.title } });this.download(item.value)}}
                              className="btn btn-outline-dark">{item.title}</button>
                          )
                        }
                      })
                    }
                  </div>
                </div>
              </div>
                }
            </div>
                  
                <div className="various_component_box">
                {
                  showWebView ?
                    <div style={{ height: "100%", width: "100%" }}>
                      <button
                        onClick={() => { this.closeWebView() }}
                        style={{ float: "right", backgroundColor: "#02ce9d", color: "#FFFFFF", border: "none" }}>Close X</button>
                      <iframe id="tf-iframe" src={webViewUrl} width="100%" height="100%" style={{ border: "none" }}>
                      </iframe>
                    </div> :
                    messages
                      .map((message, index) => {
                         message.isLast = (index ===   0)  ?  true  :  false
                        if (message.attachments) {
                          return this.renderTemplates(message, index)
                        }
                        else {
                          return this.renderTextMessages(message, index)
                        }
                      })
                }
                </div>
                
                
              </div>


            </div>
          </div>
        </div>
      </div>
    )
  }
}
