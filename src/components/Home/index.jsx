import React, { Component } from "react";
import Login from "../Login/Login";
import {connect} from 'react-redux';
import { Row, Col } from "react-bootstrap";
import './Home.css';
import Dropped from '../Dropped/index'; 
class Home extends Component {
  constructor(props){
    super(props); 
    this.state = {
      token: this.props.token
    }
    this.login = this.login.bind(this); 
  }
  componentDidUpdate(prevProps){
    if (this.props.token != prevProps.token){
      this.setState({token: this.props.token}); 
    }
  }
  login(){
    return (<main id="mainContent" >
      <div className="home">
        <Row>
          <Col>
            <h1 className="large-text">
              <b>Instant</b> File Transfer for <b>All</b> your <b>Devices</b>
            </h1>
          </Col>
          <Col>  
            <div className="right-panel">
              <h2 className="medium-text">
                Login
              </h2>
              <Login/>
            </div>
          </Col>
        </Row>
      </div>
    </main>);
  }
  render(){
    return (this.state.token === '') ? this.login() : <Dropped/>; 
  }
}
const mapStateToProps = state => ({
  token: state.auth,
})
export default connect(mapStateToProps)(Home);