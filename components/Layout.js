import React, { Component } from 'react';
import CmNav from './CmNav';
import Header from "./Header";

export default class Layout extends Component {
  render() {
    return(
      <div>
        <CmNav title={this.props.title}></CmNav>
        <Header pageName={this.props.pageName} intro={this.props.intro}></Header>
        {this.props.children}
      </div>
    )
  }
}