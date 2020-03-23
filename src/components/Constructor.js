import React, { Component } from 'react';
import Option from './Option';
import { connect } from 'react-redux';
import { addVoting } from '../store/action';
import { bindActionCreators } from 'redux';

class Constructor extends Component {
    constructor(props){
        super(props);
        this.changeDescription = this.changeDescription.bind(this);
        this.createNewVoit = this.createNewVoit.bind(this)
        this.setOption = this.setOption.bind(this)
        this.state = {
            numberOfVoits: this.props.votings.length,
            numberOfOptions:[0, 1],
            description: '',
            options:[]
        }
    }
    changeDescription = ({ target: {value}})=>{
        this.setState({
            description: value
        })
    }
    createNewVoit = (e) => {
        e.preventDefault();
        let { description } = this.state;
        if(description.length>3){
            this.props.addVoting( (new Date()).getTime(), description, this.state.options);
            this.props.closeConstructor();
        }else{
            document.getElementById('description').classList.add('is-invalid')
        }
    }
    setOption = (value) =>{
        this.setState({
            options: [...this.state.options, value]
        })
    }
    render() {
        return (
            <div>
                <h1>New voting</h1>
                <form className=" mb-2">
                    <div className="form-group" id='optionDiv'>
                        <input onChange={this.changeDescription} className="form-control form-control-sm mt-2 preventEnter" id="description" type="text" placeholder="Describe your vote" onKeyDown={this.props.onKeyDown}/>
                        {this.state.numberOfOptions.map(num=>(
                            <Option 
                                key = {num} 
                                number = {num}
                                setOption = {this.setOption}
                            />
                        ))}
                    </div>    
                    <button type="button" className="btn btn-primary mr-2" onClick={()=>{
                        this.setState({numberOfOptions: [...this.state.numberOfOptions, this.state.numberOfOptions.length]})}}>Add new option</button>
                        <button className="btn btn-primary mr-2" onClick={this.createNewVoit}>Create</button>
                </form>
            </div>
        )
    }
}

const mapStateProps = (state) => {
    return {
        votings: state.votings
    };
};

const mapActionToProps = (dispatch) => {
    return {
        addVoting: bindActionCreators(addVoting, dispatch)
    }
};

export default connect(mapStateProps, mapActionToProps)(Constructor)