import React, { Component } from 'react';
import { withRouter } from 'next/router'
import Layout from '../components/Layout';
import fetch from 'node-fetch';
import {
  Container,
  Row,
  Col
} from 'reactstrap';


class Person extends Component {
  static async getInitialProps({query}) {
    const res = await fetch(`http://localhost:1337/members/${query.slug}`)
    const data = await res.json()

    return {
      person: data
    }
  }
  render() {
    return(
      <Layout pageName={this.props.person.name} title={this.props.person.name}>
        <Container>
          <Row>
            <Col sm="8">
              <p>{this.props.person.bio}</p>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}

export default withRouter(Person);