import React from 'react';
import Head from 'next/head';

import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink, 
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle, } from 'reactstrap';

export default class CmNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.navbar = React.createRef();
    this.state = {
      isOpen: false,
      bg: "nav-transparent",
      dropDownOpen: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    let supportPageOffset = window.pageXOffset !== undefined;
    let isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
    let scroll = {
      x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
      y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
    };

    if (scroll.y > 50) {
      this.setState({
        bg: 'nav-solid'
      })
    } else {
      this.setState({
        bg: 'nav-transparent'
      })
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      dropDownOpen: !this.state.dropDownOpen,
    });
  }
  render() {
    return (
      <div ref={this.navbar} className={this.state.bg}>
        <Navbar fixed="top" light expand="md" className='cmnav'>
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
                  <ButtonDropdown isOpen={this.state.dropDownOpen} toggle={this.toggle}>
                    <DropdownToggle caret color="nav-transparent">About</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem href="/about">About Us</DropdownItem>
                      <DropdownItem>Projects</DropdownItem>
                      <DropdownItem></DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
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
      </div>
    );
  }
}