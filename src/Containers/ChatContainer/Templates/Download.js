import React, { Component } from 'react'
import '../css/style.css'
import axios from 'axios'

export default class Download extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }

   onClick=()=>{
    this.setState({processClass:"loader"})
    let items= this.props.props;
    let URL;
    let fileName;
    if(items[0].title=="result"){
        URL = "https://nayaracms.techforce.ai:3050/v1/chatbot/nayara/survey?id="+items[0].id
        fileName = items[0].id+".xls"
        this.downloadDocument(items,URL,fileName)
    }
    else if(items[0].title=="docss"){
         this.getCMSData(items)
    }
    else if(items[0].title=="payslipdownload"){
	let selectDay = items[0].id.split('/');
	URL = `https://hrmobile.nayaraenergy.com/sap/opu/odata/SAP/ZHR_MOBILE_DETAILS_SRV/PayslipSet(Pernr='80172047',Date=datetime'${selectDay[2]}-${selectDay[0]}-${selectDay[1]}T00:00:00')/$value`;
	let headers = {
                       'Authorization': 'Basic cmF2aWthbnRoazpFc3NhckA5MDA=',
		       'Access-Control-Allow-Origin': '*',
			'method': 'HEAD',
			'mode': 'no-cors'        
	          }
	const myRequest = new Request(URL, headers);
	fetch(myRequest).then((response)=>{
		const url = window.URL.createObjectURL(new Blob([response.data]));
   		const link = document.createElement('a');
   		link.href = url;
   		link.setAttribute('download', 'payslip.pdf'); //or any other extension
   		document.body.appendChild(link);
   		link.click();
       		window.imBack({ text:  items[0].id, payload: { showTitle: true, title: "Successfully Dowloaded" } })
	}).catch((error)=>{
       		 window.imBack({ text:  items[0].id, payload: { showTitle: true, title: "Dowloaded Failed" } })
	})
	
   }
   else if(items[0].title=="attendanceDownload"){
	let selectDay = items[0].id.split(',');
	let endDate = selectDay[0].split('/') 
	let beginDate = selectDay[1].split('/') 
	
	URL = `https://hrmobile.nayaraenergy.com/sap/opu/odata/SAP/ZHR_MOBILE_DETAILS_SRV/AttendenceSet(Pernr='20001563',Begda=datetime'${beginDate[2]}-${beginDate[0]}-${beginDate[1]}T00:00:00',Endda=datetime'${endDate[2]}-${endDate[0]}-${endDate[1]}T00:00:00')/$value`
	
	let headers = {
                       'Authorization': 'Basic cmF2aWthbnRoazpFc3NhckA5MDA=',
		       'Access-Control-Allow-Origin': '*',
			'method': 'HEAD',
			'mode': 'no-cors'        
	          }
	const myRequest = new Request(URL, headers);
	fetch(myRequest).then((response)=>{
		console.log("response...", response)
		const url = window.URL.createObjectURL(new Blob([response.data]));
   		const link = document.createElement('a');
   		link.href = url;
   		link.setAttribute('download', 'attandance.pdf'); //or any other extension
   		document.body.appendChild(link);
   		link.click();
       		window.imBack({ text:  items[0].id, payload: { showTitle: true, title: "Successfully Dowloaded" } })
	}).catch((error)=>{
       		 window.imBack({ text:  items[0].id, payload: { showTitle: true, title: "Dowloaded Failed" } })
	})
   }
    else{
        console.log("in pdfs")
        URL = "https://nayaracms.techforce.ai:3050/v1/chatbot/download?id="+items[0].id
        fileName = items[0].id+".pdf"
        this.downloadDocument(items,URL,fileName)
    }
  }

  getCMSData = (items) => {
      console.log("getcmsData")
      let url=null,fileName=null
    axios({ 
        url: "https://nayaracms.techforce.ai:3050/docus?question_contains="+items[0].id,
        method: 'GET'})
    .then((res)=>{
        if(res.data.length!=0){
            url="https://nayaracms.techforce.ai:3050"+res.data[0].answer.url
console.log(url)
            fileName="document"+res.data[0].answer.ext
            this.downloadDocument(items,url,fileName)
        }
        else{
            this.setState({processClass:"sample"})
            window.imBack({ text:  items[0].id, payload: { showTitle: true, title: "Sorry, not able to understand" } })
        }

    })
  }

  downloadDocument(items,URL,fileName){
    axios({
        url: URL,
        method: 'GET',
        responseType: 'blob',
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        this.setState({processClass:"loader"})
        window.imBack({ text:  items[0].id, payload: { showTitle: true, title: "Successfully Dowloaded" } })
    });
}


  render(){
    let items= this.props.props;
   
      return (
        <div className="row text-left no_margin component_box">
						<div className="col-xs-1 align-top no_padding">
							<img src={require("../images/bot_logo.png")} alt="Bot Image" className="bot_img" />
						</div>

						<div className="col-xs-10 align-top no_padding bot_chat">
							<div className="input card">
								<ul className="list-group list-group-flush text-center">
                  <div className="row">
                      <div className="col-xs-6">
                          <li className="download-button filled list-group-item">
                              <a href="#" onClick={() => { this.onClick(); }} >
                                  Download
                              </a>
                          </li>
                      </div>
                      <div className="col-xs-6">
                          <li className="download-button filled list-group-item">
                              <a href="#" onClick={() => {window.imBack({ text:  items[0].id, payload: { showTitle: true, title: "Download is Cancelled " } }) }} >
                                  Cancel
                              </a>
                          </li>
                      </div>
                  </div>
          		</ul>
							</div>
						</div>
                     <div className={this.state.processClass}></div>
  		  </div>
      );
  }
}