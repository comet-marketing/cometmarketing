import React, { Component } from 'react';
import Layout from '../components/Layout';
import fetch from "node-fetch";
import {
  Container,
  Row
} from 'reactstrap';
import BlogPostPreview from '../components/BlogPostPreview';

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
                <BlogPostPreview 
                  title={post.title} 
                  updatedAt={post.updatedAt} 
                  body={post.body}></BlogPostPreview>
              </Row>
            </>
          ))}
        </Container>
      </Layout>
    )
  }
}