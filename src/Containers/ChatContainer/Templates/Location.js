import React, { Component } from 'react'
import axios from 'axios'
import '../css/style.css'

export default class Location extends Component {
  constructor(props){
    super(props);
    this.state={
        classroomId:'',
        Data:[]
    }
    this.count=0;
  }

// handleClassChange=(e)=>{
//     this.setState({ classroomId: e.target.value });
// }


// componentDidMount(){
//     axios({
//         url: `http://172.25.131.168:80/v1/chatbot/attendance/UserClassList`,
//         method: 'GET',
//     }).then((response) => {
//         response.data.data.unshift({"Id": "0","Session_Name": "N/A"});
//         this.setState({Data:response.data});
//     })
// }



fetchLocation=() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
        //console.log(this.count,"fetchloc")       
    } else {
        //alert("Geolocation is not supported by this browser")
        window.imBack({ text: JSON.stringify({"status":"fail","message":"Attendance bot will not be worked in this browser"}),
        payload: { showTitle: true, title: "Location" } })
    }
}

showPosition=(position) => {
    setTimeout(()=>{
        if(this.count==6){
            //console.log(this.count,"showPosition")  
            this.count=0;
            //console.log(this.count,"showPosition")   
            //alert("lattitude : "+position.coords.latitude+" longitude : "+position.coords.longitude)
            this.fetchApiData(position.coords.latitude,position.coords.longitude)
        }
        else if(this.count<7){
            this.fetchLocation();
            //console.log(this.count,"showPosition")   
            this.count++;   
        }
    },200)

}

fetchApiData(userLatitude,userLongitude){
    let item= this.props.props.items[0];
    //console.log("+++++++++++ ",item)
    axios({
        url: `https://nayaracms.techforce.ai:3050/v1/chatbot/attendance/Locationbyid?id=${parseInt(item.id)}`,
        method: 'GET',
    }).then((response) => {
        var data=response.data.data[0]
        var startDate=new Date(data.startTime);
        var endDate=new Date(data.endTime);
        console.log(startDate)
        startDate.setHours(startDate.getHours()-5)
        startDate.setMinutes(startDate.getMinutes()-30)
        endDate.setHours(endDate.getHours()-5)
        endDate.setMinutes(endDate.getMinutes()-30)
        var currentDate = new Date();
        currentDate.setDate(1);
        currentDate.setFullYear(1970);
        currentDate.setMonth(0)
        if(((new Date(startDate).getTime())<(currentDate.getTime())) && 
           ((currentDate.getTime())<(new Date(endDate).getTime()))){
            if((Math.abs(data.Latitude-userLatitude)<0.005 && Math.abs(data.Longitude-userLongitude)<0.005)){
                window.imBack({ text: JSON.stringify({"status":"ok","message":"In Location","sessionId":item.id}),
                                payload: { showTitle: true, title: "Location" } })
                //alert("In location")
            }
            else{   
                window.imBack({ text: JSON.stringify({"status":"fail","message":"Out of Location"}),
                                payload: { showTitle: true, title: "Location" } })
                //alert("You are out of Classroom")
            }
           }
        else{
            window.imBack({ text: JSON.stringify({"status":"fail","message":"It is not a right time for class"}),
            payload: { showTitle: true, title: "Location" } })
            //alert("It is Not a right time for class")
        }


    }).catch((e)=>{
        window.imBack({ text: JSON.stringify({"status":"fail","message":"No session is going on with this id"}),
                              payload: { showTitle: true, title: "Location" } })
        //alert("No session found")
        console.log(e)
    });

}

  render(){
      console.log(JSON.stringify(this.props))
    return (
        
        <div class="row text-left no_margin component_box">
        {/* <div class="col-xs-1 align-top no_padding">
            <img src={require("../images/bot_logo.png")} alt="Bot Image" class="bot_img" />
        </div> */}
        <div class="col-xs-10 align-top no_padding bot_chat location-btn-msg">
            <div class="input card">
                <div className="inputcard-location">
                <ul class="list-group list-group-flush text-center">
                    {/* <li class="list-group-item">       
                        {
                            classData ? 
                        
                        <select id='color' className="location-dropdown" onChange={this.handleClassChange}>
                            {
                                classData.map((key, index) => {
                                    return(
                                        <option key = {index} value={key.Id} >{key.Session_Name}</option> 
                                    )
                                    
                                })
                            }
                            </select> : <div className="location-dropdown">No Classes found</div>
                        }
                    </li> */}
                    <li className="list-group-item location-list-btn">
                        <a href="#" onClick={() => { this.fetchLocation();}} >
                        <img src={require("../images/gps.png")} className="location-icon" alt="Attach" />Share Location
                        </a>
                    </li>
                </ul>
                </div>
            </div>
        </div>
        </div>
      );
  }
}
