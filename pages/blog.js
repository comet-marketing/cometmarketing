import React, { Component } from 'react';
import Layout from '../components/Layout';
import fetch from "node-fetch";
import ReactMarkdown from 'react-markdown';
import {
  Container,
  Row,
  Col
} from 'reactstrap';

export default class Blog extends Component {
  static async getInitialProps() {
    const res = await fetch('http://localhost:1337/posts')
    const posts = await res.json()
    console.log(posts)
    return { posts }
  }

  componentWillMount() {
    this.setState({
      posts: this.props.posts
    })
  }

  render() {
    return (
      <Layout title='blog'>
        <Container>
          {this.props.posts.map((post) => (
            <Row className='post-listing'>
              <Col sm='8'>
                <h2>{post.title}</h2>
                <p>Updated at: {post.updatedAt}</p>
                <ReactMarkdown source={post.body}></ReactMarkdown>
              </Col>
            </Row>
          ))}
        </Container>
        
        <p>Blog</p>
      </Layout>
    )
  }
}