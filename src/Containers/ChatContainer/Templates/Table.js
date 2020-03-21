import React, { Component } from "react";

class Table extends Component {
  constructor(props) {
    super();
  }

  renderTableHeader(items) {
    let header = Object.keys(items.variable[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  renderTableData(items) {
    let keys = Object.keys(items.variable[0]);
    return items.variable.map((row, index) => {
      return (
        <tr key={index}>
          <RenderRow key={index} data={row} keys={keys} />
        </tr>
      );
    });
  }
  render() {
       let items = this.props.props.items[0];
	
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
            <p id="title">{items.title}</p>
            <table className="tabledata">
              <tbody>
                <tr>{this.renderTableHeader(items)}</tr>
                {this.renderTableData(items)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const RenderRow = props => {    
  return props.keys.map((key, index) => {
    return <td key={props.data[key]}>{props.data[key]}</td>;
  });
};

export default Table;
