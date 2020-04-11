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
                <NavItem>
                  <NavLink href="/portfolio">Portfolio</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/about">About</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/contact">Contact Us</NavLink>
                </NavItem>
                {/*<NavItem>
                  <NavLink href="https://forms.gle/UGgvqdmeTVcHtpMd6" target="_blank">Join Us</NavLink>
                </NavItem>*/}
                <NavItem>
                  <NavLink className='icon-wrapper' href='https://facebook.com/utdcometmarketing/' target="_blank">
                  <svg className='fb-icon' xmlns="http://www.w3.org/2000/svg" height='20' viewBox="0 0 448 512"><path d="M448 80v352c0 26.5-21.5 48-48 48h-85.3V302.8h60.6l8.7-67.6h-69.3V192c0-19.6 5.4-32.9 33.5-32.9H384V98.7c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9H184v67.6h60.9V480H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48z"/></svg>                 
                  </NavLink>
                  </NavItem>
                <NavItem>
                  <NavLink className='icon-wrapper' href='https://instagram.com/utdcometmarketing/' target="_blank">
                  <svg className='insta-icon' xmlns="http://www.w3.org/2000/svg" height='20' viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                  </NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink className='icon-wrapper' href='https://www.youtube.com/channel/UCr0ZmhNICA5pJsp4tq1d3rg?app=desktop' target='_blank'>
                  <svg className='youtube-icon' xmlns="http://www.w3.org/2000/svg" height= '20' viewBox="0 0 576 512"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/></svg>
                  </NavLink>
                </NavItem> 
                <NavItem>
                  <NavLink className='icon-wrapper' href='https://twitter.com/UTDallasCM' target='_blank'>
                  <svg className='twitter-icon' xmlns="http://www.w3.org/2000/svg" height= '20' viewBox="328 355 335 276"><path d="
                    M 630, 425
                    A 195, 195 0 0 1 331, 600
                    A 142, 142 0 0 0 428, 570
                    A  70,  70 0 0 1 370, 523
                    A  70,  70 0 0 0 401, 521
                    A  70,  70 0 0 1 344, 455
                    A  70,  70 0 0 0 372, 460
                    A  70,  70 0 0 1 354, 370
                    A 195, 195 0 0 0 495, 442
                    A  67,  67 0 0 1 611, 380
                    A 117, 117 0 0 0 654, 363
                    A  65,  65 0 0 1 623, 401
                    A 117, 117 0 0 0 662, 390
                    A  65,  65 0 0 1 630, 425
                    Z"/></svg>
                  </NavLink>
                </NavItem> */}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}