import React, { Component } from "react";

class HRDetails extends Component {
  constructor(props) {
    super();
  }

  copyMailtoClip = (mailId) => {
    console.log(mailId)
    navigator.clipboard.writeText(mailId).then(function() {
      
    })
  }

  render() {
    let items = this.props.props.content.items[0];

    return (
      <div className="row text-left no_margin component_box">
        <div className="col-xs-1 align-top no_padding">
          <img
            src={require("../images/bot_logo.png")}
            alt="Bot Image"
            className="bot_img"
          />
        </div>
        <div className="col-xs-10 align-top no_padding bot_chat">
          <div className="bubble card">{items.title}</div>
          <div className="row">
            <div className="col-xs-12">
              <div className="carousel_box">
                {items.variable.map((row, index) => {
                  return (
                    <div className="carousel card hrdetailscards">
                      <ul className="list-group list-group-flush text-center">
                        <li className="list-group-item">
                          <div className="carousel_content hrcontentdata" >
                            <div className="hrcarousel_image">
                              <img className="hrimage" src={row.image} alt="Carousel Image" />
                            </div>
                            <div className="carousel_detail">
                              <h6 className="heading">{row.name}</h6>
                              <p className="content">
                                <span className="hrmail_left">
                                  {
                                    row.mail.length>30?row.mail.substring(0,25)+"...":row.mail
                                  }
                                </span>
                                  <img src={require("../images/clipboard.png")} className="clipboard_img"  onClick={()=>this.copyMailtoClip(row.mail)} title="copy to clipboard"></img>
                                  <br/>
                                <span>
                                M:{row.mobile} <br />
                                </span>
                                <span>
                                T: {row.telephone} Ext : {row.ext}
                                </span>
                              </p>
                            </div>
                          </div>
                        </li>
                        <div className="HRLabel">
                          <label>Business Functions</label>
                        </div>
                        <div className="HRdepts">
                        {row.businessfunctions.map((rowData, index) => {
                          return (
                            <li className="list-group-item">
                              <label className= "label">{rowData}</label>
                            </li>
                          );
                        })}
                        </div>
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HRDetails;