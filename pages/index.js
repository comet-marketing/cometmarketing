import Layout from "../components/Layout";
import { Component } from 'react';
import { Container } from 'reactstrap';

export default class Index extends Component {
  render() {
    return (
      <Layout title="Home" pageName='Comet Marketing'>
        <Container>
          <p>Welcome to Comet Marketing</p>
        </Container>
      </Layout>
    )
  }
}
