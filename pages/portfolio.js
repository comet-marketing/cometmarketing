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
    const res = await fetch('https://utdcometmarketing-api.herokuapp.com/photoprojects')
    const photoprojects = await res.json()
    const res2 = await fetch('https://utdcometmarketing-api.herokuapp.com/videoprojects')
    const videoprojects = await res2.json()
    return { photoprojects, videoprojects }
  }

  render() {
    return(
      <Layout pageName='Portfolio' title='Portfolio'>
        <Container>
            {this.props.photoprojects.map((project) =>(
              <Row>
                <Col>
                  <DynamicLink displayRoute='photo-project' actualRoute='photoproject' slug={project.slug}>
                    <h1>{project.title}</h1>
                  </DynamicLink>
                </Col>
              </Row>
            ))}
            {this.props.videoprojects.map((project) =>(
              <Row>
                <Col>
                  <DynamicLink displayRoute='video-project' actualRoute='videoproject' slug={project.slug}>
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