import React, { Component } from 'react';
import { withRouter } from 'next/router'
import Layout from '../components/Layout';
import fetch from 'node-fetch';
import ReactMarkdown from 'react-markdown';
import {
  Container,
  Row,
  Col
} from 'reactstrap';


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
      <Layout pageName={this.props.post.title} title={this.props.title}>
        <Container>
          <Row>
            <Col>
              <h1>{this.props.post.title}</h1>
            </Col>
          </Row>
          <Row className='justify-center'>
            <Col>
              <ReactMarkdown source={this.props.post.body}></ReactMarkdown>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}

export default withRouter(Post);