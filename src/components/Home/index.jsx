import React from "react";
import Login from "../Login/Login";
import {connect} from 'react-redux';
import { Row, Col } from "react-bootstrap";
import './Home.css';
function Blank() {
  return <main id="mainContent" >
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
  </main>;
}
export default connect(null)(Blank);