import React from 'react'; 
import {Form, Button, Row} from 'react-bootstrap'; 

import './Login.css'; 

export default function Login(){
    return <Form className="Login">
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
        <Row className="ml-1">
            <Button variant="primary" type="submit">
                Sign In
            </Button>
            <Button className="ml-3" variant="secondary" type="submit">
                Sign Up
            </Button>
        </Row>
    </Form>
}