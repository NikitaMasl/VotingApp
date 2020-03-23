import React, { Component } from 'react';
import OptionForVoiting from './OptionForVoiting';
import Portal from '../portal/Portal';
import Editor from './Editor';
import { List } from 'react-bootstrap-icons';
import { X } from 'react-bootstrap-icons';
import { connect } from 'react-redux';
import { removeVoting, selectOption, reVote } from '../store/action';
import { bindActionCreators } from 'redux';

class votingBody extends Component {
    constructor(props){
        super(props);
        this.state={
            isVoted:false,
            isEditorOpen: false,
            isMenuOpen: false
        }
    }
    componentWillMount(){
        this.props.votings.forEach( el => {
            if(el.id === this.props.id){
                if(el.hasOwnProperty('selectedOption')){
                    this.setState({
                        isVoted: true
                    })
                }else{
                    this.setState({
                        isVoted: false
                    })
                }
            }
        });
    }
    votingMaker = (number)=>{
        let { id } =this.props;
        this.props.selectOption(id, number)
        this.setState({
            isVoted:true
        })
    }
    dropMenu = () =>{
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        })
    }
    showEditor = () =>{
        this.setState({
            isEditorOpen: !this.state.isEditorOpen
        })
    }
    remove = () =>{
        this.dropMenu();
        this.props.removeVoting(this.props.id);
    }
    render() {
        return (
            <div className='card votingBody'>
                <div>
                    <button className="btn btn-outline-dark btnMenu"><List size={30} onClick={this.dropMenu}/></button>
                </div>
                {this.state.isMenuOpen ? (
                        <div className="btn-group btn-group-lg dropMenu" role="group" aria-label="...">
                            <div className="btn-group-vertical" role="group" aria-label="First group">
                                <button type="button" className="btn btn-outline-dark" onClick={this.remove}>Remove</button>
                                <button type="button" className="btn btn-outline-dark" onClick={this.showEditor}>Edit</button>
                                <button type="button" className="btn btn-outline-dark" onClick={() => {
                                    this.dropMenu();
                                    this.props.reVote(this.props.id);
                                    this.setState({
                                        isVoted:false
                                    })
                                }}>Re-vote</button>
                            </div>
                        </div>
                      ) : null
                    }
                <div className="text-center">
                    <h2>{this.props.description}</h2>
                </div>
                {this.props.options.map((option, index) =>(
                    <OptionForVoiting key={index} num={index} id={this.props.id} option={option} isVoted={this.state.isVoted} votingMaker={this.votingMaker}/>
                ))}
                {
                    this.state.isEditorOpen
                    ?(
                    <div>   
                        <Portal>
                            <div className='overlay'>
                                <div className='logIn card'>
                                    <button className="btn btn-outline-dark btnMenu"><X size={30} onClick={this.showEditor}/></button>
                                    <Editor id={this.props.id} showEditor={this.showEditor}/>
                                </div>
                            </div>
                        </Portal>
                    </div>
                    ):null
                }
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
        removeVoting: bindActionCreators(removeVoting, dispatch),
        selectOption: bindActionCreators(selectOption, dispatch),
        reVote: bindActionCreators(reVote, dispatch)
    }
};

export default connect(mapStateProps, mapActionToProps)(votingBody)