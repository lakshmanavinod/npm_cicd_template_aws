import React, { Component } from 'react'
import '../css/style.css'
import axios from 'axios'

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {file : "" }
     }
handleChange = (e) =>{
  this.setState({file: e.target.files[0]})
}

storeFile = () => {
    let file1 = this.state.file
    console.log("file-----------",file1)
    let state = this.state
    let formData = new FormData()
        formData.append('files',file1)
	 let d =  this.getAsyncData(formData).then(function(res, state) {
                let url= res.data[0].url
console.log("file url---",url);
                if(url!=null){
                  let docName= url.split("/")
                  window.imBack({ text: ("/"+docName[docName.length-1]),payload: { showTitle: true, title: "file uploaded successfully" } })
                }
                else{
                  window.imBack({ text: url, payload: { showTitle: true, title: "file uploaded successfully" } })
                }
         })
  

     }

  getAsyncData = (formData)=>{
    return new Promise(function(resolve, reject){
         resolve(axios({
            method: 'post',
            url: 'https://digitalassistant.nayaraenergy.com/upload',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })     
             )
        })
    
}
  render(){
      console.log("render   000")
      return (
        <div className="row text-left no_margin component_box">
  							<div className="col-xs-1 align-top no_padding">
  								<img src={require("../images/bot_logo.png")} alt="Bot Image" className="bot_img" />
  							</div>
  							<div className="col-xs-10 align-top no_padding bot_chat">
  								<div className="input card">
  									<ul className="list-group list-group-flush text-center">
  										<li className="list-group-item">
                     								 <input type="file" name="file" id="uploadfile"   accept="*" onChange={this.handleChange} />
                      									{/*<input type="submit" />*/}
  										</li>
                      								<li className="list-group-item filled">
                        							  <a href="#" onClick={() => { this.storeFile() }} >
                        							    Submit
                        							  </a>
                     								 </li>
  									</ul>
  								</div>
  							</div>
  						</div>
      );
  }
}