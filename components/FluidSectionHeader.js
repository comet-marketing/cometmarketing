import React, { Component } from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap';

export default class FluidSectionHeader extends Component {
  render() {
    var string = ''
    this.props.banner ? string = 'linear-gradient(to right, rgba(253, 153, 23, 0.5), rgba(29,178,75, 0.4)), url(' + this.props.banner + ')' : 'url("../static/banner.jpg")'
    var divStyle = {backgroundImage: string};
    var classstring = 'fluid-section-header'
    if(this.props.className){classstring = this.props.className}

    return (
      <Container fluid style={divStyle} className={classstring}>
        <Container>
          <Row className=''>
            <Col sm='6'>
              <h2 className='display-4'>{this.props.text}</h2>
            </Col>
          </Row>
        </Container>
      </Container>
    )
  }
}