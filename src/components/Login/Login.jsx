import React from 'react'; 
import {Form, Button, Row} from 'react-bootstrap'; 
import './Login.css'; 
import {signIn, signUp } from '../../redux/actions';
import { connect } from 'react-redux';
import { throwStatement } from '@babel/types';

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            signUp : true,
            token: this.props.token, 
            incorrectRewrite: false,
            email: "", 
            password: "", 
            passwordRewrite: "", 
        };     
        this.handleOnSignIn = this.handleOnSignIn.bind(this); 
        this.handleOnSignUp = this.handleOnSignUp.bind(this); 

        this.handleEmailChange = this.handleEmailChange.bind(this); 
        this.handlePasswordChange = this.handlePasswordChange.bind(this); 
        this.handlePasswordRewriteChange = this.handlePasswordRewriteChange.bind(this);
    }
    componentDidUpdate(prevProps){
        if (this.props.token != prevProps.token){
            this.setState({token: this.props.token}); 
        }
    }
    handleOnSignIn(){
        if (this.state.signUp){
            this.setState({signUp: false}); 
        }
        else{
            console.log(this.state.email);
            this.props.signIn(this.state.email, this.state.password);
        }
    }
    handleOnSignUp(){
        if (!this.state.signUp){
            this.setState({signUp:true}); 
        }
        else if (this.state.password != this.state.passwordRewrite){
            this.setState({
                incorrectRewrite: true,
            });
        }
        else{
            console.log(this.state.email)
            this.props.signUp(this.state.email, this.state.password);
        }
    }
    handleEmailChange(event){
        this.setState({email: event.target.value}); 
    }
    handlePasswordChange(event){
        this.setState({password: event.target.value}); 
    }
    handlePasswordRewriteChange(event){
        this.setState({passwordRewrite: event.target.value});
    }
    render(){
        return <Form className="Login" >
            <Form.Group>
                <Form.Label className="text-light">
                    E-Mail Address
                </Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmailChange}/>
            </Form.Group>
            <Form.Group>
                <Form.Label className="text-light">
                    Password
                </Form.Label>
                <Form.Control type="password" placeholder="Enter Password" onChange={this.handlePasswordChange}/>
            </Form.Group>
            <Form.Group className={this.state.signUp? "field":"optional-field"}>
                <Form.Label className="text-light">
                    Re-Enter Password
                </Form.Label>
                <Form.Control type = "password" placeholder = "Re-Enter Password" onChange={this.handlePasswordRewriteChange}/>
                <Form.Label className="text-light">
                    {(this.state.incorrectRewrite) ? "Passwords do not match." : ""}
                </Form.Label>
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

const mapDispatchToProps = dispatch =>{
    return{
        signIn: (email, password) => dispatch(signIn(email, password)), 
        signUp: (email, password) => dispatch(signUp(email, password)) 
    }
}
const mapStateToProps = state => ({
    token: state.auth
})
const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login); 
export default LoginContainer; 