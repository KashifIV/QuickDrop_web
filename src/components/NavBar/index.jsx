import React from "react";
import { Link } from "react-router-dom";
import {Button} from 'react-bootstrap'; 
import {signOut} from '../../redux/actions';
import {connect} from 'react-redux';
import styles from "./navbar.module.css";

//TODO Web Template Studio: Add a new link in the NavBar for your page here.
// A skip link is included as an accessibility best practice. For more information visit https://www.w3.org/WAI/WCAG21/Techniques/general/G1.
class NavBar extends React.Component{
  constructor(props){
    super(props); 
    this.state = {token: this.props.token}; 
    this.signOutHandler = this.signOutHandler.bind(this); 
  }
   NavBarLinks(){
    return (
      <div className="navbar-nav">
      <Link className="nav-item nav-link active" to="Home">
        Home
      </Link>
      <Link className="nav-item nav-link active" to="Dropped">
        Dropped
      </Link>
      <Link className="nav-item nav-link active" to="Drop">
        Drop
      </Link>
    </div>
    );
  }
  componentDidUpdate(prevProps){
    if (this.props.token != prevProps.token){
      this.setState({token: this.props.token}); 
      
    }
  }
  signOutHandler(){
    if (this.state.token == ''){
      return (
        <div/>
      )
    }
    else {
      return(
        <Button onClick = {this.props.signOut}>
          Sign Out
        </Button>
      )
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className={styles.skipLink}>
          <a href="#mainContent">Skip to Main Content</a>
        </div>
        <nav className="navbar navbar-expand-lg navbar-dark">
          <Link className="navbar-brand" to="/">
            QuickDrop
          </Link>
          <this.signOutHandler/>
        </nav>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  token: state.auth
})
const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  }
}
const navContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar); 
export default navContainer; 