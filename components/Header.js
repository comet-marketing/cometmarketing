import React, { Component } from 'react';
import {
  Container,
  Jumbotron,
  Row,
  Col
} from 'reactstrap';

export default class Header extends Component {
  render() {
    var string = ''
    this.props.banner ? string = 'linear-gradient(to right, rgba(253, 153, 23, 0.5), rgba(29,178,75, 0.4)), url(' + this.props.banner + ')' : 'url(static/banner.jpg)'
    var divStyle = {backgroundImage: string}
    return (
      <Jumbotron className='page-header' style={divStyle} >
        <Container>
          <Row className='row-no-margin'>
            <Col>
              <h1 className='display-2'>{this.props.pageName}</h1>
              {this.props.intro != undefined &&
                <h3>{this.props.intro}</h3>
              }
            </Col>
          </Row>
          {this.props.isHome &&
            <Row className='row-no-margin'>
              <Col sm='6'>
                <p className='lead call-to-action-paragraph'>
                  Comet Marketing helps your organization market your events.
                  We will design your posters, create your videos, take your photos, and shoot your videos.
                  Have an event or program planned? Let us get the word out!
                </p>
                <a href='/contact' id='main-call-to-action' className='btn-call-to-action'>
                  Contact Us!
                </a>
              </Col>
            </Row>
          }
        </Container>
      </Jumbotron>
    )
  }
}