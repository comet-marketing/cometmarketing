import React, { Component } from 'react';
import Link from 'next/link';

import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

export default class Footer extends Component {
  render() {
    return(
      <Container fluid className='footer'>
        <Container>
          <Row className='justify-content-center'>
            <Col>
              <h2>Comet Marketing</h2>
              <p>Coming soon.</p>
            </Col>
            <Col>
              <Nav>
                <NavItem>
                  <NavLink href="/people">People</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/about">About</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/blog">Blog</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://goo.gl/forms/vCYE7wFGCeralb9B3" target="_blank">Join Us</NavLink>
                </NavItem>
              </Nav>
              <hr></hr>
            </Col>
          </Row>
        </Container>
      </Container>
    )
  }
}