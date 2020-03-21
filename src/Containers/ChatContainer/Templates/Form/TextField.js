import React from "react"
import '../../css/style.css'
class TextField extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => this.props.handleFormValues(this.state))
    }

    formSubmit = (event) => {
        if (event.key === "Enter") {
            this.props.formSubmit(event)
        }
    }

    componentWillMount() {
        let formItems = this.props.props
        formItems.map((item, index) => (
            this.setState({ [item.value]: '' })
        ))
    }


    render() {
        let formItems = this.props.props
        return (
            <div>
                {
                    <div className="form-fields">
                        {
                            formItems.map((item, index) => {
                                if (item.type === 'textarea') {
                                    return (
                                        <div className="form-group" key={index}>
                                            <label>{item.title}</label>
                                            <textarea className="form-control" name={item.value} value={this.state[item.value]} key={index} onChange={this.handleChange}  ></textarea>
                                        </div>
                                    )
                                }
                                return (
                                    <div className="form-group" key={index}>
                                        <label>{item.title}</label>
                                        <input type={item.type} name={item.value} value={this.state[item.value]} className="form-control" key={index} onChange={this.handleChange}
                                            onKeyPress={(e) => { this.formSubmit(e) }}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        )
    }
}

export default TextField
