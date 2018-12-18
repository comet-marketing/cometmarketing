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
  
    return { posts }
  }

  componentWillMount() {
    this.setState({
      posts: this.props.posts
    })
  }

  render() {
    return (
      <Layout title='blog' pageName='Blog'>
        <Container className='post-listings'>
          {this.props.posts.map((post) => (
            <>
              <Row className='post-listing'>
                <Col sm='8' className='post-listing-item'>
                  <h2 className='display-4'>{post.title}</h2>
                  <p className='post-listing-data'>Updated at: {post.updatedAt}</p>
                  <div className='post-listing-preview'>
                    <ReactMarkdown source={post.body.substring(0, 150) + '...'}></ReactMarkdown>
                  </div>
                </Col>
              </Row>
              <hr></hr>
            </>
          ))}
        </Container>
      </Layout>
    )
  }
}