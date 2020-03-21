import React from "react"

class CheckBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    handleClick = (event) => {
        this.setState({
            checkboxValue: true,
            isChecked: !this.state.isChecked,
            [event.target.name]: event.target.checked
        }, () => this.props.handleFormValues(this.state))

    }

    OntextChange=(event)=>{
     this.setState({
         [event.target.name]: event.target.value
     })
   }
    componentWillMount() {
        this.setState({
            isChecked: false
        })
    }

    render() {
        let checkItems = this.props.props[0]
        let values = checkItems.value
        let title = checkItems.title

        return (
            <div className="form-fields">
                <div>
                    <label>{title}</label>
                    {
                        values.map((item, index) => {
                            return (
                                <div className="form-group" key={index}>
                                        <input type="checkbox" name={item.value} checked={this.isChecked} onChange={this.handleClick} />
                                        {item.title}<br />
					{ this.state[item.value] ? <input type="text" name={item.value+"_text"}  onChange={(e) => this.OntextChange(e)}/> : null }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
export default CheckBox
