import React, { Component } from 'react'

import '../css/style.css'

export default class Carousel extends Component {

  constructor(props) {
    super(props)
  }

 componentDidMount(){
      //if(this.props.isLast){
          // document.getElementById('footer_Input').style.display = "none"
    //}
   }



  triggerAPI=(value)=>{
    console.log("============\n",value)
    if(value=="AP_VP"){
      console.log("============\nin ap",value)
      this.downloadFile("attendancePolicy")
    }
    else if(value=="CAP_VP"){
      console.log("============\nin cap",value)
      this.downloadFile("attirePolicy")
    }
  }

  render() {
    return (
      <div className="row text-left no_margin component_box">

        <div className="col-xs-1 align-top no_padding">
          <img src={require("../images/bot_logo.png")} alt="Bot Image" className="bot_img" />
        </div>


        <div className="col-xs-10 align-top no_padding bot_chat">
          {/* <div className="bubble card">
            Pick your dress from cards
        </div> */}

          <div className="row">
            <div className="col-xs-12">

              <div className="carousel_box">
                {this.props.props.map((item, index) => {
                  let itemData = item.content.title.split(",")
                  let subTitleData = item.content.subtitle ? item.content.subtitle.split(",") : null
                  return (
                    <div className="carousel card" key={index}>
                      <ul className="list-group list-group-flush text-center">
                        <li className="list-group-item">
                          <div className="carousel_content">
                            { item.content.images[0].url ?

                              <div className="carousel_image card">
                                <img src={require('../images/carousalimages/'+item.content.images[0].url)}/>
                              </div>:null

                            }
                            </div>
			  <div className="carousel_detail">
                               {itemData.map((title, index) => {
                                  return (
                                    <h2 className="heading" key={index} style={{ color: "#00adcc" }}>{title}</h2>
                                  )
                               })
                              }
			 </div>
                            </li>
                            {
                              item.content.buttons.map((button, index) => {
                                return (
                                  <li className="list-group-item" key={index}>
                                    <a href="#" onClick={() => { document.getElementById('footer_Input').style.display = "block" ; window.imBack({ text: button.value, payload: { showTitle: true, title: button.title } }) 
                                  }} >
                                      {button.title}
                                    </a>
                                  </li>
                                )
                              })
                            }
                          </ul>
                        </div>
                  )
                })}
              </div>
            </div>
          </div>
{/* 
                {this.props.props.map((item, index) => {
                  let itemData = item.content.title.split(",")
                  let subTitleData = item.content.subtitle ? item.content.subtitle.split(",") : null
                  return(
                    <div className="payment card" key={index}>
                      <ul className="list-group list-group-flush text-center">
                        <li className="list-group-item payment_list">
                          <label for="paypal">
                            <div className="payment_item">

                              { item.content.images[0].url ?

                                <div className="payment_icon">
                                  <img src={item.content.images[0].url}/>
                                </div>:null

                              }
                              {
                                item.content.buttons.map((button, index) => {
                                  return (
                                    <div className="payment_text" key={index}>
                                      <a  onClick={() => { window.imBack({ text: button.value, payload: { showTitle: true, title: button.title } }) }} >
                                        {button.title}
                                      </a><br></br>
                                    </div>
                                  )
                                })
                              }
                          </div>
                          </label>
                        </li>
                      </ul>
                    </div>

                  )

                } */}
              </div>
      </div>
    )
  }
}
