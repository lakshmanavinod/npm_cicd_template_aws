import React, { Component } from 'react'
import '../css/style.css'

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state={
        userName:'',
        passWord:''
    }
  }

handleChange=(e)=>{
      this.setState({ passWord: e.target.value });
}
handleChange1=(e)=>{
      this.setState({ userName: e.target.value });
      sessionStorage.setItem('userId',e.target.value)
}

 componentDidMount(){
      if(this.props.isLast){
           document.getElementById('footer_Input').style.display = "none"
    }
   }


  render(){
    let items= this.props.props;

      return (
        <div class="row text-left no_margin component_box">
  							<div class="col-xs-1 align-top no_padding">
  								<img src={require("../images/bot_logo.png")} alt="Bot Image" class="bot_img" />
  							</div>
  							<div class="col-xs-10 align-top no_padding bot_chat">
  								<div class="input card">
  									<ul class="list-group list-group-flush text-center">
  										<li class="list-group-item">
                        <form action="#" method="post" class="form_box text-left">

                        {
                            items[0].content.items.map((item ,index)=>{
                              let pwd = item.title
                              let pwd1 = pwd.toLocaleLowerCase();
                              let resPwd1 = pwd1.includes('password');
                              if(resPwd1){
                                return(
                                  <div class="form-group">
                                    <label for="password">{pwd}</label>
                                    <input type="password" class="form-control" value={this.state.passWord} id="password" onChange={ this.handleChange } />
                                  </div>
                                )
                              }else{
                                return(
                                  <div class="form-group">
                                    <label for="username">{pwd}</label>
                                    <input type="text" class="form-control" id="username" value={this.state.userName} onChange={ this.handleChange1 } />
                                  </div>
                                )
                              }
                            })
                      }
                        </form>
  										</li>
  										<li class="list-group-item filled">
                          <a href="#" onClick={() => { document.getElementById('footer_Input').style.display = "block" ; window.imBack({ text: JSON.stringify(this.state), payload: { showTitle: true, title: items[0].content.buttons[0].value } }) }} >
                          {items[0].content.buttons[0].title}
                          </a>
                      </li>
  									</ul>
  								</div>
  							</div>
  						</div>
      );
  }
}
