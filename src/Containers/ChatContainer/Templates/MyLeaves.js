import React from "react"
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Helmet from 'react-helmet';
import '../css/style.css'
import { Line, Circle } from 'rc-progress';
const percentage = 66;
const colors = ["purple","Aqua ","yellow","orange","blue","red"]
const lightColors = ["Thistle","PaleTurquoise","LemonChiffon","PeachPuff ","LightBlue"]
class MyLeaves extends React.Component{
  constructor(props){
    super(props)
    this.state={

    }

  }
  render(){
    let { props } = this.props
    return(
      <div className="row text-left no_margin component_box">
        <div className="col-xs-1 align-top no_padding">
          <img src={require("../images/bot_logo.png")} alt="Bot Image" className="bot_img" />
        </div>
        <div className="col-xs-10 align-top no_padding bot_chat">
          <div className="list-group-item" style={{textAlign: "center",boxShadow: "0 0 5px rgba(0,0,0,.15)",background: "#fff",borderRadius: "4px"}}>
            <CircularProgressbar
              percentage={props.PercentageLeaves}
              text={`${props.PercentageLeaves}%`}
            />
            <p style={{color: "black"}}>You have total {props.NoOfLeaves} leaves</p>
          </div>
          <ul style={{padding: 0, margin: "0" ,boxShadow: "0 0 5px rgba(0,0,0,.15)",background: "#fff"}}>
          <li className="list-group-item" style={{listStyle: "none",  height: 250, overflowY: "scroll"}}>
          {
            props.AllLeaves.map((a,i)=>{
              return(


                  <div key={i} className="meeting_box time_section" style={{display: "flex",borderBottom: "1px solid rgb(238, 238, 238)", justifyContent: "space-between"}}>

                    <p  className="leave-circle color_purple" style={{backgroundColor: `${lightColors[i]}`,color: `${colors[i]}`}}>a</p>
                    <p style={{color: "black"}}>{a.leaveType}</p>
                    <Line percent={a.leavePercentage} strokeWidth="8" strokeColor={colors[i]} />
                    <p style={{color: "black"}}>{a.leavesRatio}</p>
                  </div>


              )
            })
          }
        </li>
        </ul>
        <div className="select smiley text-right">
          <img src={require("../images/smiley_heart_eyes.png")} alt="Smiley" />
        </div>

        </div>

        <Helmet>
          <style>
            {`
              .smiley_heart_eyes{
                width: 20px;
                height: 20px;
                padding: 5px;
                background-color: #ffffff;
                border-radius: 100%;
              box-shadow: 0 5px 15px rgba(0,0,0,.15);
              -moz-box-shadow: 0 5px 15px rgba(0,0,0,.15);
              -webkit-box-shadow: 0 5px 15px rgba(0,0,0,.15);
              }
            .leave-circle{
              width: 25px;
            	height: 25px;

            	line-height: 25px;
            	text-align: center;
            	color: #666666;
            	font-size: 9px;
            	font-weight: bold;
            	border-radius: 100%;
            	background-color: rgba(102,102,102,0.1);
            }
            .CircularProgressbar{
              width: 35%!important;

            }
            .rc-progress-line{
              width: 40%;
              height: 2vh;
              margin-top: 1.2em;
              margin-bottom: 1em;
            }
            .CircularProgressbar .CircularProgressbar-path{
              stroke: #02ce9d;
            }
            .rc-progress-line-trail{
              stroke-width: 3;
            }
            .CircularProgressbar .CircularProgressbar-text{
              fill: #02ce9d;
            }
            .rc-progress-line-path{
              stroke-width: 4;
            }
            .CircularProgressbar .CircularProgressbar-trail{
              stroke: #efefef;
            }
            `}
          </style>
        </Helmet>

      </div>


    )
  }
}
export default MyLeaves
