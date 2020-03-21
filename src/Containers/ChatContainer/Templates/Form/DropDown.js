import React from "react"
import '../../css/style.css'
class DropDown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleClick = (event) => {  
        let title=document.getElementById(event.target.value).text     
        this.setState({
           // [event.target.name]: event.target.value
           dropdownValue: true,
           "value" : event.target.value,
           "title":title
        }, () => this.props.handleFormValues(this.state))

    }
    componentWillMount() {
        let dropItems = this.props.props[0]
        let values = dropItems.value
        let dropdownObj = values[0]
    }

    render() {
        let dropItems = this.props.props[0]
        let values = dropItems.value
        let title = dropItems.title
        let dropdownObj = values[0]
        
        return (
            <div className="form-fields">
                <div className="form-group">
                    <label>{title}</label>
                    <select className="form-control" name={Object.keys(dropdownObj)[1]}
                        value={this.state[Object.keys(dropdownObj)[1]]}
                        onChange={this.handleClick}>
                        <option value="default" >select</option>
                        {
                            values.map((item, index) => {                                                                
                                return (
                                    <option key={index} id={item.value} value={item.value} >{item.title}</option>
                                )
                            }
                            )
                        }
                    </select>
                </div>
            </div>

        )
    }
}

export default DropDown

