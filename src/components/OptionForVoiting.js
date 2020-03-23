import React, { Component } from 'react';
import { connect } from 'react-redux';

class OptionForVoiting extends Component {
    constructor(props){
        super(props)
        this.state={
            isVoted:false,
            votedForThisOption: false,
            optionValue:''
        }
    }
    componentWillReceiveProps(next){
        this.setState({
            isVoted:next.isVoted
        })
        if(!next.isVoted){
            this.setState({
                votedForThisOption:false
            })
        }
        if(next.option){
            this.setState({
                optionValue:next.option
            })
        }
    }
    componentWillMount(){
        let { id, num } = this.props;
        this.setState({
            optionValue: this.props.option
        })
        if(this.props.votedFor === num){
            this.setState({
                votedForThisOption:true
            })
        }
        this.props.votings.forEach(elem => {
            if(elem.id === id){
                if(elem.selectedOption === num){
                    this.setState({
                        votedForThisOption:true
                    })
                }else{
                    this.setState({
                        votedForThisOption:false
                    })
                }
                if(elem.hasOwnProperty('selectedOption')){
                    this.setState({
                        isVoted:true
                    })
                }else{
                    this.setState({
                        isVoted:false
                    })
                }
            }
        })
    }
    setNumber = ()=>{
        this.props.votingMaker(this.props.num)
        this.setState({
            votedForThisOption:true,
        })
    }
    render() {
        return (
            <div>
                <button type="button" 
                    className={
                        this.state.votedForThisOption
                        ?
                        "btn btn-success btn-sm btn-block mb-2"
                        :
                        "btn btn-outline-dark btn-sm btn-block mb-2"
                    }
                    disabled={this.state.isVoted}
                    onClick={this.setNumber}
                    >
                        {this.state.optionValue}
                </button>
            </div>
        )
    }
}

const mapStateProps = (state) => {
    return {
        votings: state.votings
    };
};

export default connect(mapStateProps)(OptionForVoiting);