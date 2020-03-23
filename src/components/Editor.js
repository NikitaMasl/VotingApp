import React, { Component } from 'react';
import OptionForEditor from './OptionForEditor'
import { connect } from 'react-redux';
import { changeVoting }from '../store/action';
import { bindActionCreators } from 'redux';

class Editor extends Component {
    constructor(props){
        super(props);
        this.state={
            description:'',
            options:[],
        }
    }
    componentWillMount(){
        let { id } = this.props;
        this.props.votings.forEach( el => {
            if(el.id === id){                
                this.setState({
                    description:el.description,
                    options:el.options
                })
            }
        });
    }
    changeDescription = ({ target: {value}})=>{
        this.setState({
            description: value
        })
    }
    setOption = (value, num) =>{
        let changedOptions = this.state.options;
        changedOptions[num]=value;
        this.setState({
            options: changedOptions
        })
    }
    change = (e) => {
        e.preventDefault();
        this.props.changeVoting(this.props.id, this.state.description, this.state.options);
        this.props.showEditor();
    }
    preventEnter = (e) =>{
        if(e.key === 'Enter'){
        e.preventDefault();
      }
      }
    render() {
        return (
            <div>
                <h1>Change this voting</h1>
                <form className=" mb-2">
                    <div className="form-group" id='optionDiv'>
                        <h3>Description</h3>
                        <input onChange={this.changeDescription} onKeyDown={this.preventEnter} className="form-control form-control-sm mt-2 preventEnter" id="description" type="text" placeholder={this.state.description} onKeyDown={this.props.onKeyDown}/>
                        <h3>Options</h3>
                        {
                            this.state.options.map((option, index) => (
                                <OptionForEditor key={index} value={option} id={this.props.id} num={index} setOption={this.setOption} />
                            ))
                        }
                        <button type="button" className="btn btn-primary mt-2 mr-2" onClick={()=>{
                            this.setState({options: [...this.state.options, ' ']})}
                            }>Add new option</button>
                        <button className="btn btn-primary mt-2" onClick={this.change}>Change voting</button>
                    </div>    
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
        changeVoting: bindActionCreators(changeVoting, dispatch),
    }
};

export default connect(mapStateProps, mapActionToProps)(Editor)
