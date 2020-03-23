import React, { Component } from 'react';

class OptionForEditor extends Component {
    constructor(props){
    super(props);
    this.state={
        optionValue: '',
        isOptionCreated: false
        }
    }
    changeOption = ({ target: {value}}) => {
        this.setState({
            optionValue: value
        })
    }
    confirmeOption = (e)=>{
        if(e.key === 'Enter'){
            this.props.setOption(this.state.optionValue, this.props.num)
            this.setState({
                isOptionCreated: true
            })
        }
    }
    render() {
        return (
            <div>
                <input 
                    onChange={this.changeOption} 
                    onKeyPress={this.confirmeOption} 
                    placeholder={this.props.value}
                    className="form-control form-control-sm mt-2" 
                    disabled={this.state.isOptionCreated}
                />
            </div>
        )
    }
}

export default OptionForEditor;

