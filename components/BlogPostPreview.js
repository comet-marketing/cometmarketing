import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import DynamicLink from "../components/DynamicLink";
import {
  Col
} from 'reactstrap';

export default class BlogPostPreview extends Component {
  render() {
    return(
      <Col sm='8' className='blog-post-preview'>
        <DynamicLink slug={this.props.slug} route='posts'>
          <h2 className='display-4'>{this.props.title}</h2>
        </DynamicLink>
        <p className='post-listing-data'>Updated at: {this.props.updatedAt}</p>
        <div className='post-listing-preview'>
          <ReactMarkdown source={this.props.body.substring(0, 150) + '...'}></ReactMarkdown>
        </div>
      </Col>
    );
  }
}