import React, {Component} from  'react';
import Layout from '../components/Layout';
import fetch from 'node-fetch';
import DynamicLink from '../components/DynamicLink';
import {
  Container, 
  Row,
  Col
} from 'reactstrap';

export default class Portfolio extends Component {
  static async getInitialProps() {
    const res = await fetch('https://utdcometmarketing-api.herokuapp.com/projects')
    const projects = await res.json()

    return { projects }
  }

  render() {
    return(
      <Layout pageName='Portfolio' title='Portfolio'>
        <Container>
            {this.props.projects.length > 0 && this.props.projects.map((project) =>(
              <Row>
                <Col>
                  <DynamicLink displayRoute='portfolio' actualRoute='project' slug={project.slug} >
                    <h1>{project.title}</h1>
                  </DynamicLink>
                </Col>
              </Row>
            ))}
        </Container>
      </Layout>
    )
  }
}