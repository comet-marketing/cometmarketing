import React, { Component } from 'react';
import {Button} from 'reactstrap';

export default class CallToAction extends Component {
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
    names.push('btn-call-to-action');
    if (this.props.dark) names.push('btn-call-to-action-dark');
    return names.join(' ');
  }

  render() {
    if (this.props.href) {
      return(
        <a id={this.props.id} className={this.rootClassNames()} href={this.props.href} target={this.props.target}>{this.props.children}</a>
      )
    }
    return(
      <Button id={this.props.id} className={this.rootClassNames()}>{this.props.children}</Button>
    )
  }
}