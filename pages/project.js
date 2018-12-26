import React, { Component } from 'react';
import { withRouter } from 'next/router'
import Layout from '../components/Layout';
import fetch from 'node-fetch';
import {
  Container,
  Row,
  Col
} from 'reactstrap';

class Project extends Component {
  static async getInitialProps({query}) {
    const res = await fetch(`http://localhost:1337/projects/${query.slug}`)
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

export default withRouter(Project);