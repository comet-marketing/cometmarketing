import React, {Component} from  'react';
import Layout from '../components/Layout';
import fetch from 'node-fetch';
import DynamicLink from '../components/DynamicLink';
import {
  Container, 
  Row
} from 'reactstrap';

export default class Portfolio extends Component {
  static async getInitialProps() {
    const res = await fetch('http://localhost:1337/projects')
    const projects = await res.json()

    return { projects }
  }

  render() {
    return(
      <Layout pageName='Projects' title='Projects'>
        <Container>
          <Row>
            {this.props.projects.map((project) =>(
              <DynamicLink displayRoute='portfolio' actualRoute='project' slug={project.slug} >
                <h1>{project.title}</h1>
              </DynamicLink>
            ))}
          </Row>
        </Container>
      </Layout>
    )
  }
}