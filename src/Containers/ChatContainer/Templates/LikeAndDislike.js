import React, { Component } from "react";
import axios from "axios";

class LikeAndDislike extends Component {
  constructor(props) {
    super();
    this.state = {
      thumbUpBG: "",
      thumbDownBG: ""
    };
  }

  handleThumsup = event => {
    this.setState({
      thumbUpBG: "green",
      thumbDownBG: ""
    });
    let items = this.props.props.content.items;
    items[0].flag = "like";
    let feedback = {
      userId: sessionStorage.getItem("userId"),
      data: items
    };
    this.apiCall(feedback);
  };
  handleThumsDown = event => {
    this.setState({
      thumbDownBG: "red",
      thumbUpBG: ""
    });
    let items = this.props.props.content.items;
    items[0].flag = "dislike";
    let feedback = {
      userId: sessionStorage.getItem("userId"),
      data: items
    };
    this.apiCall(feedback);
  };

  apiCall = feedback => {
    try {
      let config = {
        method: "post",
        url: "http://localhost:5000/v1/chatbot/nayara/userfeedback",
        data: feedback
      };
      axios(config);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let items = this.props.props.content.items[0];
    return (
      <div className="row text-left no_margin component_box">
        <div className="col-xs-1 align-top no_padding">
          <img
            src={require("../images/bot_logo.png")}
            alt="Bot Image"
            className="bot_img"
          />
        </div>
        <div className="col-xs-10 align-top no_padding bot_chat">
          <div className="bubble card">
            <p>{items.answer}</p>
          </div>
          <section className="rating-area align-center">
            <div className="thumbs-up-circle align-center transition-fast">
              <span className="thumbs-up transition-fast">
                <i
                  className="icon fa fa-thumbs-up thumb"
                  onClick={this.handleThumsup}
                  style={{ color: this.state.thumbUpBG }}
                />
              </span>
            </div>
            <div className="thumbs-up-circle align-center transition-fast">
              <span className="thumbs-down transition-fast">
                <i
                  className="icon fa fa-thumbs-down thumb"
                  onClick={this.handleThumsDown}
                  style={{ color: this.state.thumbDownBG }}
                />
              </span>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default LikeAndDislike;
