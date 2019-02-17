import React, { Component } from 'react';
import { withRouter } from 'next/router'
import Layout from '../components/Layout';
import fetch from 'node-fetch';
import {
  Container,
  Row,
  Col
} from 'reactstrap';

class Photoproject extends Component {
  static async getInitialProps({query}) {
    const res = await fetch(`https://utdcometmarketing-api.herokuapp.com/photoprojects/${query.slug}`)
    const data = await res.json()

    return {
      project: data
    }
  }

  render() {
    return(
      <Layout pageName={this.props.project.title} title={this.props.project.title}>
        <Container>
          <Row>
            <Col>
              <h1>{this.props.project.title}</h1>
            </Col>
          </Row>
        </Container>
      </Layout>
    )
  }
}

export default withRouter(Photoproject);