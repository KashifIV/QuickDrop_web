import React from 'react'; 
import {Form, Button, Row} from 'react-bootstrap'; 
import './Login.css'; 
import {signIn, signUp } from '../../redux/actions';

export default class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            signUp : true
        };     
        this.handleOnSignIn = this.handleOnSignIn.bind(this); 
        this.handleOnSignUp = this.handleOnSignUp.bind(this); 
    }
    handleOnSignIn(){
        if (this.state.signUp){
            this.setState({signUp: false}); 
        }
        else{
            this.props.dispatch(signIn('kappa', '123'));
        }
    }
    handleOnSignUp(){
        if (!this.state.signUp){
            this.setState({signUp:true}); 
        }
        else{
            this.props.dispatch(signUp('kappa', '123'));
        }
    }
    render(){
        return <Form className="Login" >
            <Form.Group>
                <Form.Label className="text-light">
                    Email Address
                </Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group>
                <Form.Label className="text-light">
                    Password
                </Form.Label>
                <Form.Control type="password" placeholder="Enter Password"/>
            </Form.Group>
            <Form.Group className={this.state.signUp? "field":"optional-field"}>
                <Form.Label className="text-light">
                    Re-Enter Password
                </Form.Label>
                <Form.Control type = "password" placeholder = "Re-Enter Password"/>
            </Form.Group >
            <Row className="ml-1">
                <Button variant={this.state.signUp? "secondary":"primary"}  onClick = {this.handleOnSignIn} type="button">
                    Sign In
                </Button>
                <Button className="ml-3" variant={!this.state.signUp? "secondary":"primary"} onClick={this.handleOnSignUp}>
                    Sign Up
                </Button>
            </Row>
        </Form>
    }
}