import React, { Component } from 'react';
import Link from 'next/link';

export default class DynamicLink extends Component {
  render() {
    return(
      <Link as={`/${this.props.displayRoute}/${this.props.slug}`} href={`/${this.props.actualRoute}?slug=${this.props.slug}`}>
        <a>{this.props.children}</a>
      </Link>
    )
  }
}