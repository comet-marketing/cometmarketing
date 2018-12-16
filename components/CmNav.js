import React from 'react';
import Head from 'next/head';
import 'bootstrap/scss/bootstrap.scss';
import '../scss/main.scss';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink, } from 'reactstrap';

export default class CmNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Navbar color="trasparent" fixed="top" light expand="md" className='cmnav'>
        <Head>
          <title>{this.props.title}</title>
        </Head>
        <Container>
          <NavbarBrand href="/index">Comet Marketing</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
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
                <NavLink href="#">Join Us</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}