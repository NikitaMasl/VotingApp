import React, { Component } from 'react'
import { connect } from 'react-redux';
import { X } from 'react-bootstrap-icons';
import Voting from './Voting';
import Portal from '../portal/Portal';
import Constructor from './Constructor';    

class App extends Component {
  constructor(props){
    super(props);
    this.openLogin = this.openLogin.bind(this);
    this.state={
      isLogInOpen: false,
      isUserAuthor: true,
      isConstructorOpen: false
    }
  }

  openLogin = () => {
    this.setState({
      isLogInOpen: true
  })
  }

  closeLogin = () => {
    this.setState({
      isLogInOpen: false
  })
  }
  getUserInfo = (e) =>{
    e.preventDefault();
    let user = {
        username: "Bob",
        password: 11111
      }
      fetch('https://maksimuk.xyz/registration', {
        method: 'POST',
        body: JSON.stringify(user),
        mode: 'no-cors'
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
}
  openConstructor = () =>{
    this.setState({
      isConstructorOpen: true
  })
  }
  closeConstructor = () =>{
    this.setState({
      isConstructorOpen: false
  })
  }
  preventEnter = (e) =>{
    if(e.key === 'Enter'){
    e.preventDefault();
  }
  }
  render() {
    return (
        <div>     
          <div className='card mainCard'>
            <div className="card-body">
                  <h5 className="card-title">Voting about something</h5>
                  {
                    this.state.isUserAuthor ? (
                      <button type="button" className="btn btn-info" onClick={this.openConstructor}>Create new voting</button>
                    ) : <button type="button" className="btn btn-info" onClick={this.openLogin}>Log in</button>
                  }
            </div>
          </div>
            {
            this.state.isLogInOpen ? (
              <div>
                <Portal>
                  <div className='overlay'>
                      <div className='logIn card'>
                      <button className="btn btn-outline-dark btnMenu"><X size={30} onClick={this.closeLogin}/></button>
                          <form onSubmit={this.preventEnter}>
                              <div className="form-group">
                                  <label>Username</label>
                                  <input className="form-control preventEnter" onKeyDown={this.preventEnter}/>
                              </div>
                              <div className="form-group">
                                  <label>Password</label>
                                  <input type="password" className="form-control" id="exampleInputPassword1" onKeyDown={this.preventEnter}/>
                              </div>
                              <button type="submit" className="btn btn-primary" onClick={this.getUserInfo}>Log in</button>
                          </form>
                      </div>
                  </div>
                </Portal>
              </div>
            ) : null
            }
             {
            this.state.isConstructorOpen ? (
              <div>
                <Portal>
                  <div className='overlay'>
                    <div className='logIn card'>
                      <button className="btn btn-outline-dark btnMenu"><X size={30} onClick={this.closeConstructor}/></button>
                      <Constructor onKeyDown={this.preventEnter} closeConstructor={this.closeConstructor}/>
                    </div>
                  </div>
                </Portal>
              </div>
            ) : null
            }
          <div>
          {this.state.isUserAuthor
            ?
              this.props.votings.map((vote, index) =>(
                <Voting key={index} id={vote.id} description={vote.description} options={vote.options} />
              ))
            :
            <div className='card votingBody'>
              <div className="card-body">
                <h5 className="card-title">Log in to see all voting</h5>
              </div>
            </div>
            }
          </div>
      </div>
    )
  }
  
}
const mapStateProps = (state) => {
  return {
      votings: state.votings
  };
};
export default connect(mapStateProps)(App)  