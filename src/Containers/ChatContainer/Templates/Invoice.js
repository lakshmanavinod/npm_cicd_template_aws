import React, { Component } from 'react'

import '../css/style.css'

export default class Invoice extends Component {

  constructor(props) {
    super()
  }
  componentDidMount(){
  }

  render() {
    let item= this.props.props.content.items
    return (
      <div className="row text-left no_margin component_box">
        <div className="col-xs-1 align-top no_padding">
          <img src={require("../images/bot_logo.png")} alt="Bot Image" className="bot_img" />
        </div>
        <div className="col-xs-10 align-top no_padding bot_chat">
          <div className="order card">
            <ul className="list-group list-group-flush text-center">
              <li className="list-group-item receipt_header">
                <div className="download_icon">
                  <a href="#">
                    <img src= {require('../images/icon_download.png')} alt="Download Icon" />
                  </a>
                </div>
                <div className="receipt_logo">
                  <img src= 'https://i.ibb.co/RvS1d5j/download.png' alt="Receipt Icon" />
                </div>
                <div className="receipt_title">
                  <h3 className="text-compress">Charak Limited</h3>
                  <p className="dark_text medium_text text-compress">Thank you for order</p>
                </div>
                <div className="receipt_head medium_text">
                  <div className="left_part">
                    <p className="dark_text">
                      Tracking Number
                  </p>
                    <p className="text-compress" title="56399377BGF">
                    {item[0].ORDER_NUMBER}
                  </p>
                  </div>
                  <div className="right_part">
                    <p className="dark_text">
                      Order Date
                  </p>
                    <p className="text-compress" title="9th Mon, Aug 2018">
                    {new Date(item[0].ORDER_DATE).toLocaleDateString()}
                  </p>
                  </div>
                  <div className="clearfix"></div>
                </div>
              </li>
              <li className="list-group-item receipt_content">
                  { item[0].ORDER_ITEMS.map((item , index) =>{
                      return (
                      <label key={index}>

                      <div className="receipt_box medium_text">
                        <div className="receipt_circle">
                          <div>
                            <img src= {item.SMALL_IMAGE_URL} alt="" />
                          </div>
                        </div>
                        <div className="receipt_text text-left">
                          <p className="dark_text text-compress large_text" title="Mustard Solid Top">{item.PRODUCT_NAME}</p>
                          <p className="small_text">
                            <span className="light_text">Qty: </span>
                            <span>{item.QUANTITY}</span>
                            <span className="light_text">|Price:</span>
                            <span>{item.UNIT_PRICE}</span>
                          </p>
                        </div>
                        <div className="receipt_price text-right">
                        <p className="light_text small_text"></p>
                        <p className="dark_text">&#8377; {item.ORDERLINE_PRICE}</p>
                        </div>
                      </div>
                      </label>
                    )}
                  )}
              </li>
              <li className="list-group-item receipt_footer">
               <div className="left_part">
                {/* <p className="light_text medium_text">
                    Subtotal
                </p>
                  <p className="light_text medium_text">
                    Order Date
                </p>*/}
                <p className="total_amt">
                    Total Amount
                </p>
                </div>
                <div className="right_part">
                { /* <p className="light_text medium_text">
                    &#8377; 4000
                </p>
                  <p className="light_text medium_text">
                    &#8377; 95
                </p>*/}
                  <p className="total_amt">
                    &#8377; {item[0].ORDER_VALUE}
                </p>
                </div>
                <div>
                <div className="left_part">
                   <p className="total_amt">
                      ADDRESS:
                   </p>

                    <div>{item[0].ADDRESS},</div>
                    <div>  {item[0].CITY},</div>
                      <div>{item[0].STATE},</div>
                      <div>{item[0].COUNTRY}</div>
                  </div>
                </div>

                <div className="clearfix"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
