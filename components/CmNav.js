import React from 'react';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink, 
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle, } from 'reactstrap';

export default class CmNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      dropDownOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      dropDownOpen: !this.state.dropDownOpen,
    });
  }

  render() {
    return (
      <div className='cmnav-container'>
        <Navbar light expand="md" className='cmnav'>
          <Container>
            <NavbarBrand href="/index">Comet Marketing</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/people">People</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    About
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem href="/about">Our Mission</DropdownItem>
                    <DropdownItem href="/contact">Contact Us</DropdownItem>
                    <DropdownItem href="https://goo.gl/forms/vCYE7wFGCeralb9B3" target="_blank">Join Us</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <NavLink href="https://goo.gl/forms/vCYE7wFGCeralb9B3" target="_blank">Join Us</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}