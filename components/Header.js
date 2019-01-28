import React, { Component } from 'react';
import {
  Container,
  Jumbotron,
  Row,
  Col
} from 'reactstrap';
import CallToAction from './CallToAction';
import CmNav from './CmNav';

export default class Header extends Component {
  render() {
    var string = ''
    this.props.banner ? string = 'linear-gradient(to right, rgba(253, 153, 23, 0.5), rgba(29,178,75, 0.4)), url(' + this.props.banner + ')' : 'url(static/banner.jpg)'
    var divStyle = {backgroundImage: string}
    return (
      <Jumbotron className='page-header' style={divStyle} >
        <CmNav title={this.props.title}></CmNav>
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
                Here at Comet Marketing we help YOU market YOU! <br/>
                From photographing your biggest event of the semester to revamping your social media presence
                - we are here to make your UTD organization and events a success!
                </p>
                <CallToAction href='/contact' id='main-call-to-action'>Contact Us Now!</CallToAction>
              </Col>
            </Row>
          }
        </Container>
      </Jumbotron>
    )
  }
}