import React from "react"
import '../../css/style.css'
class Radio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {radioData:{}}
    }


    handleClick = (item,option,event) => {
        let question=item.title;
       // this.getRemoveDuplicates(question);
        this.setState({
            radioData:{...this.state.radioData,[question]:option}
        }, () => this.props.handleFormValues(this.state))
        //
       //console.log(JSON.stringify(this.state))
    }
    
    // getRemoveDuplicates(questions){
    //     let stateData=this.state.radioData;
    //     let newData=this.state.radioData;
    //     stateData.map((item,index)=>{
    //         if(item.question){
    //             if(item.question==questions){
    //                 console.log("-----------------\n",questions)
    //                 newData.splice(index,index);
    //                 this.setState({radioData:newData})
    //             }
    //         }
    //     })
    // }


    componentWillMount() {
        let radioItems = this.props.props[0]
        let values = radioItems.value
        let o = values[0]
        this.setState({
            isChecked: false
        })
    }

    render() {
        let radioItems = this.props.props[0]
        let values = radioItems.value
        let title = radioItems.title
        let arr=[1,2,3,4,5]
        let k=""
        let o = values[0]

        return (
            <div>
                    <table>
                        <tr>
                            <td className="radio-wrap">

                            </td>
                            <td className="radio-wrap">
                                <div className="radio-options-align">
                                    {
                                        arr.map((value, index) => {
                                            return (
                                            <span className="radio-options">{value}</span>
                                            )
                                        })
                                    }
                                </div>
                            </td>
                        </tr>
                        {
                        values.map((item, index) => {
                            return (
                                <tr key={index} className="radio-tr">
                                            <td className="radio-wrap">
                                            <span className="radio-labels">
                                                {item[Object.keys(item)[0]]}
                                            </span>
                                            </td>
                                            <td className="radio-wrap">
                                            <form className="radio-btns">
                                            {
                                                arr.map((option,index1)=>{
                                                    if(index1=0){
                                                        return (
                                                            <input type="radio" className="radio-btn" name={Object.keys(o)[0]} value={item.value} checked={this.isChecked} onChange={(e)=>this.handleClick(item,option,e)} />
                                                            )    
                                                    }
                                                    else {
                                                        return(
                                                            <input type="radio" className="radio-btn" name={Object.keys(o)[0]} value={item.value} checked={this.isChecked} onChange={(e)=>this.handleClick(item,option,e)}  />
                                                        ) 
                                                    }
                                                })
                                            }
                                            </form>
                                            </td>

                                </tr>
                            )
                        })
                    }
                    </table>

                </div>
        )
    }
}

export default Radio

