import React, { Component } from 'react';
import { withRouter } from 'next/router'
import Layout from '../components/Layout';
import fetch from 'node-fetch';
import ReactMarkdown from 'react-markdown';

class Post extends Component {
  static async getInitialProps({ query }) {
    const res = await fetch(`http://localhost:1337/posts/${query.slug}`)
    const data = await res.json()

    return {
      post: data
    }
  }
  render() {
    return (
      <Layout >
        <h1>{this.props.post.title}</h1>
        <ReactMarkdown source={this.props.post.body}></ReactMarkdown>
      </Layout>
    )
  }
}

export default withRouter(Post);