import React, { Component } from 'react'

import '../css/style.css'

export default class QandA extends Component {

    constructor(props) {
        super()
    }

 componentDidMount(){
      if(this.props.isLast){
           document.getElementById('inputText').disabled = true
           //document.getElementById('cancel-dialog').style.display = "block"
    }
   }

    //componentDidMount(){
    //    if(this.props.isLast){
    //         document.getElementById('footer_Input').style.display = "none"
   //  }
  // }

    render() {

        let items = this.props.props;
        return (
            <div className="row text-left no_margin component_box">
                <div className="col-xs-1 align-top no_padding">
                <img src={require("../images/bot_logo.png")} alt="Bot Image" className="bot_img" />
                </div>
                <div className="col-xs-10 align-top no_padding bot_chat">
                    <div className="select card">
                        <ul className="list-group list-group-flush text-center">
                            {
                                items.map((item, index) => {
                                    return (
                                        <li className="list-group-item" style = {{borderRadius: 15}}>
                                            <a href="#" onClick={() => {document.getElementById('inputText').disabled = false; window.imBack({ text: item.content.buttons[0].value, payload: { showTitle: true, title: item.content.buttons[0].value } }) }} >
                                            {item.content.buttons[0].value}
                                            </a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>

        )
    }
}
