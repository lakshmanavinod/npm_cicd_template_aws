import React from 'react'
import TextFieldWidget from "./TextField"
import DropDownWidget from "./DropDown"
import CheckBoxWidget from "./Checkbox"
import RadioWidget from "./RadioButton"

import './css/style.css'

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    handleFormValues = (data) => {
        this.setState({
            ...data
        })
    }
 componentDidMount(){
      if(this.props.isLast){
        document.getElementById('inputText').disabled = true
       //document.getElementById('cancel-dialog').style.display = "block"
    }
   }

    formSubmit = (event) => {
        let stateObject = this.state
        var checkForm = true
        Object.keys(stateObject).forEach(function (key) {
            if (key == 'isChecked') {
                delete stateObject[key];
            }
            if(key=="radioData"){
           // console.log(Object.keys(stateObject["radioData"]).length)
            if (Object.keys(stateObject["radioData"]).length===5) {
                console.log("in 1")
                checkForm = true
            }
            else{
                checkForm = false
            }
        }
        });
        for (const key in stateObject) {
            if(key=="radioData"){
            //    console.log(Object.keys(stateObject["radioData"]).length)
                if (Object.keys(stateObject["radioData"]).length===5) {
                    console.log("in 2")
                    checkForm = true
                }
                else{
                    checkForm = false
                }
            }

        }
        if (!checkForm) {
            alert("Please provide the details")
        } else {
            let finalObj = this.state
            Object.keys(finalObj).forEach(function (key) {
                if (key == 'dropdownValue' || key == 'checkboxValue' || key == 'radioValue') {
                    delete finalObj[key];
                }
            });
            window.imBack({ text: JSON.stringify(finalObj), payload: { showTitle: true, title: 'Details Submitted' } })
        }
    }

    componentWillMount() {
        let { content } = this.props.props[0]
        if (content.items.length) {
            content.items.map((item, index) => (
                this.setState({ [item.value]: '' })
            ))
        }
        if (content.facts.length) {
            content.facts.map((fact, index) => {
                if (fact.dropdown) {
                    if(fact.dropdown.title){
                      this.setState({ dropdownValue: false })
                    }
                }
                if (fact.checkbox) {
                    if(fact.checkbox.title){
                        this.setState({ checkboxValue: false })
                    }
                }
                if (fact.radio) {
                    if(fact.radio.title){
                        this.setState({ radioValue: false })
                    }
                }
            }

            )
        }
    }

    render() {
        let textfield, dropdownComponent, checkboxComponents, radioComponents = false
        let { content } = this.props.props[0]
        let dropdown = []
        let checkbox = []
        let radio = []
        let { facts } = this.props.props[0].content

        facts.map(fact => {
            if (fact.dropdown) {
                dropdown.push(fact.dropdown)
            }
            if (fact.checkbox) {
                checkbox.push(fact.checkbox)
            }
            if (fact.radio) {
                radio.push(fact.radio)
            }
        })

        if (content.items) {
            textfield = true
        }
        if (dropdown[0].title && dropdown[0].value) {
            dropdownComponent = true
        }
        if (checkbox[0].title && checkbox[0].value) {
            checkboxComponents = true
        }
        if (radio[0].title && radio[0].value) {
            radioComponents = true
        }
        return (
            <div className="form">
                {textfield ? <TextFieldWidget props={content.items} handleFormValues={data => this.handleFormValues(data)} formSubmit={e => this.formSubmit(e)} /> : null}
                {dropdownComponent ? <DropDownWidget props={dropdown} handleFormValues={data => this.handleFormValues(data)} /> : null}
                {checkboxComponents ? <CheckBoxWidget props={checkbox} handleFormValues={data => this.handleFormValues(data)} /> : null}
                {radioComponents ? <RadioWidget props={radio} handleFormValues={data => this.handleFormValues(data)} /> : null}
                {
                    content.buttons.map((button, index) => {
                        if (button.value) {
                            return (
                                <a className="button" key={index} href="#" onClick={(e) => { document.getElementById('inputText').disabled = false; this.formSubmit(e) }} >
                                    {button.title}
                                </a>
                            )
                        }
                    })
                }
            </div>
        )
    }
}
export default Form
