import React, { Component } from 'react'

import '../css/style.css'

export default class ContactUS extends Component {

    constructor(props) {
        super()
        this.state = {

        }
    }

    componentWillMount(){
        this.props.props.content.items.map((item,index)=>(
          this.setState({ [item.value] : ''})
        ))
      

    }

    handleChange=(e)=>{
        this.setState({ [e.target.name]: e.target.value });
      }

    render() {


        let { content } = this.props.props;

        return (
            <div class="row text-left no_margin component_box">
                <div class="col-xs-1 align-top no_padding">
                    <img src={require("../images/bot_logo.png")} alt="Bot Image" className="bot_img" />
                </div>
                <div class="col-xs-10 align-top no_padding bot_chat">
                    <div class="input card">
                        <ul class="list-group list-group-flush text-center">
                            <li class="list-group-item">

                                <div class="form_box text-left">
                                    {
                                        content.items.map((item, index) => {
                                            if (item.value) {
                                                if (item.value === 'text area') {
                                                    return (
                                                        <div class="form-group">
                                                            <label for="username">How can we help you?</label>
                                                            <textarea name="comment" class="form-control" key={index} onChange={ this.handleChange }  ></textarea>
                                                        </div>
                                                    )
                                                }
                                                return (
                                                    <div class="form-group">
                                                        <label for="username">{item.value}</label>
                                                        <input type="text" name={item.value} value={this.state[item.value]}class="form-control" key={index}   onChange={ this.handleChange }  />
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </li>
                            {
                                content.buttons.map((button, index) => {
                                    if (button.value) {
                                        return (
                                            <li className="lisitem.content.images[0].urlt-group-item" key={index}>
                                                <a href="#" onClick={() => { window.imBack({ text: JSON.stringify(this.state) ,  payload: { showTitle: true, title: button.value } }) }} >
                                                    {button.value}
                                                </a>
                                            </li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
