import React, { Component } from 'react'
import Calendar from 'react-calendar';
import '../css/style.css'

export default class DatePicker extends Component {

  constructor(props) {
    super()
    let todaysDate=new Date();
    let today=(todaysDate.getMonth()+1)+"/"+todaysDate.getDate()+"/"+todaysDate.getFullYear()
    this.state = {
      date: new Date(),
      selectedDates: today
    }
  }

  submitDate = () =>{
    if(this.state.selectedDates){
      console.log("props",this.props);
      window.imBack({ text: this.state.selectedDates,payload: { showTitle: true, title: this.state.selectedDates }})
    }
    else{
      console.log(this.state.selectedDates);
    }

  }

  render() {
    return (
      <div className="row text-left no_margin component_box">
        <div className="col-xs-1 align-top no_padding">
          <img src={require("../images/bot_logo.png")} alt="Bot Image" className="bot_img" />
        </div>
        <div className="col-xs-10 align-top no_padding bot_chat">
          <div className="select card">

            <Calendar
              selectRange={false}
              onChange={(e) =>  {console.log(e);this.setState({ selectedDates: (e.getMonth()+1)+"/"+e.getDate()+"/"+e.getFullYear()})}}
              value={this.state.date}
            />
            {/* this.setState({ selectedDates: e }) */}
          </div>
          <div style={{ margin: "0px 5px 0px" }}>
            <button
              onClick={this.submitDate}
              style={{
                margin: "margin: 10px 5px 0px",
                width: "100%",
                backgroundColor: "#00adcc",
                color: "#FFFFFF",
                cursor: "pointer",
                padding: 10,
                border: "none",
                outline: "none",
                borderBottomLeftRadius: ".25rem",
                borderBottomRightRadius: ".25rem",
              }}
            >Submit</button>
          </div>

          {/* <div className="select smiley text-right">
            <img src={require("../images/smiley_heart_eyes.png")} alt="Smiley" />
          </div> */}
        </div>
      </div>
    )
  }
}






