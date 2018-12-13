import React, { Component } from 'react';
import CmNav from './CmNav';

export default class Layout extends Component {
  render() {
    return(
      <div>
        <CmNav title={this.props.title}></CmNav>
        {this.props.children}
      </div>
    )
  }
}