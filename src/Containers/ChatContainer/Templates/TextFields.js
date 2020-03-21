import React from "react"
import './Form/css/style.css'
class TextFields extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    KeyEvents = (event) => {
        if (event.key === "Enter") {
            window.imBack({ text: JSON.stringify(this.state), payload: { showTitle: true, title: 'Details Submitted' } })
        }
    }

    componentWillMount() {
        let {content} = this.props.props
        content.items.map((item, index) => (
            this.setState({ [item.value]: '' })
        ))
    }

    render() {        
        let {content} = this.props.props        
        return (
            <div className="form">             
                    <div className="form-fields">
                        {
                            content.items.map((item, index) => {
                                if (item.type === 'textarea') {
                                    return(
                                     <div className="form-group" key={index}>
                                        <label>{item.title}</label>
                                        <textarea className="form-control" name={item.value} value={this.state[item.value]} key={index} onChange={this.handleChange} onKeyPress={(e)=>{this.KeyEvents(e)}} ></textarea>
                                    </div>
                                    )
                                     
                                }
                                return(
                                 <div className="form-group" key={index}>
                                    <label>{item.title}</label>
                                    <input type={item.type} name={item.value} value={this.state[item.value]} className="form-control" key={index} onChange={this.handleChange} onKeyPress={(e)=>{this.KeyEvents(e)}}
                                    />
                                </div>
                                )
                                  
                            })
                        }
                          {
                            content.buttons.map((button, index) => {
                                if (button.value) {
                                    return (
                                        <a className="button" key={index} href="#" onClick={() =>{window.imBack({ text: JSON.stringify(this.state), payload: { showTitle: true, title: 'Details Submitted' } })}}>
                                            {button.title}
                                        </a>
                                    )
                                }
                            })
                        }
                    </div>
            </div>
        )
    }
}

export default TextFields
