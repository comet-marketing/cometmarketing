import React, { Component } from 'react';
import {
  Container,
  Jumbotron
} from 'reactstrap';

export default class Header extends Component {
  render() {
    var string = ''
    this.props.banner ? string = 'url(' + this.props.banner + ')' : 'url(static/banner.jpg)'
    var divStyle = {backgroundImage: string}
    return (
      <Jumbotron className='page-header' style={divStyle} >
        <Container>
          <h1 className='display-2'>{this.props.pageName}</h1>
          {this.props.intro != undefined &&
            <h3>{this.props.intro}</h3>
          }
        </Container>
      </Jumbotron>
    )
  }
}