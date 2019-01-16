import React, { Component } from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap';

export default class FluidSectionHeader extends Component {
  constructor(props) {
    super(props);
    this.rootClassNames = this.rootClassNames.bind(this)
  }

  rootClassNames() {
    let names;
    if (!!this.props.className) {
      names = this.props.className.split(' ');
    }
    else {
      names = []
    }
    names.push('fluid-section-header');
    return names.join(' ');
  }

  render() {
    let string = '';
    this.props.backgroundImage ? string = 'url(' + this.props.backgroundImage + ')' : 'url(static/banner.jpg)';
    let divStyle = { backgroundImage: string };

    return (
      <Container fluid className={this.rootClassNames()} style={divStyle}>
        <Container>
          <Row className=''>
            <Col md='6'>
              <h2 className='display-4'>{this.props.text}</h2>
            </Col>
          </Row>
        </Container>
      </Container>
    )
  }
}