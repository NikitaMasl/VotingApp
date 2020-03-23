import React, { Component } from 'react';

class Option extends Component {
    constructor(props){
        super(props)
        this.confirmeOption = this.confirmeOption.bind(this);
        this.state={
            num: this.props.numberOfVoits,
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
            e.preventDefault();
            this.props.setOption(this.state.optionValue)
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
                    className="form-control form-control-sm mt-2" 
                    placeholder="Enter your option and press 'Enter'" 
                    disabled={this.state.isOptionCreated}
                />
            </div>
        )
    }
}

export default Option;